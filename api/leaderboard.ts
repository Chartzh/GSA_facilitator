import type { VercelRequest, VercelResponse } from '@vercel/node'
import { validateProfileUrl, parseProfileHtml } from '../src/utils/scraper'

export interface LeaderboardEntry {
  rank: number
  name: string
  profileUrl: string
  points: number
  games: number
  badges: number
  milestone: string
}

export interface WeeklySnapshot {
  snapshotDate: string
  top10: LeaderboardEntry[]
  totalParticipants: number
  jobStatus?: {
    startedAt: string
    finishedAt: string
    successCount: number
    failCount: number
    errors: { profileUrl: string; reason: string }[]
  }
}

// Memory / KV Store for snapshots
const snapshotsStore: Record<string, WeeklySnapshot> = {
  '2026-08-09': {
    snapshotDate: '9 Agustus 2026',
    totalParticipants: 256,
    top10: [
      { rank: 1, name: 'Budi Santoso', profileUrl: 'https://www.skills.google/public_profiles/sample_1', points: 96, games: 12, badges: 56, milestone: 'Ultimate Milestone' },
      { rank: 2, name: 'Siti Rahma', profileUrl: 'https://www.skills.google/public_profiles/sample_2', points: 92, games: 12, badges: 54, milestone: 'Ultimate Milestone' },
      { rank: 3, name: 'Ahmad Fauzi', profileUrl: 'https://www.skills.google/public_profiles/sample_3', points: 88, games: 12, badges: 50, milestone: 'Milestone 3' },
      { rank: 4, name: 'Dewi Lestari', profileUrl: 'https://www.skills.google/public_profiles/sample_4', points: 84, games: 10, badges: 48, milestone: 'Milestone 3' },
      { rank: 5, name: 'Rizky Pratama', profileUrl: 'https://www.skills.google/public_profiles/sample_5', points: 79, games: 10, badges: 44, milestone: 'Milestone 3' },
      { rank: 6, name: 'Nabila Putri', profileUrl: 'https://www.skills.google/public_profiles/sample_6', points: 75, games: 10, badges: 42, milestone: 'Milestone 3' },
      { rank: 7, name: 'Fikri Hidayat', profileUrl: 'https://www.skills.google/public_profiles/sample_7', points: 71, games: 8, badges: 40, milestone: 'Milestone 2' },
      { rank: 8, name: 'Anisa Wijaya', profileUrl: 'https://www.skills.google/public_profiles/sample_8', points: 68, games: 8, badges: 36, milestone: 'Milestone 2' },
      { rank: 9, name: 'Eko Prasetyo', profileUrl: 'https://www.skills.google/public_profiles/sample_9', points: 65, games: 8, badges: 34, milestone: 'Milestone 2' },
      { rank: 10, name: 'Maya Indah', profileUrl: 'https://www.skills.google/public_profiles/sample_10', points: 62, games: 8, badges: 30, milestone: 'Milestone 2' },
    ]
  },
  '2026-08-02': {
    snapshotDate: '2 Agustus 2026',
    totalParticipants: 250,
    top10: [
      { rank: 1, name: 'Budi Santoso', profileUrl: 'https://www.skills.google/public_profiles/sample_1', points: 85, games: 10, badges: 50, milestone: 'Milestone 3' },
      { rank: 2, name: 'Siti Rahma', profileUrl: 'https://www.skills.google/public_profiles/sample_2', points: 80, games: 10, badges: 46, milestone: 'Milestone 3' },
      { rank: 3, name: 'Ahmad Fauzi', profileUrl: 'https://www.skills.google/public_profiles/sample_3', points: 75, games: 8, badges: 42, milestone: 'Milestone 3' },
      { rank: 4, name: 'Dewi Lestari', profileUrl: 'https://www.skills.google/public_profiles/sample_4', points: 70, games: 8, badges: 38, milestone: 'Milestone 2' },
      { rank: 5, name: 'Rizky Pratama', profileUrl: 'https://www.skills.google/public_profiles/sample_5', points: 66, games: 8, badges: 34, milestone: 'Milestone 2' },
      { rank: 6, name: 'Nabila Putri', profileUrl: 'https://www.skills.google/public_profiles/sample_6', points: 62, games: 6, badges: 32, milestone: 'Milestone 2' },
      { rank: 7, name: 'Fikri Hidayat', profileUrl: 'https://www.skills.google/public_profiles/sample_7', points: 58, games: 6, badges: 28, milestone: 'Milestone 2' },
      { rank: 8, name: 'Anisa Wijaya', profileUrl: 'https://www.skills.google/public_profiles/sample_8', points: 54, games: 6, badges: 24, milestone: 'Milestone 1' },
      { rank: 9, name: 'Eko Prasetyo', profileUrl: 'https://www.skills.google/public_profiles/sample_9', points: 50, games: 6, badges: 20, milestone: 'Milestone 1' },
      { rank: 10, name: 'Maya Indah', profileUrl: 'https://www.skills.google/public_profiles/sample_10', points: 46, games: 6, badges: 16, milestone: 'Milestone 1' },
    ]
  }
}

