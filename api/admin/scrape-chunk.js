import { validateProfileUrl, parseProfileHtml } from '../_scrape.js'
import { getParticipantsSlice, saveSnapshotChunk } from '../_db.js'
import { getEnvVar } from '../_env.js'

async function mapConcurrent(items, concurrency, fn) {
  const results = new Array(items.length)
  let index = 0

  async function worker() {
    while (index < items.length) {
      const currentIndex = index++
      results[currentIndex] = await fn(items[currentIndex])
    }
  }

  const workers = Array.from({ length: Math.min(concurrency, items.length) }, () => worker())
  await Promise.all(workers)
  return results
}

export async function processChunkInternal(offset, limit, jobIdInput) {
  const effectiveLimit = Math.min(Math.max(1, limit || 20), 25)
  const jobId = jobIdInput || Date.now()

  const { participants, totalParticipants, dbReady } = await getParticipantsSlice(offset, effectiveLimit)

  if (participants.length === 0) {
    return {
      jobId,
      processed: 0,
      succeeded: 0,
      failed: 0,
      totalParticipants,
      nextOffset: null,
      errors: [],
      dbReady
    }
  }

  const CONCURRENCY_LIMIT = 8
  const TIMEOUT_MS = 10000

  const results = await mapConcurrent(participants, CONCURRENCY_LIMIT, async (p) => {
    const validation = validateProfileUrl(p.profileUrl)
    if (!validation.valid || !validation.url) {
      return {
        participantId: p.id,
        nama: p.nama,
        success: false,
        reason: validation.error || 'URL tidak valid'
      }
    }

    const cleanUrl = validation.url
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)

    try {
      const res = await fetch(cleanUrl, {
        headers: { 'accept': 'text/html,application/xhtml+xml' },
        signal: controller.signal
      })

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`)
      }

      const html = await res.text()
      const parsed = parseProfileHtml(html, cleanUrl)

      return {
        participantId: p.id,
        nama: p.nama,
        success: true,
        points: parsed.basePoints,
        games: parsed.validGames.length,
        skillBadges: parsed.validSyllabusBadges.length + parsed.validExtraBadges.length
      }
    } catch (err) {
      return {
        participantId: p.id,
        nama: p.nama,
        success: false,
        reason: err?.name === 'AbortError' ? 'Timeout (10s)' : (err?.message || 'Gagal membaca profil')
      }
    } finally {
      clearTimeout(timer)
    }
  })

  const succeededCount = results.filter(r => r.success).length
  const failedResults = results.filter(r => !r.success)

  const { savedCount, dbUsed } = await saveSnapshotChunk(results)

  const hasMore = (offset + participants.length) < totalParticipants
  const nextOffset = hasMore ? (offset + participants.length) : null

  return {
    jobId,
    processed: participants.length,
    succeeded: succeededCount,
    failed: failedResults.length,
    savedToDb: savedCount,
    dbUsed,
    totalParticipants,
    nextOffset,
    errors: failedResults.map(f => `${f.nama}: ${f.reason}`),
    dbReady
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST' && req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed.' })
    return
  }

  const password = req.headers['x-admin-password'] || req.body?.password || req.query?.password
  const expectedPassword = getEnvVar('ADMIN_PASSWORD')

  if (!expectedPassword) {
    res.status(500).json({ error: 'ADMIN_PASSWORD belum dikonfigurasi di environment variables server atau .env.local.' })
    return
  }

  if (password !== expectedPassword) {
    res.status(401).json({ error: 'Akses ditolak: Password admin salah.' })
    return
  }

  const offset = Number(req.body?.offset || req.query?.offset || 0)
  const limit = Number(req.body?.limit || req.query?.limit || 20)
  const jobId = req.body?.jobId || req.query?.jobId || Date.now()

  try {
    const chunkResult = await processChunkInternal(offset, limit, jobId)
    res.status(200).json(chunkResult)
  } catch (err) {
    res.status(500).json({ error: err?.message || 'Gagal memproses batch scraping.' })
  }
}
