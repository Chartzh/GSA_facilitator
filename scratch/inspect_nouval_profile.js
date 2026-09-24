import { validateProfileUrl, parseProfileHtml } from '../api/_scrape.js'

async function run() {
  const url = 'https://www.skills.google/public_profiles/064ee134-5e9b-45a6-8336-bc8f15e6259a'
  const validation = validateProfileUrl(url)
  console.log('Fetching URL:', validation.url)

  const res = await fetch(validation.url, {
    headers: {
      'Accept-Language': 'en-US,en;q=0.9',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 (GCAF-Tracker/2026)',
      'accept': 'text/html,application/xhtml+xml'
    }
  })

  console.log('HTTP Status:', res.status)
  const html = await res.text()
  const result = parseProfileHtml(html, validation.url)

  console.log('\n=== SCRAPE RESULT ===')
  console.log('Profile Name:', result.profileName)
  console.log('Games Count:', result.validGames.length)
  console.log('Games:', result.validGames.map(g => `${g.id}: ${g.name}`))
  console.log('\nSyllabus Badges Count:', result.validSyllabusBadges.length)
  console.log('Extra Badges Count:', result.validExtraBadges.length)
  console.log('Total Skill Badges Count (Calculated):', result.totalSkillBadgesCount)

  console.log('\n=== LIST OF ALL VALID SYLLABUS BADGES MATCHED ===')
  result.validSyllabusBadges.forEach(b => console.log(`- [Syllabus ${b.id}] ${b.name}`))

  console.log('\n=== LIST OF ALL VALID EXTRA BADGES MATCHED ===')
  result.validExtraBadges.forEach(b => console.log(`- [Extra] ${b.name}`))

  console.log('\n=== LIST OF ALL EXCLUDED ITEMS ===')
  result.excludedItems.forEach(b => console.log(`- [Excluded] ${b.title} (${b.reason})`))
}

run().catch(console.error)
