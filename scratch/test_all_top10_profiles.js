import { validateProfileUrl, parseProfileHtml } from '../api/_scrape.js'

const testProfiles = [
  { name: 'Rizki Fais Mubarok', url: 'https://www.skills.google/public_profiles/ca5219c8-bba6-49b2-af1d-fa1b1e993da4' },
  { name: 'Gusti Raden Pamungkas Yudapradja', url: 'https://www.skills.google/public_profiles/d682d7db-b7d9-4288-a306-79b0fb857132' },
  { name: 'Neisya Syafina', url: 'https://www.skills.google/public_profiles/c4464f5f-7706-4ce0-ba94-1880caf2d53e' },
  { name: 'Abdulloh Fajar Bin Ilham', url: 'https://www.skills.google/public_profiles/bd8b7032-a5e7-43ac-a92a-2cfb0e1aa91c' },
  { name: 'Nouval Aiman', url: 'https://www.skills.google/public_profiles/064ee134-5e9b-45a6-8336-bc8f15e6259a' }
]

async function run() {
  console.log('=== SCRAPING TOP PROFILES VERIFICATION ===')
  for (const p of testProfiles) {
    const v = validateProfileUrl(p.url)
    const res = await fetch(v.url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 (GCAF-Tracker/2026)'
      }
    })
    const html = await res.text()
    const result = parseProfileHtml(html, v.url)
    console.log(`${p.name} -> Games: ${result.validGames.length} | Badges: ${result.totalSkillBadgesCount} | Total Points: ${result.totalPointsWithBonus}`)
  }
}

run().catch(console.error)
