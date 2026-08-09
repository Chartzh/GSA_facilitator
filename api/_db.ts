import { createClient } from '@supabase/supabase-js'

export interface LeaderboardRow {
  rank: number
  name: string
  points: number
  games: number
  badges: number
}

const url = process.env.SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY

export const dbReady = Boolean(url && key)

export const supabase = dbReady && url && key
  ? createClient(url, key, { auth: { persistSession: false } })
  : null

export const isDbConfigured = (): boolean => dbReady

// Fetch Top 10 ONLY (Enforced via Supabase Query .limit(10))
export async function getTop10(): Promise<{ top10: LeaderboardRow[]; lastUpdated: string | null; dbReady: boolean }> {
  if (!dbReady || !supabase) {
    return { top10: [], lastUpdated: null, dbReady: false }
  }

  try {
    const { data: latest } = await supabase
      .from('snapshots')
      .select('snapshot_date')
      .order('snapshot_date', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (!latest) {
      return { top10: [], lastUpdated: null, dbReady: true }
    }

    const { data, error } = await supabase
      .from('snapshots')
      .select('points, games, skill_badges, participants(nama)')
      .eq('snapshot_date', latest.snapshot_date)
      .order('points', { ascending: false })
      .order('skill_badges', { ascending: false })
      .limit(10)

    if (error || !data) {
      throw error || new Error('Data tidak ditemukan')
    }

    const top10: LeaderboardRow[] = data.map((r: any, idx: number) => {
      const participantName = Array.isArray(r.participants)
        ? r.participants[0]?.nama
        : r.participants?.nama || 'Peserta'
      return {
        rank: idx + 1,
        name: participantName,
        points: r.points,
        games: r.games,
        badges: r.skill_badges
      }
    })

    return {
      top10,
      lastUpdated: latest.snapshot_date,
      dbReady: true
    }
  } catch (err: any) {
    console.warn('[DB] getTop10 query error:', err?.message)
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
