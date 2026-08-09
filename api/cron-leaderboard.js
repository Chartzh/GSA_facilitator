import { processChunkInternal } from './admin/scrape-chunk.js'
import { getEnvVar } from './_env.js'

export default async function handler(req, res) {
  const authHeader = req.headers.authorization
  const cronSecret = getEnvVar('CRON_SECRET')
  const secretParam = req.query.secret

  const isAuthHeaderValid = cronSecret && authHeader === `Bearer ${cronSecret}`
  const isQuerySecretValid = cronSecret && secretParam === cronSecret

  if (cronSecret && !isAuthHeaderValid && !isQuerySecretValid) {
    res.status(401).json({ error: 'Unauthorized cron request.' })
    return
  }

  const offset = Number(req.query.offset || req.body?.offset || 0)
  const limit = Number(req.query.limit || req.body?.limit || 20)

  console.log(`[CRON-LEADERBOARD] Executing chunk at offset ${offset} (limit ${limit})...`)

  try {
    const chunkResult = await processChunkInternal(offset, limit, 'cron_job')

    if (chunkResult.nextOffset !== null) {
      const host = req.headers['x-forwarded-host'] || req.headers.host || process.env.VERCEL_URL || 'localhost:3000'
      const protocol = host.includes('localhost') ? 'http' : 'https'
      const baseUrl = `${protocol}://${host}`

      console.log(`[CRON-LEADERBOARD] Triggering next chunk at offset ${chunkResult.nextOffset}...`)

      fetch(`${baseUrl}/api/cron-leaderboard?offset=${chunkResult.nextOffset}`, {
        headers: {
          'Authorization': `Bearer ${cronSecret || ''}`
        }
      }).catch((err) => {
        console.warn('[CRON-BACKGROUND-TRIGGER] Background trigger warning:', err?.message)
      })
    }

    res.status(200).json({
      status: 'success',
      timestamp: new Date().toISOString(),
      chunkResult
    })
  } catch (err) {
    console.error('[CRON-ERROR] Failed to execute cron chunk:', err?.message)
    res.status(500).json({ error: err?.message || 'Gagal menjalankan cron chunk.' })
  }
}
