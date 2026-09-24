import * as cheerio from 'cheerio'
import { validateProfileUrl, cleanBadgeText, parseEarnedDate, isDateWithinProgram, CATALOG_93_BADGES } from '../api/_scrape.js'

async function debugNouvalBadges() {
  const url = 'https://www.skills.google/public_profiles/064ee134-5e9b-45a6-8336-bc8f15e6259a'
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 (GCAF-Tracker/2026)'
    }
  })
  const html = await res.text()
  const $ = cheerio.load(html)

  console.log('=== ALL BADGES FOUND ON PROFILE ===')
  let count = 0
  $('.profile-badge, .badge-card, .public-profile-badge').each((i, el) => {
    count++
    const $el = $(el)
    const rawText = $el.text()
    const { title, dateText: embeddedDate } = cleanBadgeText(rawText)
    const href = $el.find('a').attr('href') || ''
    const domDateText = $el.find('.badge-date, .earned-date, span[class*="date"]').text().trim()
    const finalDateText = domDateText || embeddedDate
    const { date, unknown } = parseEarnedDate(finalDateText)
    const validDate = isDateWithinProgram(date, unknown)

    console.log(`${count}. [${title}] | DateRaw: "${finalDateText}" | Parsed: ${date ? date.toISOString() : 'NULL'} (Unknown: ${unknown}) | DateValid: ${validDate} | Href: ${href}`)
  })
}

debugNouvalBadges().catch(console.error)
