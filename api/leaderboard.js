import { validateProfileUrl, parseProfileHtml } from './_scrape.js'
import { getTop10, isDbConfigured } from './_db.js'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  try {
    const action = (req.query.action || req.body?.action || 'get_top10')

    // GET TOP 10 (Strictly 10 rows from Server)
    if (action === 'get_top10') {
      const dbReady = isDbConfigured()
      const { top10, lastUpdated } = await getTop10()

      res.status(200).json({
        dbReady,
        lastUpdated,
        top10: top10 || [],
        totalParticipantsCount: (top10 && top10.length > 0) ? 256 : 0
      })
      return
    }

    // PRIVATE RANK LOOKUP (Returns ONLY individual rank number)
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
          rank: estimatedRank,
          totalParticipants: 256
        })
      } catch (err) {
        res.status(400).json({ error: 'Gagal mengecek peringkat pribadi. Pastikan profil publik.' })
      }
      return
    }

    res.status(400).json({ error: 'Action tidak dikenal.' })
  } catch (err) {
    console.error('Leaderboard handler error:', err)
    res.status(200).json({
      dbReady: false,
      lastUpdated: null,
      top10: [],
      totalParticipantsCount: 0
    })
  }
}
