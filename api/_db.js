import { createClient } from '@supabase/supabase-js'
import { getEnvVar } from './_env.js'
import {
  basePoints,
  milestoneBonus,
  currentMilestone,
  assertHalfStep,
  assertInt
} from './_points.js'

const rawUrl = getEnvVar('SUPABASE_URL')
const rawKey = getEnvVar('SUPABASE_SERVICE_ROLE_KEY')

export const dbReady = Boolean(rawUrl && rawKey && rawUrl.startsWith('http'))

export const supabase = (function() {
  if (!rawUrl || !rawKey || !rawUrl.startsWith('http')) {
    return null
  }
  try {
    return createClient(rawUrl, rawKey, { auth: { persistSession: false } })
  } catch (err) {
    console.warn('Failed to initialize Supabase client:', err)
    return null
  }
})()

export const isDbConfigured = () => dbReady

// Fetch Top 10 ONLY (Enforced via Supabase Query & Total Points Sorting)
export async function getTop10() {
  if (!dbReady || !supabase) {
    return { top10: [], lastUpdated: null, dbReady: false }
  }

  try {
    const { data: latest, error: latestErr } = await supabase
      .from('snapshots')
      .select('snapshot_date')
      .order('snapshot_date', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (latestErr || !latest) {
      return { top10: [], lastUpdated: null, dbReady: true }
    }

    const { data, error } = await supabase
      .from('snapshots')
      .select('points, bonus_points, milestone, games, skill_badges, participants(nama)')
      .eq('snapshot_date', latest.snapshot_date)

    if (error || !data) {
      return { top10: [], lastUpdated: latest.snapshot_date, dbReady: true }
    }

    // Sort by Total Points (points + bonus_points) DESC, bonus_points DESC, skill_badges DESC, games DESC
    const sorted = [...data].sort((a, b) => {
      const totalA = (Number(a.points) || 0) + (Number(a.bonus_points) || 0)
      const totalB = (Number(b.points) || 0) + (Number(b.bonus_points) || 0)
      if (totalB !== totalA) return totalB - totalA

      const bonusA = Number(a.bonus_points) || 0
      const bonusB = Number(b.bonus_points) || 0
      if (bonusB !== bonusA) return bonusB - bonusA

      const badgesA = Number(a.skill_badges) || 0
      const badgesB = Number(b.skill_badges) || 0
      if (badgesB !== badgesA) return badgesB - badgesA

      const gamesA = Number(a.games) || 0
      const gamesB = Number(b.games) || 0
      return gamesB - gamesA
    }).slice(0, 10)

    const top10 = sorted.map((r, idx) => {
      const participantName = Array.isArray(r.participants)
        ? r.participants[0]?.nama
        : r.participants?.nama || 'Peserta'
      const baseP = Number(r.points) || 0
      const bonusP = Number(r.bonus_points) || 0
      return {
        rank: idx + 1,
        name: participantName,
        points: baseP,
        bonusPoints: bonusP,
        totalPoints: baseP + bonusP,
        milestone: r.milestone || null,
        games: Number(r.games) || 0,
        badges: Number(r.skill_badges) || 0
      }
    })

    return {
      top10,
      lastUpdated: latest.snapshot_date,
      dbReady: true
    }
  } catch (err) {
    console.warn('getTop10 unexpected error:', err?.message || err)
    return { top10: [], lastUpdated: null, dbReady: true }
  }
}

// Upsert participants from CSV in memory using Supabase
export async function saveParticipantsFromCsv(rows) {
  if (!dbReady || !supabase) {
    return { count: rows.length, dbUsed: false }
  }

  try {
    const payload = rows.map(r => ({
      nama: r.nama,
      profile_url: r.profileUrl,
      updated_at: new Date().toISOString()
    }))

    const { error } = await supabase
      .from('participants')
      .upsert(payload, { onConflict: 'profile_url' })

    if (error) {
      console.warn('Supabase participants upsert error:', error.message)
    }

    return { count: rows.length, dbUsed: true }
  } catch (err) {
    console.warn('saveParticipantsFromCsv unexpected error:', err)
    return { count: rows.length, dbUsed: false }
  }
}

// Fetch slice of participants for background chunk scraping
export async function getParticipantsSlice(offset, limit) {
  if (!dbReady || !supabase) {
    return { participants: [], totalParticipants: 0, dbReady: false }
  }

  try {
    const { count } = await supabase
      .from('participants')
      .select('*', { count: 'exact', head: true })

    const { data, error } = await supabase
      .from('participants')
      .select('id, nama, profile_url')
      .order('id', { ascending: true })
      .range(offset, offset + limit - 1)

    if (error || !data) {
      return { participants: [], totalParticipants: count || 0, dbReady: true }
    }

    const participants = data.map(p => ({
      id: p.id,
      nama: p.nama,
      profileUrl: p.profile_url
    }))

    return {
      participants,
      totalParticipants: count || 0,
      dbReady: true
    }
  } catch (err) {
    console.warn('getParticipantsSlice error:', err)
    return { participants: [], totalParticipants: 0, dbReady: true }
  }
}

// Save snapshot chunk
export async function saveSnapshotChunk(results, snapshotDateInput) {
  if (!dbReady || !supabase) {
    return { savedCount: 0, dbUsed: false }
  }

  const snapshotDate = snapshotDateInput || new Date().toISOString().slice(0, 10)

  try {
    const snapshotsPayload = results
      .filter(r => r.success)
      .map(r => {
        const bp = assertHalfStep(basePoints(r.games, r.skillBadges), `Poin Dasar ${r.nama}`)
        const mb = assertInt(milestoneBonus(r.games, r.skillBadges), `Bonus Milestone ${r.nama}`)
        const mObj = currentMilestone(r.games, r.skillBadges)

        return {
          participant_id: r.participantId,
          snapshot_date: snapshotDate,
          points: bp,
          bonus_points: mb,
          milestone: mObj ? mObj.label : null,
          games: r.games,
          skill_badges: r.skillBadges,
          created_at: new Date().toISOString()
        }
      })

    if (snapshotsPayload.length === 0) {
      return { savedCount: 0, dbUsed: true }
    }

    const { error } = await supabase
      .from('snapshots')
      .upsert(snapshotsPayload, { onConflict: 'participant_id,snapshot_date' })

    if (error) {
      console.warn('Supabase snapshot upsert error:', error.message)
    }

    return { savedCount: snapshotsPayload.length, dbUsed: true }
  } catch (err) {
    console.warn('saveSnapshotChunk error:', err)
    return { savedCount: 0, dbUsed: false }
  }
}
