import type { VercelRequest, VercelResponse } from '@vercel/node'
import { validateProfileUrl, parseProfileHtml } from '../../src/utils/scraper'
import { getParticipantsSlice, saveSnapshotChunk } from '../_db'
import { getEnvVar } from '../_env'

// Helper function to process items in parallel with maximum concurrency limit (8)
async function mapConcurrent<T, R>(
  items: T[],
  concurrency: number,
  fn: (item: T) => Promise<R>
): Promise<R[]> {
  const results: R[] = new Array(items.length)
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

type ScrapeItemSuccess = {
  participantId: number;
  nama: string;
  success: true;
  points: number;
  games: number;
  skillBadges: number;
}

type ScrapeItemFailure = {
  participantId: number;
  nama: string;
  success: false;
  reason: string;
}

type ScrapeItemResult = ScrapeItemSuccess | ScrapeItemFailure

export async function processChunkInternal(
  offset: number,
  limit: number,
  jobIdInput?: string | number
) {
  const effectiveLimit = Math.min(Math.max(1, limit || 20), 25)
  const jobId = jobIdInput || Date.now()

  // 1. Fetch participant slice from DB
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

  // 2. Concurrency 8 parallel scraping with 10s AbortController timeout per profile
  const CONCURRENCY_LIMIT = 8
  const TIMEOUT_MS = 10000

  const results: ScrapeItemResult[] = await mapConcurrent(participants, CONCURRENCY_LIMIT, async (p): Promise<ScrapeItemResult> => {
    // Validate URL first before making HTTP request
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

      // Discard raw HTML string immediately
      return {
        participantId: p.id,
        nama: p.nama,
        success: true,
        points: parsed.totalPointsWithBonus,
        games: parsed.validGames.length,
        skillBadges: parsed.validSyllabusBadges.length + parsed.validExtraBadges.length
      }
    } catch (err: any) {
      const isAbort = err?.name === 'AbortError' || err?.message?.includes('aborted')
      return {
        participantId: p.id,
        nama: p.nama,
        success: false,
        reason: isAbort ? 'Timeout > 10 detik' : (err?.message || 'Gagal fetch')
      }
    } finally {
      clearTimeout(timer)
    }
  })

  // 3. Separate succeeded and failed items
  const succeededItems = results.filter((r): r is ScrapeItemSuccess => r.success)
  const failedItems = results.filter((r): r is ScrapeItemFailure => !r.success)

  // 4. Save results of this chunk to DB immediately
  if (succeededItems.length > 0 && dbReady) {
    try {
      await saveSnapshotChunk(succeededItems)
    } catch (dbErr: any) {
      console.error('[DB-CHUNK-ERROR] Failed to save chunk snapshot:', dbErr?.message)
    }
  }

  const nextOffset = offset + participants.length < totalParticipants ? offset + participants.length : null

  return {
    jobId,
    processed: participants.length,
    succeeded: succeededItems.length,
    failed: failedItems.length,
    totalParticipants,
    nextOffset,
    errors: failedItems.map(f => ({ nama: f.nama, reason: f.reason }))
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed.' })
    return
  }

  const { password, jobId, offset = 0, limit = 20 } = req.body || {}
  const expectedPassword = getEnvVar('ADMIN_PASSWORD')
  const authHeader = req.headers.authorization
  const cronSecret = getEnvVar('CRON_SECRET')

  const isAuthorizedAdmin = expectedPassword && password === expectedPassword
  const isAuthorizedCron = cronSecret && authHeader === `Bearer ${cronSecret}`

  if (!isAuthorizedAdmin && !isAuthorizedCron) {
    res.status(401).json({ error: 'Akses ditolak: Password admin atau otorisasi tidak valid.' })
    return
  }

  try {
    const chunkResult = await processChunkInternal(Number(offset), Number(limit), jobId)
    res.status(200).json(chunkResult)
  } catch (err: any) {
    res.status(500).json({ error: err?.message || 'Gagal memproses potongan scraping.' })
  }
}
