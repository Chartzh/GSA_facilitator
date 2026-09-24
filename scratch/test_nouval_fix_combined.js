import * as cheerio from 'cheerio'
import {
  PROGRAM,
  POINTS,
  TIERS,
  ARCADE_GAMES,
  SKILL_BADGES,
  GEAR_BADGES,
  EXTRA_BADGES_ALLOWED,
  BONUS_MILESTONE_POINTS
} from '../api/_program.js'
import {
  basePoints as calcBasePoints,
  milestoneBonus as calcMilestoneBonus,
  currentMilestone as calcCurrentMilestone,
  totalPoints as calcTotalPoints,
  MILESTONES
} from '../api/_points.js'
import { validateProfileUrl, cleanBadgeText, parseEarnedDate, normalizeTitle, CATALOG_93_BADGES } from '../api/_scrape.js'

// Fix ARCADE_GAMES July base camp matcher in memory
const FIXED_ARCADE_GAMES = ARCADE_GAMES.map(g => {
  if (g.id === 7313) {
    return {
      ...g,
      match: (t) => t.includes('base camp') && (t.includes('july') || t.includes('juli') || (!t.includes('august') && !t.includes('agustus') && !t.includes('september') && !t.includes('sept')))
    }
  }
  return g
})

const PROGRAM_START = Date.UTC(2026, 6, 12, 17, 0, 0)
const PROGRAM_END   = Date.UTC(2026, 9, 14, 23, 59, 59)

function isDateWithinProgramFixed(parsedDate, dateUnknown) {
  if (dateUnknown || !parsedDate) return true
  const t = parsedDate.getTime()
  if (isNaN(t)) return true
  return t >= PROGRAM_START && t <= PROGRAM_END
}

