import * as cheerio from 'cheerio'
import { validateProfileUrl, cleanBadgeText, parseEarnedDate, isDateWithinProgram, CATALOG_93_BADGES } from '../api/_scrape.js'
import { SKILL_BADGES, EXTRA_BADGES_ALLOWED } from '../api/_program.js'

async function inspectNouvalBadges() {
  const url = 'https://www.skills.google/public_profiles/064ee134-5e9b-45a6-8336-bc8f15e6259a'
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 (GCAF-Tracker/2026)'
    }
  })
  const html = await res.text()
  const $ = cheerio.load(html)

  const badges = []
  $('.profile-badge, .badge-card, .public-profile-badge').each((i, el) => {
    const $el = $(el)
    const rawText = $el.text()
    const { title, dateText: embeddedDate } = cleanBadgeText(rawText)
    const domDateText = $el.find('.badge-date, .earned-date, span[class*="date"]').text().trim()
    const finalDateText = domDateText || embeddedDate
    const { date, unknown } = parseEarnedDate(finalDateText)

    badges.push({ title, finalDateText, date, unknown })
  })

  console.log(`Total raw badges found on profile: ${badges.length}`)

  // Group by earned date / year / month
  const beforeProgram = badges.filter(b => b.date && b.date.getTime() < Date.UTC(2026, 6, 12, 17, 0, 0))
  const duringProgram = badges.filter(b => !b.date || (b.date.getTime() >= Date.UTC(2026, 6, 12, 17, 0, 0) && b.date.getTime() <= Date.UTC(2026, 9, 14, 23, 59, 59)))
  const afterProgram = badges.filter(b => b.date && b.date.getTime() > Date.UTC(2026, 9, 14, 23, 59, 59))

  console.log(`Badges before July 13, 2026: ${beforeProgram.length}`)
  beforeProgram.forEach(b => console.log(`  - [BEFORE] ${b.title} (${b.finalDateText})`))

  console.log(`\nBadges during Program (July 13 - Oct 14): ${duringProgram.length}`)

  // Check how many of duringProgram badges match catalog
  const catalogSet = new Set()
  CATALOG_93_BADGES.forEach(c => catalogSet.add(c.toLowerCase().trim()))

  let matchedDuring = 0
  duringProgram.forEach(b => {
    const titleLower = b.title.toLowerCase().trim()
    const matched = CATALOG_93_BADGES.some(c => {
      const cLower = c.toLowerCase().trim()
      return titleLower.includes(cLower) || cLower.includes(titleLower)
    })
    if (matched) matchedDuring++
  })

  console.log(`Matched Catalog Badges during program: ${matchedDuring}`)
}

inspectNouvalBadges().catch(console.error)
