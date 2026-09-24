import { validateProfileUrl, parseProfileHtml } from '../api/_scrape.js'
import * as cheerio from 'cheerio'

// Let's test parseProfileHtml on Nouval Aiman's profile with PROGRAM_END extended to Oct 14, 2026
async function testFix() {
  const url = 'https://www.skills.google/public_profiles/064ee134-5e9b-45a6-8336-bc8f15e6259a'
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 (GCAF-Tracker/2026)'
    }
  })
  const html = await res.text()
  const result = parseProfileHtml(html, url)

  console.log('--- CURRENT SCRAPPER OUTPUT ---')
  console.log('Games:', result.validGames.length)
  console.log('Total Skill Badges (Calculated):', result.totalSkillBadgesCount)
  console.log('Syllabus Badges:', result.validSyllabusBadges.length)
  console.log('Extra Badges:', result.validExtraBadges.length)
}

testFix().catch(console.error)