async function testNouvalFixedScrape() {
  const profileUrl = 'https://www.skills.google/public_profiles/064ee134-5e9b-45a6-8336-bc8f15e6259a'
  const res = await fetch(profileUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 (GCAF-Tracker/2026)'
    }
  })
  const html = await res.text()
  const $ = cheerio.load(html)

  const RE_COURSE_TEMPLATE = /(?:course_templates|paths)\/(\d+)/i
  const RE_GAME = /(?:games|game_templates|events|quests)\/(\d+)/i

  const rawBadges = []
  $('.profile-badge, .badge-card, .public-profile-badge').each((_, el) => {
    const $el = $(el)
    const rawText = $el.text()
    const { title, dateText: embeddedDate } = cleanBadgeText(rawText)
    const href = $el.find('a').attr('href') || ''
    const imgSrc = $el.find('img').attr('src') || $el.find('img').attr('data-src') || null

    let courseId = null
    let gameId = null

    const matchCourse = href.match(RE_COURSE_TEMPLATE)
    if (matchCourse) courseId = parseInt(matchCourse[1], 10)

    const matchGame = href.match(RE_GAME)
    if (matchGame) gameId = parseInt(matchGame[1], 10)

    const domDateText = $el.find('.badge-date, .earned-date, span[class*="date"]').text().trim()
    const finalDateText = domDateText || embeddedDate
    const { date, unknown } = parseEarnedDate(finalDateText)

    if (title && (courseId || gameId || title.length > 2)) {
      rawBadges.push({
        title,
        href,
        courseId,
        gameId,
        earnedDateRaw: finalDateText,
        parsedDate: date,
        dateUnknown: unknown,
        imageUrl: imgSrc
      })
    }
  })

  const validGames = []
  const validSyllabusBadges = []
  const validExtraBadges = []
  const excludedItems = []

  const syllabusMap = new Map()
  SKILL_BADGES.forEach(b => syllabusMap.set(b.id, b))

  const gameMap = new Map()
  FIXED_ARCADE_GAMES.forEach(g => gameMap.set(g.id, g))

  rawBadges.forEach(b => {
    const dateValid = isDateWithinProgramFixed(b.parsedDate, b.dateUnknown)

    if (b.gameId && gameMap.has(b.gameId)) {
      if (dateValid) {
        validGames.push({
          ...gameMap.get(b.gameId),
          earnedDate: b.earnedDateRaw || 'Selesai',
          imageUrl: b.imageUrl
        })
      } else {
        excludedItems.push({ title: b.title, reason: 'Game dikerjakan di luar periode program', date: b.earnedDateRaw })
      }
      return
    }

    if (b.courseId && syllabusMap.has(b.courseId)) {
      if (dateValid) {
        validSyllabusBadges.push({
          ...syllabusMap.get(b.courseId),
          earnedDate: b.earnedDateRaw || 'Selesai',
          imageUrl: b.imageUrl
        })
      } else {
        excludedItems.push({ title: b.title, reason: 'Skill Badge dikerjakan di luar periode program', date: b.earnedDateRaw })
      }
      return
    }

    const normTitle = normalizeTitle(b.title)

    let matchedGame = FIXED_ARCADE_GAMES.find(g => (g.match && g.match(normTitle)) || normalizeTitle(g.name) === normTitle || normTitle.includes(normalizeTitle(g.name)))
    if (matchedGame) {
      if (dateValid) {
        validGames.push({ ...matchedGame, earnedDate: b.earnedDateRaw || 'Selesai', imageUrl: b.imageUrl })
      } else {
        excludedItems.push({ title: b.title, reason: 'Game dikerjakan di luar periode program', date: b.earnedDateRaw })
      }
      return
    }

    let matchedBadge = SKILL_BADGES.find(sb => {
      const sbNameIndo = normalizeTitle(sb.name)
      const sbNameEng = sb.nameEn ? normalizeTitle(sb.nameEn) : ''
      return normTitle === sbNameIndo || normTitle.includes(sbNameIndo) || sbNameIndo.includes(normTitle) ||
             (sbNameEng && (normTitle === sbNameEng || normTitle.includes(sbNameEng) || sbNameEng.includes(normTitle)))
    })
    if (matchedBadge) {
      if (dateValid) {
        validSyllabusBadges.push({ ...matchedBadge, earnedDate: b.earnedDateRaw || 'Selesai', imageUrl: b.imageUrl })
      } else {
        excludedItems.push({ title: b.title, reason: 'Skill Badge dikerjakan di luar periode program', date: b.earnedDateRaw })
      }
      return
    }

    const matchedExtra = Array.isArray(EXTRA_BADGES_ALLOWED) && EXTRA_BADGES_ALLOWED.find(extraName => {
      const eNorm = normalizeTitle(extraName)
      return normTitle === eNorm || normTitle.includes(eNorm) || eNorm.includes(normTitle)
    })

    if (matchedExtra) {
      const canonicalMap = {
        "implement sensitive data protection on google cloud": "Get Started with Sensitive Data Protection",
        "discover and protect sensitive data across your ecosystem": "Get Started with Sensitive Data Protection",
        "kickstarting application development with gemini code assist": "Get Started with App Development using Gemini Code Assist",
        "build real world ai applications with gemini and imagen": "Build Useful AI Applications with Gemini and Imagen",
        "claim skill badge: organize and manage data with dataplex": "Organize and Manage Data with Dataplex",
        "organize and govern data with knowledge catalog": "Organize and Manage Data with Dataplex",
        "build a data mesh with knowledge catalog": "Organize and Manage Data with Dataplex",
        "use apis to work with cloud storage": "Use APIs to Manage Cloud Storage",
        "connecting cloud networks with ncc": "Connect Cloud Networks with NCC",
        "deploy and secure serverless apis with api gateway": "Get Started with API Gateway",
        "use functions, formulas, and charts in google sheets": "Using Functions, Formulas, and Charts in Google Sheets",
        "implement cloud security fundamentals on google cloud": "Implement Cloud Security Fundamentals in Google Cloud",
        "develop serverless applications on cloud run": "Develop Serverless Apps on Cloud Run",
        "implement ci/cd pipelines on google cloud": "Implement CI/CD Pipelines in Google Cloud",
        "build infrastructure with terraform on google cloud": "Build Infrastructure with Terraform in Google Cloud"
      }
      const canonicalName = canonicalMap[normTitle] || matchedExtra
      const isAlreadyInSyllabus = validSyllabusBadges.some(sb => {
        const sbNorm = normalizeTitle(sb.name)
        const cNorm = normalizeTitle(canonicalName)
        return sbNorm === cNorm || sbNorm.includes(cNorm) || cNorm.includes(sbNorm)
      })

      if (!isAlreadyInSyllabus) {
        if (dateValid) {
          validExtraBadges.push({
            id: b.courseId || b.gameId || Math.floor(Math.random() * 100000),
            name: canonicalName,
            url: b.href ? (b.href.startsWith('http') ? b.href : `https://www.skills.google${b.href}`) : profileUrl,
            tier: 'beginner',
            labs: 1,
            credits: 0,
            earnedDate: b.earnedDateRaw || 'Selesai',
            imageUrl: b.imageUrl
          })
        } else {
          excludedItems.push({ title: b.title, reason: 'Badge katalog tambahan di luar periode program', date: b.earnedDateRaw })
        }
      }
    } else {
      excludedItems.push({ title: b.title, reason: 'Skill Badge tidak masuk dalam daftar 93 Katalog Resmi Arcade 2026', date: b.earnedDateRaw })
    }
  })

  const uniqueGames = Array.from(new Map(validGames.map(g => [g.id, g])).values())
  const uniqueSyllabusBadges = Array.from(new Map(validSyllabusBadges.map(b => [b.id, b])).values())
  const uniqueExtraBadges = Array.from(new Map(validExtraBadges.map(b => [normalizeTitle(b.name), b])).values())

  // Unified catalog matching engine
  const normNoSpace = (s) => (s || '').toLowerCase().trim().replace(/[^a-z0-9]/g, '')
  const allEarnedMap = new Map()
  validSyllabusBadges.forEach(b => allEarnedMap.set(normNoSpace(b.name), b.earnedDate || 'Selesai'))
  validExtraBadges.forEach(b => allEarnedMap.set(normNoSpace(b.name), b.earnedDate || 'Selesai'))

  const catalogAliases = new Map([
    ["get started with sensitive data protection", ["implement sensitive data protection on google cloud", "discover and protect sensitive data across your ecosystem"]],
    ["discover and protect sensitive data across your ecosystem", ["get started with sensitive data protection", "implement sensitive data protection on google cloud"]],
    ["get started with app development using gemini code assist", ["kickstarting application development with gemini code assist"]],
    ["build useful ai applications with gemini and imagen", ["build real world ai applications with gemini and imagen"]],
    ["organize and manage data with dataplex", ["claim skill badge: organize and manage data with dataplex", "organize and govern data with knowledge catalog", "build a data mesh with knowledge catalog"]],
    ["build a data mesh with knowledge catalog", ["organize and manage data with dataplex", "organize and govern data with knowledge catalog"]],
    ["use apis to manage cloud storage", ["use apis to work with cloud storage"]],
    ["connect cloud networks with ncc", ["connecting cloud networks with ncc"]],
    ["get started with api gateway", ["deploy and secure serverless apis with api gateway"]],
    ["using functions, formulas, and charts in google sheets", ["use functions, formulas, and charts in google sheets"]],
    ["implement cloud security fundamentals in google cloud", ["implement cloud security fundamentals on google cloud"]],
    ["develop serverless apps on cloud run", ["develop serverless applications on cloud run"]],
    ["implement ci/cd pipelines in google cloud", ["implement ci/cd pipelines on google cloud"]],
    ["build infrastructure with terraform in google cloud", ["build infrastructure with terraform on google cloud"]]
  ])

  let matchedCatalogCount = 0
  if (Array.isArray(EXTRA_BADGES_ALLOWED)) {
    const catalog93 = CATALOG_93_BADGES
    const matchedSet = new Set()
    catalog93.forEach(catName => {
      const cNorm = normNoSpace(catName)
      let found = allEarnedMap.has(cNorm)
      if (!found) {
        for (const [key] of allEarnedMap.entries()) {
          if (key === cNorm || key.includes(cNorm) || cNorm.includes(key)) {
            found = true
            break
          }
        }
      }
      if (!found) {
        const catKey = catName.toLowerCase().trim()
        const aliasList = catalogAliases.get(catKey) || []
        for (const al of aliasList) {
          const alNorm = normNoSpace(al)
          found = allEarnedMap.has(alNorm)
          if (!found) {
            for (const [key] of allEarnedMap.entries()) {
              if (key === alNorm || key.includes(alNorm) || alNorm.includes(key)) {
                found = true
                break
              }
            }
          }
          if (found) break
        }
      }
      if (found) {
        matchedSet.add(cNorm)
      }
    })
    matchedCatalogCount = matchedSet.size
  }

  const totalBadgesCount = Math.min(95, matchedCatalogCount > 0 ? matchedCatalogCount : (uniqueSyllabusBadges.length + uniqueExtraBadges.length))

  console.log('=== FIXED TEST RESULT FOR NOUVAL AIMAN ===')
  console.log('Games Count:', uniqueGames.length)
  console.log('Skill Badges Count:', totalBadgesCount)
  console.log('Games List:', uniqueGames.map(g => `${g.id}: ${g.name}`))
}

testNouvalFixedScrape().catch(console.error)
