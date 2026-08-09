import type { VercelRequest, VercelResponse } from '@vercel/node'
import { validateProfileUrl } from '../../src/utils/scraper'
import { saveParticipantsFromCsv } from '../_db'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed.' })
    return
  }

  // 1. Server-side Authentication
  const { password, csvText } = req.body || {}
  const expectedPassword = process.env.ADMIN_PASSWORD

  if (!expectedPassword) {
    res.status(500).json({ error: 'ADMIN_PASSWORD belum dikonfigurasi di environment variables server.' })
    return
  }

  if (password !== expectedPassword) {
    res.status(401).json({ error: 'Akses ditolak: Password admin salah.' })
    return
  }

  if (!csvText || typeof csvText !== 'string') {
    res.status(400).json({ error: 'Isi teks atau file CSV tidak ditemukan.' })
    return
  }

  // 2. Parse CSV headers & rows in memory
  const lines = csvText.split(/\r?\n/).filter(line => line.trim().length > 0)
  if (lines.length < 2) {
    res.status(400).json({ error: 'Format CSV harus berisi baris header dan minimal 1 baris data.' })
    return
  }

  // Helper to split CSV line respecting quotes
  const parseCsvLine = (line: string): string[] => {
    const result: string[] = []
    let current = ''
    let inQuotes = false

    for (let i = 0; i < line.length; i++) {
      const char = line[i]
      if (char === '"') {
        inQuotes = !inQuotes
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim().replace(/^"|"$/g, ''))
        current = ''
      } else {
        current += char
      }
    }
    result.push(current.trim().replace(/^"|"$/g, ''))
    return result
  }

  const headers = parseCsvLine(lines[0])
  const nameIdx = headers.findIndex(h => h.toLowerCase().includes('nama'))
  const urlIdx = headers.findIndex(h => h.toLowerCase().includes('url') || h.toLowerCase().includes('profil'))

  if (nameIdx === -1 || urlIdx === -1) {
    res.status(400).json({
      error: 'Header CSV tidak valid. Harus mengandung kolom "Nama Peserta" dan "URL Profil Google Skills".'
    })
    return
  }

  // 3. Process rows: Keep ONLY name & profileUrl, discard email/phone/other columns immediately
  const validRows: { nama: string; profileUrl: string }[] = []
  const skippedRows: { rowNumber: number; reason: string; rawText: string }[] = []

  for (let i = 1; i < lines.length; i++) {
    const cols = parseCsvLine(lines[i])
    const rawName = cols[nameIdx] || ''
    const rawUrl = cols[urlIdx] || ''

    if (!rawName) {
      skippedRows.push({ rowNumber: i + 1, reason: 'Nama kosong', rawText: lines[i] })
      continue
    }

    const validation = validateProfileUrl(rawUrl)
    if (!validation.valid || !validation.url) {
      skippedRows.push({ rowNumber: i + 1, reason: validation.error || 'URL profil tidak valid', rawText: lines[i] })
      continue
    }

    // DISCARD ALL OTHER COLUMNS (email, phone, etc are never stored or logged)
    validRows.push({
      nama: rawName,
      profileUrl: validation.url
    })
  }

  // 4. Save to Database (or in-memory store)
  const saveResult = await saveParticipantsFromCsv(validRows)

  res.status(200).json({
    message: 'CSV berhasil diproses!',
    totalRowsProcessed: lines.length - 1,
    validParticipantsCount: validRows.length,
    skippedRowsCount: skippedRows.length,
    skippedDetails: skippedRows,
    dbUsed: saveResult.dbUsed
  })
}
