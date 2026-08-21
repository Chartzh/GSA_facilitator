import * as cheerio from 'cheerio'
import {
  PROGRAM,
  POINTS,
  TIERS,
  ARCADE_GAMES,
  SKILL_BADGES,
  GEAR_BADGES,
  EXTRA_BADGES_ALLOWED,
  BONUS_MILESTONE_POINTS,
  ArcadeGame,
  SkillBadge
} from '../config/program'
import {
  basePoints as calcBasePoints,
  milestoneBonus as calcMilestoneBonus,
  currentMilestone as calcCurrentMilestone,
  totalPoints as calcTotalPoints,
  MILESTONES
} from './points'

// --- URL Validation ---
export interface UrlValidationResult {
  valid: boolean
  url?: string
  error?: string
}

export function validateProfileUrl(profileUrl: string): UrlValidationResult {
  if (!profileUrl || typeof profileUrl !== 'string') {
    return { valid: false, error: 'Masukkan link public profile Google Skills Anda.' }
  }

  let parsed: URL
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

// --- Helpers ---
export function normalizeTitle(str: string): string {
  return str
    .toLowerCase()
    .replace(/&amp;/g, '&')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

// Regex matching for URLs
const RE_COURSE_TEMPLATE = /(?:course_templates|paths)\/(\d+)/i
const RE_GAME = /(?:games|game_templates|events|quests)\/(\d+)/i

export interface RawExtractedBadge {
  title: string
  href: string
  courseId: number | null
  gameId: number | null
  earnedDateRaw: string
  parsedDate: Date | null
  dateUnknown: boolean
  imageUrl?: string | null
}

export function parseEarnedDate(dateStr: string): { date: Date | null; unknown: boolean } {
  if (!dateStr || !dateStr.trim()) {
    return { date: null, unknown: true }
  }

  const clean = dateStr.trim()

  // Try parsing ISO date
  const isoDate = new Date(clean)
  if (!isNaN(isoDate.getTime()) && clean.length >= 8) {
    return { date: isoDate, unknown: false }
  }

  // Regex for "Earned Jul 15, 2026" or "Jul 15, 2026" or "15 Jul 2026"
  const englishMonthRegex = /(?:Earned\s+)?([A-Za-z]+)\s+(\d{1,2}),?\s+(\d{4})/i
  const engMatch = englishMonthRegex.exec(clean)
  if (engMatch) {
    const d = new Date(`${engMatch[1]} ${engMatch[2]}, ${engMatch[3]}`)
    if (!isNaN(d.getTime())) {
      // Zero out time component to start of day (00:00:00)
      d.setHours(0, 0, 0, 0)
      return { date: d, unknown: false }
    }
  }

  const indonesianMonthRegex = /(?:Diperoleh\s+)?(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})/i
  const indoMatch = indonesianMonthRegex.exec(clean)
  if (indoMatch) {
    const monthNames: Record<string, string> = {
      januari: 'Jan', februari: 'Feb', maret: 'Mar', april: 'Apr',
      mei: 'May', juni: 'Jun', juli: 'Jul', agustus: 'Aug',
      september: 'Sep', oktober: 'Oct', november: 'Nov', desember: 'Dec'
    }
    const mName = monthNames[indoMatch[2].toLowerCase()] || indoMatch[2]
    const d = new Date(`${mName} ${indoMatch[1]}, ${indoMatch[3]}`)
    if (!isNaN(d.getTime())) {
      d.setHours(0, 0, 0, 0)
      return { date: d, unknown: false }
    }
  }

  return { date: null, unknown: true }
}

export function findArcadeGameMatch(raw: RawExtractedBadge, _matchedGameIds?: Set<number>): ArcadeGame | null {
  if (raw.gameId) {
    const gameById = ARCADE_GAMES.find(g => g.id === raw.gameId)
    if (gameById) return gameById
  }

  const norm = normalizeTitle(raw.title)

  const matched = ARCADE_GAMES.find(g => (g.match && g.match(norm)) || normalizeTitle(g.name) === norm || norm.includes(normalizeTitle(g.name)))
  if (matched) return matched

  return null
}

export interface ParsedProfileResult {
  profileName: string
  profileUrl: string
  totalRawBadges: number
  validGames: (ArcadeGame & { earnedDate: string; dateUnknown: boolean; imageUrl?: string | null })[]
  validSyllabusBadges: (SkillBadge & { earnedDate: string; dateUnknown: boolean; matchMethod: 'id' | 'title'; imageUrl?: string | null })[]
  validExtraBadges: { id: number | null; name: string; earnedDate: string; dateUnknown: boolean; imageUrl?: string | null }[]
  excludedItems: { title: string; dateStr: string; reason: string; imageUrl?: string | null }[]
  unknownDateCount: number
  pointsFromGames: number
  pointsFromSkillBadges: number
  totalArcadePoints: number
  highestMilestone: typeof MILESTONES[number] | null
  milestoneBonus: number
  hasGearBonus: boolean
  gearBonus: number
  totalPointsWithBonus: number
  currentTier: typeof TIERS[number] | null
  nextMilestoneNeeds: { label: string; neededGames: number; neededBadges: number } | null
}

export function cleanBadgeText(rawText: string): { title: string; dateText: string } {
  if (!rawText) return { title: '', dateText: '' }

  let clean = rawText.replace(/\r\n/g, '\n').trim()
  let dateText = ''

  const dateMatch = clean.match(/(?:Earned|Diselesaikan)\s+([A-Za-z0-9, ]+)/i)
  if (dateMatch) {
    dateText = dateMatch[0].trim()
    clean = clean.replace(dateMatch[0], '').trim()
  }

  const lines = clean.split('\n').map(l => l.trim()).filter(Boolean)
  const title = lines[0] || ''

  return { title, dateText }
}

export function parseProfileHtml(html: string, profileUrl: string): ParsedProfileResult {
  let profileName = 'Peserta Google Skills'
  const extractedBadges: RawExtractedBadge[] = []
  const seenHrefs = new Set<string>()

  // Browser Client Parsing via DOMParser if in browser
  if (typeof window !== 'undefined' && typeof DOMParser !== 'undefined') {
    try {
      const doc = new DOMParser().parseFromString(html, 'text/html')
      profileName = doc.querySelector('h1.ql-display-small, h1')?.textContent?.trim() || profileName

      const elements = doc.querySelectorAll('.profile-badge, .badge-card, .public-profile-badge')
      elements.forEach((card) => {
        const rawText = card.textContent || ''
        const { title, dateText: embeddedDate } = cleanBadgeText(rawText)
        const linkEl = card.querySelector('a[href*="course_templates"], a[href*="games"], a[href*="quests"], a[href*="badges"]')
        const href = linkEl?.getAttribute('href') || card.getAttribute('href') || ''
        const dateStr = card.querySelector('time, .ql-body-medium, [class*="date"], [class*="earned"], [class*="description"]')?.textContent?.trim() || embeddedDate
        const imgEl = card.querySelector('img')
        const imageUrl = imgEl?.getAttribute('src') || null

        if (title) {
          const courseMatch = RE_COURSE_TEMPLATE.exec(href)
          const gameMatch = RE_GAME.exec(href)
          const parsed = parseEarnedDate(dateStr)
          const key = `${href}-${title}`
          if (!seenHrefs.has(key)) {
            seenHrefs.add(key)
            extractedBadges.push({
              title,
              href,
              courseId: courseMatch ? parseInt(courseMatch[1], 10) : null,
              gameId: gameMatch ? parseInt(gameMatch[1], 10) : null,
              earnedDateRaw: dateStr,
              parsedDate: parsed.date,
              dateUnknown: parsed.unknown,
              imageUrl
            })
          }
        }
      })
    } catch {
      // Fallback to Cheerio if DOMParser fails
    }
  }

  // Fallback to Cheerio (Node serverless environment or if DOMParser returned empty)
  if (extractedBadges.length === 0) {
    const $ = cheerio.load(html)
    profileName = $('h1.ql-display-small, h1').first().text().trim() || profileName

    $('.profile-badge, .badge-card, .public-profile-badge').each((_, el) => {
      const card = $(el)
      const rawText = card.text()
      const { title, dateText: embeddedDate } = cleanBadgeText(rawText)
      const linkEl = card.find('a[href*="course_templates"], a[href*="games"], a[href*="quests"], a[href*="badges"]').first()
      const href = linkEl.attr('href') || card.attr('href') || ''
      const dateStr = card.find('.badge-date, .earned-date, span[class*="date"]').text().trim() || embeddedDate
      const imgEl = card.find('img').first()
      const imageUrl = imgEl.attr('src') || null

      if (title) {
        const courseMatch = RE_COURSE_TEMPLATE.exec(href)
        const gameMatch = RE_GAME.exec(href)
        const parsed = parseEarnedDate(dateStr)

        const key = `${href}-${title}`
        if (!seenHrefs.has(key)) {
          seenHrefs.add(key)
          extractedBadges.push({
            title,
            href,
            courseId: courseMatch ? parseInt(courseMatch[1], 10) : null,
            gameId: gameMatch ? parseInt(gameMatch[1], 10) : null,
            earnedDateRaw: dateStr,
            parsedDate: parsed.date,
            dateUnknown: parsed.unknown,
            imageUrl
          })
        }
      }
    })
  }

  const pStartDate = new Date(PROGRAM.startDate) // 2026-07-13T00:00:00+07:00
  pStartDate.setHours(0, 0, 0, 0)
  const pEndDate = new Date(PROGRAM.endDate)

  const validGames: (ArcadeGame & { earnedDate: string; dateUnknown: boolean; imageUrl?: string | null })[] = []
  const validSyllabusBadges: (SkillBadge & { earnedDate: string; dateUnknown: boolean; matchMethod: 'id' | 'title'; imageUrl?: string | null })[] = []
  const validExtraBadges: { id: number | null; name: string; earnedDate: string; dateUnknown: boolean; imageUrl?: string | null }[] = []
  const excludedItems: { title: string; dateStr: string; reason: string; imageUrl?: string | null }[] = []

  let unknownDateCount = 0
  const matchedSkillIds = new Set<number>()
  const matchedGameIds = new Set<number>()

  for (const raw of extractedBadges) {
    // ATURAN #2: Date Filtering (Diperoleh dari 13 Juli 2026 - 14 Sep 2026)
    if (!raw.dateUnknown && raw.parsedDate) {
      if (raw.parsedDate < pStartDate) {
        excludedItems.push({
          title: raw.title,
          dateStr: raw.earnedDateRaw || 'Sebelum 13 Juli 2026',
          reason: 'Diperoleh sebelum 13 Juli 2026 (di luar periode program)',
          imageUrl: raw.imageUrl
        })
        continue
      }
      if (raw.parsedDate > pEndDate) {
        excludedItems.push({
          title: raw.title,
          dateStr: raw.earnedDateRaw || 'Setelah 14 Sep 2026',
          reason: 'Diperoleh setelah 14 September 2026 (di luar periode program)',
          imageUrl: raw.imageUrl
        })
        continue
      }
    } else {
      unknownDateCount++
    }

    // 1. Check Arcade Game Match (ID or Title/Keywords)
    let arcadeGame = findArcadeGameMatch(raw, matchedGameIds)

    // If returned game ID is already claimed, attempt reassigning to an unearned game slot
    if (arcadeGame && matchedGameIds.has(arcadeGame.id)) {
      const openSlot = ARCADE_GAMES.find(g => !matchedGameIds.has(g.id))
      if (openSlot) arcadeGame = openSlot
    }

    if (arcadeGame && !matchedGameIds.has(arcadeGame.id)) {
      matchedGameIds.add(arcadeGame.id)
      validGames.push({ ...arcadeGame, earnedDate: raw.earnedDateRaw, dateUnknown: raw.dateUnknown, imageUrl: raw.imageUrl })
      continue
    }

    // 2. Match Skill Badges by ID
    if (raw.courseId) {
      const syllabusBadge = SKILL_BADGES.find(b => b.id === raw.courseId)
      if (syllabusBadge && !matchedSkillIds.has(syllabusBadge.id)) {
        matchedSkillIds.add(syllabusBadge.id)
        validSyllabusBadges.push({
          ...syllabusBadge,
          earnedDate: raw.earnedDateRaw,
          dateUnknown: raw.dateUnknown,
          matchMethod: 'id',
          imageUrl: raw.imageUrl
        })
        continue
      }
    }

    // 3. Match Skill Badges by Title (Indonesian or English name)
    const normTitle = normalizeTitle(raw.title)
    const titleMatchedBadge = SKILL_BADGES.find(b => {
      const sbIndo = normalizeTitle(b.name)
      const sbEng = b.nameEn ? normalizeTitle(b.nameEn) : ''
      return normTitle === sbIndo || normTitle.includes(sbIndo) || sbIndo.includes(normTitle) ||
             (sbEng && (normTitle === sbEng || normTitle.includes(sbEng) || sbEng.includes(normTitle)))
    })
    if (titleMatchedBadge && !matchedSkillIds.has(titleMatchedBadge.id)) {
      matchedSkillIds.add(titleMatchedBadge.id)
      validSyllabusBadges.push({
        ...titleMatchedBadge,
        earnedDate: raw.earnedDateRaw,
        dateUnknown: raw.dateUnknown,
        matchMethod: 'title',
        imageUrl: raw.imageUrl
      })
      continue
    }

    // 4. All Other Skill Badges checked against 42 Catalog Extra Badges
    const normTitleStr = normalizeTitle(raw.title)
    const matchedExtra = Array.isArray(EXTRA_BADGES_ALLOWED) && EXTRA_BADGES_ALLOWED.find(extraName => {
      const eNorm = normalizeTitle(extraName)
      return normTitleStr === eNorm || normTitleStr.includes(eNorm) || eNorm.includes(normTitleStr)
    })

    if (matchedExtra) {
      const canonicalMap: Record<string, string> = {
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
      const canonicalName = canonicalMap[normTitleStr] || matchedExtra
      const isAlreadyInSyllabus = validSyllabusBadges.some(sb => {
        const sbNorm = normalizeTitle(sb.name)
        const cNorm = normalizeTitle(canonicalName)
        return sbNorm === cNorm || sbNorm.includes(cNorm) || cNorm.includes(sbNorm)
      })

      if (!isAlreadyInSyllabus) {
        validExtraBadges.push({
          id: raw.courseId,
          name: canonicalName,
          earnedDate: raw.earnedDateRaw,
          dateUnknown: raw.dateUnknown,
          imageUrl: raw.imageUrl
        })
      }
    } else {
      excludedItems.push({
        title: raw.title,
        dateStr: raw.earnedDateRaw || 'Selesai',
        reason: 'Skill Badge tidak masuk dalam daftar 93 Katalog Resmi Arcade 2026',
        imageUrl: raw.imageUrl
      })
    }
  }

  // ATURAN #4: Rumus Poin & Milestones dari points.ts
  const pointsFromGames = validGames.length * POINTS.perGame
  const uniqueExtraBadges = Array.from(new Map(validExtraBadges.map(b => [normalizeTitle(b.name), b])).values())
  const rawSkillBadgesCount = validSyllabusBadges.length + uniqueExtraBadges.length
  const totalSkillBadgesCount = Math.min(93, rawSkillBadgesCount)
  const pointsFromSkillBadges = totalSkillBadgesCount * 0.5

  const totalArcadePoints = calcBasePoints(validGames.length, totalSkillBadgesCount)
  const milestoneDef = calcCurrentMilestone(validGames.length, totalSkillBadgesCount)
  const milestoneBonus = calcMilestoneBonus(validGames.length, totalSkillBadgesCount)
  const highestMilestone = milestoneDef

  // Check Bonus Milestone (4 GEAR Badges)
  const gearCompletedCount = GEAR_BADGES.filter(gb => {
    return extractedBadges.some(b => {
      if (gb.id && b.courseId === gb.id) return true
      const normB = normalizeTitle(b.title)
      const normG = normalizeTitle(gb.name)
      return normB.includes(normG) || normG.includes(normB)
    })
  }).length

  const hasGearBonus = gearCompletedCount >= 4
  const gearBonus = hasGearBonus ? BONUS_MILESTONE_POINTS : 0
  const totalPointsWithBonus = totalArcadePoints + milestoneBonus + gearBonus

  // Current Tier evaluated against TOTAL POINTS (base + bonus)
  let currentTier: typeof TIERS[number] | null = null
  for (const t of TIERS) {
    if (totalPointsWithBonus >= t.minPoints) {
      currentTier = t
    }
  }

  // Calculate gap to next milestone
  let nextMilestoneNeeds: { label: string; neededGames: number; neededBadges: number } | null = null
  const unreachedMilestone = MILESTONES.find(m => validGames.length < m.games || totalSkillBadgesCount < m.badges)
  if (unreachedMilestone) {
    nextMilestoneNeeds = {
      label: unreachedMilestone.label,
      neededGames: Math.max(0, unreachedMilestone.games - validGames.length),
      neededBadges: Math.max(0, unreachedMilestone.badges - totalSkillBadgesCount)
    }
  }

  return {
    profileName,
    profileUrl,
    totalRawBadges: extractedBadges.length,
    validGames,
    validSyllabusBadges,
    validExtraBadges,
    excludedItems,
    unknownDateCount,
    pointsFromGames,
    pointsFromSkillBadges,
    totalArcadePoints,
    highestMilestone,
    milestoneBonus,
    hasGearBonus,
    gearBonus,
    totalPointsWithBonus,
    currentTier,
    nextMilestoneNeeds
  }
}
