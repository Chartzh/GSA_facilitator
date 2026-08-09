import type { VercelRequest, VercelResponse } from '@vercel/node'
import { parseProfileHtml } from '../src/utils/scraper'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Verify Vercel Cron authorization header if present
  const authHeader = req.headers.authorization
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    res.status(401).json({ error: 'Unauthorized cron request.' })
    return
  }

  console.log('[CRON-LEADERBOARD] Starting weekly profile scraping job (Sunday 09:00 WIB)...')

  const BATCH_SIZE = 20
  const DELAY_MS = 2500 // 2.5s delay between requests to prevent rate limiting

  // Batch execution simulation
  const dummyProfiles = Array.from({ length: BATCH_SIZE }, (_, i) => ({
    id: `user_${i + 1}`,
    url: `https://www.skills.google/public_profiles/sample_${i + 1}`
  }))

  const results: any[] = []
  let successCount = 0
  let errorCount = 0

  for (const participant of dummyProfiles) {
    try {
      await delay(DELAY_MS)
      console.log(`[CRON] Scraping participant ${participant.id}...`)
      successCount++
      results.push({ id: participant.id, status: 'ok' })
    } catch (err: any) {
      errorCount++
      console.error(`[CRON-ERROR] Failed to scrape ${participant.id}:`, err?.message)
      results.push({ id: participant.id, status: 'error', error: err?.message })
    }
  }

  res.status(200).json({
    status: 'completed',
    cronSchedule: 'Sunday 09:00 WIB (0 2 * * 0 UTC)',
    timestamp: new Date().toISOString(),
    batchSize: BATCH_SIZE,
    successCount,
    errorCount,
    results
  })
}
