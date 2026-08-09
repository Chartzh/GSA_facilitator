import fs from 'fs'
import path from 'path'

export function getEnvVar(key) {
  if (process.env[key]) {
    return process.env[key]
  }

  // Fallback for local development (npx vercel dev) if Vercel CLI didn't inject process.env
  try {
    const envPath = path.join(process.cwd(), '.env.local')
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8')
      const regex = new RegExp(`^${key}=["']?([^"'\r\n]+)["']?`, 'm')
      const match = regex.exec(content)
      if (match && match[1]) {
        return match[1].trim()
      }
    }
  } catch {
    // Ignore filesystem read errors
  }

  return undefined
}
