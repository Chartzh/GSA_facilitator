import * as cheerio from 'cheerio'
import {
  PROGRAM,
  POINTS,
  TIERS,
  ARCADE_GAMES,
  SKILL_BADGES,
  GEAR_BADGES,
  BONUS_MILESTONE_POINTS
} from './_program.js'
import {
  basePoints as calcBasePoints,
  milestoneBonus as calcMilestoneBonus,
  currentMilestone as calcCurrentMilestone,
  totalPoints as calcTotalPoints,
  MILESTONES
} from './_points.js'

export function validateProfileUrl(profileUrl) {
  if (!profileUrl || typeof profileUrl !== 'string') {
    return { valid: false, error: 'Masukkan link public profile Google Skills Anda.' }
  }

  let parsed
  try {
    parsed = new URL(profileUrl.trim())
  } catch {
    return { valid: false, error: 'Format link tidak valid. Pastikan diawali http:// atau https://' }
  }

  const allowedHosts = [
    'skills.google',
    'www.skills.google',
    'cloudskillsboost.google',
    'www.cloudskillsboost.google',
    'qwiklabs.com',
    'www.qwiklabs.com',
  ]

  if (!allowedHosts.includes(parsed.hostname.toLowerCase())) {
    return {
      valid: false,
      error: 'Host tidak diizinkan. Gunakan link public profile dari Google Skills, Google Cloud Skills Boost, atau Qwiklabs.'
    }
  }

  if (!parsed.pathname.includes('/public_profiles/')) {
    return {
      valid: false,
      error: 'Link harus mengarah ke halaman public profile (mengandung /public_profiles/).'
    }
  }

  return { valid: true, url: parsed.toString() }
}

