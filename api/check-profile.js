import { validateProfileUrl, parseProfileHtml } from './_scrape.js'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  const profileUrl = (req.body?.profileUrl || req.query?.profileUrl || '')

  const validation = validateProfileUrl(profileUrl)
  if (!validation.valid || !validation.url) {
    res.status(400).json({ error: validation.error || 'Link public profile tidak valid.' })
    return
  }

  try {
    const response = await fetch(validation.url, {
      headers: {
        'accept': 'text/html,application/xhtml+xml',
        'accept-language': 'id,en-US;q=0.9,en;q=0.8',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 (GCAF-Tracker/2026)',
      },
      redirect: 'follow',
    })

    if (!response.ok) {
      res.status(400).json({
        error: `Halaman public profile tidak dapat diakses (Status HTTP ${response.status}). Pastikan profil di-set Public.`
      })
      return
    }

    const html = await response.text()
    const result = parseProfileHtml(html, validation.url)

    res.status(200).json(result)
  } catch (err) {
    res.status(400).json({
      error: `Gagal membaca profil: ${err?.message || 'Terjadi kesalahan pada server.'}`
    })
  }
}