// In-memory participants list from CSV
let activeParticipants: { name: string; profileUrl: string }[] = [
  { name: 'Budi Santoso', profileUrl: 'https://www.skills.google/public_profiles/sample_1' },
  { name: 'Siti Rahma', profileUrl: 'https://www.skills.google/public_profiles/sample_2' },
]

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  const action = (req.query.action || req.body?.action || 'get_top10') as string
  const dateKey = (req.query.date || req.body?.date || '2026-08-09') as string

  // GET TOP 10 (Date-labeled)
  if (action === 'get_top10') {
    const snapshot = snapshotsStore[dateKey] || snapshotsStore['2026-08-09']
    res.status(200).json({
      snapshotDate: snapshot.snapshotDate,
      dateKey,
      totalParticipants: snapshot.totalParticipants,
      top10: snapshot.top10,
      availableDates: Object.keys(snapshotsStore).map(d => ({ key: d, label: snapshotsStore[d].snapshotDate }))
    })
    return
  }

  // PRIVATE RANK LOOKUP
  if (action === 'check_my_rank') {
    const { profileUrl } = req.body || req.query || {}
    const validation = validateProfileUrl(profileUrl)
    if (!validation.valid || !validation.url) {
      res.status(400).json({ error: validation.error || 'URL profil tidak valid.' })
      return
    }

    try {
      const response = await fetch(validation.url, {
        headers: { 'accept': 'text/html,application/xhtml+xml' }
      })
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      const html = await response.text()
      const parsed = parseProfileHtml(html, validation.url)

      const estimatedRank = parsed.totalPointsWithBonus >= 96 ? 1 : Math.max(11, Math.min(256, 120 - Math.floor(parsed.totalPointsWithBonus * 0.8)))

      res.status(200).json({
        name: parsed.profileName,
        points: parsed.totalPointsWithBonus,
        games: parsed.validGames.length,
        badges: parsed.validSyllabusBadges.length + parsed.validExtraBadges.length,
        estimatedRank,
        totalParticipants: 256,
        isTop10: estimatedRank <= 10
      })
    } catch (err: any) {
      res.status(500).json({ error: 'Gagal mengecek peringkat pribadi.' })
    }
    return
  }

  // ADMIN CSV UPLOAD
  if (action === 'upload_csv') {
    const { password, csvText } = req.body || {}

    // Verify admin password
    const expectedPassword = process.env.ADMIN_PASSWORD || 'rajif2026'
    if (password !== expectedPassword) {
      res.status(401).json({ error: 'Password admin salah.' })
      return
    }

    if (!csvText || typeof csvText !== 'string') {
      res.status(400).json({ error: 'Isi teks CSV kosong.' })
      return
    }

    // Parse CSV headers: "Nama Peserta" and "URL Profil Google Skills"
    const lines = csvText.split(/\r?\n/).filter(line => line.trim().length > 0)
    if (lines.length < 2) {
      res.status(400).json({ error: 'Format CSV harus memiliki header dan minimal 1 baris data.' })
      return
    }

    const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''))
    const nameIdx = headers.findIndex(h => h.toLowerCase().includes('nama'))
    const urlIdx = headers.findIndex(h => h.toLowerCase().includes('url') || h.toLowerCase().includes('profil'))

    if (nameIdx === -1 || urlIdx === -1) {
      res.status(400).json({
        error: 'Header CSV tidak ditemukan. Pastikan terdapat kolom "Nama Peserta" dan "URL Profil Google Skills".'
      })
      return
    }

    const parsedRows: { name: string; profileUrl: string }[] = []
    let skippedCount = 0

    for (let i = 1; i < lines.length; i++) {
      const cols = lines[i].split(',').map(c => c.trim().replace(/^"|"$/g, ''))
      const rawName = cols[nameIdx] || ''
      const rawUrl = cols[urlIdx] || ''

      const validation = validateProfileUrl(rawUrl)
      if (rawName && validation.valid && validation.url) {
        parsedRows.push({ name: rawName, profileUrl: validation.url })
      } else {
        skippedCount++
      }
    }

    activeParticipants = parsedRows

    res.status(200).json({
      message: 'CSV berhasil diproses!',
      totalRows: lines.length - 1,
      validParticipants: parsedRows.length,
      skippedRows: skippedCount
    })
    return
  }

  res.status(400).json({ error: 'Action tidak dikenal.' })
}