export function normalizeTitle(str) {
  return (str || '')
    .toLowerCase()
    .replace(/&amp;/g, '&')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

const RE_COURSE_TEMPLATE = /(?:course_templates|paths)\/(\d+)/i
const RE_GAME = /(?:games|game_templates|events|quests)\/(\d+)/i

export function parseEarnedDate(dateStr) {
  if (!dateStr || !dateStr.trim()) {
    return { date: null, unknown: true }
  }

  const clean = dateStr.trim()
  const isoDate = new Date(clean)
  if (!isNaN(isoDate.getTime()) && clean.length >= 8) {
    return { date: isoDate, unknown: false }
  }

  const match = clean.match(/([A-Za-z]+)\s+(\d{1,2}),?\s+(\d{4})/)
  if (match) {
    const [, monthStr, dayStr, yearStr] = match
    const dateParsed = new Date(`${monthStr} ${dayStr}, ${yearStr}`)
    if (!isNaN(dateParsed.getTime())) {
      return { date: dateParsed, unknown: false }
    }
  }

  return { date: null, unknown: true }
}

export function isDateWithinProgram(parsedDate, dateUnknown) {
  if (dateUnknown || !parsedDate) return true
  const start = new Date(PROGRAM.startDate)
  const end = new Date(PROGRAM.endDate)
  return parsedDate >= start && parsedDate <= end
}

export function parseProfileHtml(html, profileUrl) {
  const $ = cheerio.load(html)
  let profileName = 'Peserta Google Skills'

  const h1Text = $('h1').first().text().trim()
  if (h1Text && !h1Text.toLowerCase().includes('public profile') && !h1Text.toLowerCase().includes('user profile')) {
    profileName = h1Text
  } else {
    const titleText = $('title').text().trim()
    if (titleText) {
      const parts = titleText.split('|')
      if (parts.length > 0 && parts[0].trim()) {
        profileName = parts[0].replace(/User Profile/i, '').replace(/Public Profile/i, '').trim() || profileName
      }
    }
  }

  const rawBadges = []
  $('.profile-badge, .badge-card, .public-profile-badge, div[class*="badge"]').each((_, el) => {
    const $el = $(el)
    const title = $el.find('h4, .badge-title, strong, a').first().text().trim() || $el.text().trim()
    const href = $el.find('a').attr('href') || ''
    const imgSrc = $el.find('img').attr('src') || $el.find('img').attr('data-src') || null

    let courseId = null
    let gameId = null

    const matchCourse = href.match(RE_COURSE_TEMPLATE)
    if (matchCourse) courseId = parseInt(matchCourse[1], 10)

    const matchGame = href.match(RE_GAME)
    if (matchGame) gameId = parseInt(matchGame[1], 10)

    const dateText = $el.find('.badge-date, .earned-date, span[class*="date"]').text().trim()
    const { date, unknown } = parseEarnedDate(dateText)

    if (title && (courseId || gameId || title.length > 3)) {
      rawBadges.push({
        title,
        href,
        courseId,
        gameId,
        earnedDateRaw: dateText,
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
  let unknownDateCount = 0

  const syllabusMap = new Map()
  SKILL_BADGES.forEach(b => syllabusMap.set(b.id, b))

  const gameMap = new Map()
  ARCADE_GAMES.forEach(g => gameMap.set(g.id, g))

  rawBadges.forEach(b => {
    if (b.dateUnknown) unknownDateCount++
    const dateValid = isDateWithinProgram(b.parsedDate, b.dateUnknown)

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
    let matchedGame = ARCADE_GAMES.find(g => normalizeTitle(g.name) === normTitle || normTitle.includes(normalizeTitle(g.name)))
    if (matchedGame) {
      if (dateValid) {
        validGames.push({ ...matchedGame, earnedDate: b.earnedDateRaw || 'Selesai', imageUrl: b.imageUrl })
      } else {
        excludedItems.push({ title: b.title, reason: 'Game dikerjakan di luar periode program', date: b.earnedDateRaw })
      }
      return
    }

    let matchedBadge = SKILL_BADGES.find(sb => normalizeTitle(sb.name) === normTitle || normTitle.includes(normalizeTitle(sb.name)))
    if (matchedBadge) {
      if (dateValid) {
        validSyllabusBadges.push({ ...matchedBadge, earnedDate: b.earnedDateRaw || 'Selesai', imageUrl: b.imageUrl })
      } else {
        excludedItems.push({ title: b.title, reason: 'Skill Badge dikerjakan di luar periode program', date: b.earnedDateRaw })
      }
      return
    }

    if (dateValid) {
      validExtraBadges.push({
        id: b.courseId || b.gameId || Math.floor(Math.random() * 100000),
        name: b.title,
        url: b.href ? `https://www.skills.google${b.href}` : profileUrl,
        tier: 'beginner',
        labs: 1,
        credits: 0,
        earnedDate: b.earnedDateRaw || 'Selesai',
        imageUrl: b.imageUrl
      })
    } else {
      excludedItems.push({ title: b.title, reason: 'Badge katalog tambahan di luar periode program', date: b.earnedDateRaw })
    }
  })

  const uniqueGames = Array.from(new Map(validGames.map(g => [g.id, g])).values())
  const uniqueSyllabusBadges = Array.from(new Map(validSyllabusBadges.map(b => [b.id, b])).values())
  const uniqueExtraBadges = Array.from(new Map(validExtraBadges.map(b => [b.name, b])).values())

  const baseP = calcBasePoints(uniqueGames.length, uniqueSyllabusBadges.length + uniqueExtraBadges.length)
  const milestone = calcCurrentMilestone(uniqueGames.length, uniqueSyllabusBadges.length + uniqueExtraBadges.length)
  const milestoneBonusP = calcMilestoneBonus(uniqueGames.length, uniqueSyllabusBadges.length + uniqueExtraBadges.length)
  const totalPointsWithBonus = baseP + milestoneBonusP

  const currentTier = TIERS.slice().reverse().find(t => totalPointsWithBonus >= t.minPoints) || null
  const nextTier = TIERS.find(t => t.minPoints > totalPointsWithBonus) || null

  let nextMilestoneNeeds = null
  if (milestone?.key !== 'ULTIMATE') {
    const nextM = MILESTONES[MILESTONES.findIndex(m => m.key === milestone?.key) + 1] || MILESTONES[0]
    nextMilestoneNeeds = {
      label: nextM.label,
      neededGames: Math.max(0, nextM.games - uniqueGames.length),
      neededBadges: Math.max(0, nextM.badges - (uniqueSyllabusBadges.length + uniqueExtraBadges.length))
    }
  }

  return {
    profileUrl,
    profileName,
    validGames: uniqueGames,
    validSyllabusBadges: uniqueSyllabusBadges,
    validExtraBadges: uniqueExtraBadges,
    excludedItems,
    pointsFromGames: uniqueGames.length * POINTS.perGame,
    pointsFromSkillBadges: (uniqueSyllabusBadges.length + uniqueExtraBadges.length) / POINTS.skillBadgesPerPoint,
    basePoints: baseP,
    milestoneBonus: milestoneBonusP,
    totalPointsWithBonus,
    highestMilestone: milestone,
    currentTier,
    nextTier,
    nextMilestoneNeeds,
    unknownDateCount
  }
}
