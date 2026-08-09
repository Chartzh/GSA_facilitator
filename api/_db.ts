import { createClient } from '@supabase/supabase-js'
import { getEnvVar } from './_env'
import {
  basePoints,
  milestoneBonus,
  currentMilestone,
  assertHalfStep,
  assertInt
} from './_points'

export interface LeaderboardRow {
  rank: number
  name: string
  points: number
  bonusPoints: number
  totalPoints: number
  milestone: string | null
  games: number
  badges: number
}

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

export const isDbConfigured = (): boolean => dbReady

// Fetch Top 10 ONLY (Enforced via Supabase Query & Total Points Sorting)
export async function getTop10(): Promise<{ top10: LeaderboardRow[]; lastUpdated: string | null; dbReady: boolean }> {
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
    const sorted = [...data].sort((a: any, b: any) => {
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

    const top10: LeaderboardRow[] = sorted.map((r: any, idx: number) => {
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
  } catch (err: any) {
    console.warn('getTop10 unexpected error:', err?.message || err)
    return { top10: [], lastUpdated: null, dbReady: true }
  }
}

// Upsert participants from CSV in memory using Supabase
export async function saveParticipantsFromCsv(rows: { nama: string; profileUrl: string }[]) {
  if (!dbReady || !supabase) {
    return { count: rows.length, dbUsed: false }
  }

  const payload = rows.map(r => ({
    nama: r.nama,
    profile_url: r.profileUrl
  }))

  const { error } = await supabase
    .from('participants')
    .upsert(payload, { onConflict: 'profile_url' })

  if (error) {
    console.error('[DB-ERROR] Supabase upsert error:', error.message)
    throw new Error(`Gagal menyimpan data ke Supabase: ${error.message}`)
  }

  return { count: rows.length, dbUsed: true }
}

// Fetch participant slice for chunked scraping
export async function getParticipantsSlice(offset: number, limit: number): Promise<{
  participants: { id: number; nama: string; profileUrl: string }[]
  totalParticipants: number
  dbReady: boolean
}> {
  if (!dbReady || !supabase) {
    return { participants: [], totalParticipants: 0, dbReady: false }
  }

  try {
    const { count, error: countErr } = await supabase
      .from('participants')
      .select('*', { count: 'exact', head: true })

    if (countErr) throw countErr

    const totalParticipants = count || 0
    if (totalParticipants === 0 || offset >= totalParticipants) {
      return { participants: [], totalParticipants, dbReady: true }
    }

    const { data, error } = await supabase
      .from('participants')
      .select('id, nama, profile_url')
      .order('id', { ascending: true })
      .range(offset, offset + limit - 1)

    if (error || !data) throw error || new Error('Gagal mengambil data peserta')

    const participants = data.map((r: any) => ({
      id: r.id,
      nama: r.nama,
      profileUrl: r.profile_url
    }))

    return { participants, totalParticipants, dbReady: true }
  } catch (err: any) {
    console.error('[DB-ERROR] getParticipantsSlice error:', err?.message)
    return { participants: [], totalParticipants: 0, dbReady: true }
  }
}

// Save snapshot chunk results to Supabase immediately with per-row assertion & error isolation
export async function saveSnapshotChunk(
  snapshots: { participantId: number; games: number; skillBadges: number }[],
  snapshotDateStr?: string
) {
  if (!dbReady || !supabase || snapshots.length === 0) {
    return { count: 0, dbUsed: false, failedRows: [] }
  }

  const snapshot_date = snapshotDateStr || new Date().toISOString().split('T')[0]
  const validRows: any[] = []
  const failedRows: { participantId: number; error: string }[] = []

  for (const s of snapshots) {
    try {
      const bPoints = basePoints(s.games, s.skillBadges)
      const mBonus = milestoneBonus(s.games, s.skillBadges)
      const ms = currentMilestone(s.games, s.skillBadges)

      const row = {
        participant_id: assertInt('participant_id', s.participantId),
        snapshot_date,
        points: assertHalfStep('points', bPoints),
        bonus_points: assertInt('bonus_points', mBonus),
        milestone: ms?.name ?? null,
        games: assertInt('games', s.games),
        skill_badges: assertInt('skill_badges', s.skillBadges),
        captured_at: new Date().toISOString()
      }
      validRows.push(row)
    } catch (err: any) {
      failedRows.push({ participantId: s.participantId, error: err?.message || 'Data tidak valid' })
    }
  }

  if (validRows.length > 0) {
    const { error } = await supabase
      .from('snapshots')
      .upsert(validRows, { onConflict: 'participant_id,snapshot_date' })

    if (error) {
      console.error('[DB-ERROR] Supabase snapshot upsert error:', error.message)
      throw new Error(`Gagal menyimpan snapshot ke Supabase: ${error.message}`)
    }
  }

  return { count: validRows.length, dbUsed: true, failedRows }
}

// Helper to count how many snapshots exist for today's date
export async function getTodaySavedCount(): Promise<number> {
  if (!dbReady || !supabase) return 0
  const todayStr = new Date().toISOString().split('T')[0]
  try {
    const { count } = await supabase
      .from('snapshots')
      .select('*', { count: 'exact', head: true })
      .eq('snapshot_date', todayStr)
    return count || 0
  } catch {
    return 0
  }
}
