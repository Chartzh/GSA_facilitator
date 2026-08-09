import { validateProfileUrl } from '../_scrape.js'
import { saveParticipantsFromCsv } from '../_db.js'
import { getEnvVar } from '../_env.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed.' })
    return
  }

  const { password, csvText } = req.body || {}
  const expectedPassword = getEnvVar('ADMIN_PASSWORD')

  if (!expectedPassword) {
    res.status(500).json({ error: 'ADMIN_PASSWORD belum dikonfigurasi di environment variables server atau .env.local.' })
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

  const lines = csvText.split(/\r?\n/).filter(line => line.trim().length > 0)
  if (lines.length < 2) {
    res.status(400).json({ error: 'Format CSV harus berisi baris header dan minimal 1 baris data.' })
    return
  }

  const parseCsvLine = (line) => {
    const result = []
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

  const validRows = []
  const skippedRows = []

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

    validRows.push({
      nama: rawName,
      profileUrl: validation.url
    })
  }

  const saveResult = await saveParticipantsFromCsv(validRows)

  res.status(200).json({
    success: true,
    message: `Berhasil memproses ${validRows.length} peserta dari CSV.`,
    totalProcessed: validRows.length,
    totalSkipped: skippedRows.length,
    skippedDetails: skippedRows,
    dbStatus: saveResult.dbUsed ? 'Tersimpan ke Supabase Database' : 'Database offline (Memori sementara)'
  })
}
