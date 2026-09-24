import { validateProfileUrl, parseProfileHtml } from '../api/_scrape.js'

async function verifyNouval() {
  const url = 'https://www.skills.google/public_profiles/064ee134-5e9b-45a6-8336-bc8f15e6259a'
  const validation = validateProfileUrl(url)
  const res = await fetch(validation.url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 (GCAF-Tracker/2026)'
    }
  })
  const html = await res.text()
  const result = parseProfileHtml(html, validation.url)

  console.log('=== VERIFIED SCRAPE OUTPUT FOR NOUVAL AIMAN ===')
  console.log('Profile Name:', result.profileName)
  console.log('Arcade Games Count:', result.validGames.length)
  console.log('Skill Badges Count:', result.totalSkillBadgesCount)
  console.log('Base Points:', result.basePoints)
  console.log('Milestone Bonus:', result.milestoneBonus)
  console.log('Total Points:', result.totalPointsWithBonus)
}

verifyNouval().catch(console.error)
