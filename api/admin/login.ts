import type { VercelRequest, VercelResponse } from '@vercel/node'
import { getEnvVar } from '../_env'

// Simple IP rate-limiter: max 5 login attempts per minute per IP
const loginAttemptsMap = new Map<string, { count: number; firstAttempt: number }>()

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed.' })
    return
  }

  const clientIp = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown'
  const now = Date.now()

  // Clean old entries (> 60s)
  const attempt = loginAttemptsMap.get(clientIp)
  if (attempt) {
    if (now - attempt.firstAttempt > 60000) {
      loginAttemptsMap.set(clientIp, { count: 1, firstAttempt: now })
    } else if (attempt.count >= 5) {
      res.status(429).json({ error: 'Batas percobaan login tercapai (maksimal 5 kali per menit). Coba lagi beberapa saat.' })
      return
    } else {
      attempt.count++
    }
  } else {
    loginAttemptsMap.set(clientIp, { count: 1, firstAttempt: now })
  }

  const { password } = req.body || {}
  const expectedPassword = getEnvVar('ADMIN_PASSWORD')

  if (!expectedPassword) {
    res.status(500).json({ error: 'ADMIN_PASSWORD belum dikonfigurasi di environment variables server atau .env.local.' })
    return
  }

  if (password !== expectedPassword) {
    res.status(401).json({ error: 'Password admin salah.' })
    return
  }

  // Login success: return admin token / status
  res.status(200).json({
    success: true,
    message: 'Login admin berhasil.',
    adminToken: Buffer.from(`admin_${now}_${expectedPassword}`).toString('base64')
  })
}
