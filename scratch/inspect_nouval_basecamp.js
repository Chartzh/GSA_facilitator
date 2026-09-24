import * as cheerio from 'cheerio'
import { validateProfileUrl, cleanBadgeText, parseEarnedDate, isDateWithinProgram } from '../api/_scrape.js'

async function checkSeptBadges() {
  const url = 'https://www.skills.google/public_profiles/064ee134-5e9b-45a6-8336-bc8f15e6259a'
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 (GCAF-Tracker/2026)'
    }
  })
  const html = await res.text()
  const $ = cheerio.load(html)

  $('.profile-badge, .badge-card, .public-profile-badge').each((i, el) => {
    const $el = $(el)
    const rawText = $el.text()
    const { title, dateText: embeddedDate } = cleanBadgeText(rawText)
    const domDateText = $el.find('.badge-date, .earned-date, span[class*="date"]').text().trim()
    const finalDateText = domDateText || embeddedDate
    const { date, unknown } = parseEarnedDate(finalDateText)

    if (title.toLowerCase().includes('base camp') || title.toLowerCase().includes('september') || (date && date.getMonth() === 8)) {
      console.log(`- [${title}] DateRaw: "${finalDateText}" | Parsed: ${date ? date.toISOString() : 'NULL'} | Valid: ${isDateWithinProgram(date, unknown)}`)
    }
  })
}

checkSeptBadges().catch(console.error)
