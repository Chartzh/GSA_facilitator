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

  const limit = Number(req.query.limit || req.body?.limit || 40)
  const todayDate = new Date().toISOString().slice(0, 10)
  const jobId = `cron_${todayDate}_${Date.now()}`

  console.log(`[CRON-LEADERBOARD] Starting full automatic cron run for date ${todayDate}...`)

  let currentOffset = 0
  let totalProcessed = 0
  let totalSucceeded = 0
  let totalFailed = 0
  const allErrors = []

  try {
    while (currentOffset !== null) {
      console.log(`[CRON-LEADERBOARD] Processing chunk at offset ${currentOffset}...`)
      const chunkResult = await processChunkInternal(currentOffset, limit, jobId)

      totalProcessed += chunkResult.processed
      totalSucceeded += chunkResult.succeeded
      totalFailed += chunkResult.failed
      if (chunkResult.errors) allErrors.push(...chunkResult.errors)

      currentOffset = chunkResult.nextOffset

      if (currentOffset !== null) {
        await new Promise(r => setTimeout(r, 100))
      }
    }

    console.log(`[CRON-LEADERBOARD] Finished full cron run. Processed: ${totalProcessed}, Succeeded: ${totalSucceeded}, Failed: ${totalFailed}`)

    res.status(200).json({
      status: 'success',
      snapshotDate: todayDate,
      processed: totalProcessed,
      succeeded: totalSucceeded,
      failed: totalFailed,
      errors: allErrors,
      timestamp: new Date().toISOString()
    })
  } catch (err) {
    console.error('[CRON-ERROR] Failed to execute cron run:', err?.message)
    res.status(500).json({ error: err?.message || 'Gagal menjalankan cron leaderboard.' })
  }
}
