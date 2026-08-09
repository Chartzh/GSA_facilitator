import * as cheerio from 'cheerio'
import {
  PROGRAM,
  POINTS,
  MILESTONES,
  TIERS,
  ARCADE_GAMES,
  SKILL_BADGES,
  EXTRA_BADGES_ALLOWED,
  EXTRA_BADGES_MAX,
  ArcadeGame,
  SkillBadge
} from '../config/program'

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

// Regex matching
const RE_COURSE_TEMPLATE = /course_templates\/(\d+)/
const RE_GAME = /games\/(\d+)/

export interface RawExtractedBadge {
  title: string
  href: string
  courseId: number | null
  gameId: number | null
  earnedDateRaw: string
  parsedDate: Date | null
  dateUnknown: boolean
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
    if (!isNaN(d.getTime())) return { date: d, unknown: false }
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
    if (!isNaN(d.getTime())) return { date: d, unknown: false }
  }

  return { date: null, unknown: true }
}

export interface ParsedProfileResult {
  profileName: string
  profileUrl: string
  totalRawBadges: number
  validGames: (ArcadeGame & { earnedDate: string; dateUnknown: boolean })[]
  validSyllabusBadges: (SkillBadge & { earnedDate: string; dateUnknown: boolean; matchMethod: 'id' | 'title' })[]
  validExtraBadges: { id: number | null; name: string; earnedDate: string; dateUnknown: boolean }[]
  excludedItems: { title: string; dateStr: string; reason: string }[]
  unknownDateCount: number
  pointsFromGames: number
  pointsFromSkillBadges: number
  totalArcadePoints: number
  highestMilestone: typeof MILESTONES[number] | null
  milestoneBonus: number
  totalPointsWithBonus: number
  currentTier: typeof TIERS[number] | null
  nextMilestoneNeeds: { label: string; neededGames: number; neededBadges: number } | null
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

      const elements = doc.querySelectorAll('.profile-badge, [class*="badge-card"], [class*="BadgeCard"], .quest-card')
      elements.forEach((card) => {
        const linkEl = card.querySelector('a[href*="course_templates"], a[href*="games"]')
        const href = linkEl?.getAttribute('href') || card.getAttribute('href') || ''
        const title = card.querySelector('.ql-title-medium, [class*="title"], h3, h4')?.textContent?.trim() || card.getAttribute('aria-label') || ''
        const dateStr = card.querySelector('time, .ql-body-medium, [class*="date"], [class*="earned"]')?.textContent?.trim() || ''

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
              dateUnknown: parsed.unknown
            })
          }
        }
      })
    } catch {
      // Ignore DOMParser error & fallback to cheerio
    }
  }

  // Fallback to Cheerio (Node serverless environment or if DOMParser returned empty)
  if (extractedBadges.length === 0) {
    const $ = cheerio.load(html)
    profileName = $('h1.ql-display-small, h1').first().text().trim() || profileName

    $('.profile-badge, [class*="badge-card"], [class*="BadgeCard"], .quest-card').each((_, el) => {
      const card = $(el)
      const linkEl = card.find('a[href*="course_templates"], a[href*="games"]').first()
      const href = linkEl.attr('href') || card.attr('href') || ''
      const title = card.find('.ql-title-medium, [class*="title"], h3, h4').first().text().trim() || card.attr('aria-label') || ''
      const dateStr = card.find('time, .ql-body-medium, [class*="date"], [class*="earned"]').first().text().trim() || card.find('time').attr('datetime') || ''

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
            dateUnknown: parsed.unknown
          })
        }
      }
    })

    if (extractedBadges.length === 0) {
      $('a[href*="course_templates"], a[href*="games"]').each((_, el) => {
        const link = $(el)
        const href = link.attr('href') || ''
        const title = link.text().trim() || link.attr('aria-label') || ''
        const parentText = link.parent().text().trim()
        const courseMatch = RE_COURSE_TEMPLATE.exec(href)
        const gameMatch = RE_GAME.exec(href)
        const parsed = parseEarnedDate(parentText)

        const key = `${href}-${title}`
        if (title && !seenHrefs.has(key)) {
          seenHrefs.add(key)
          extractedBadges.push({
            title,
            href,
            courseId: courseMatch ? parseInt(courseMatch[1], 10) : null,
            gameId: gameMatch ? parseInt(gameMatch[1], 10) : null,
            earnedDateRaw: parentText,
            parsedDate: parsed.date,
            dateUnknown: parsed.unknown
          })
        }
      })
    }
  }

  const pStartDate = new Date(PROGRAM.startDate)
  const pEndDate = new Date(PROGRAM.endDate)

  const validGames: (ArcadeGame & { earnedDate: string; dateUnknown: boolean })[] = []
  const validSyllabusBadges: (SkillBadge & { earnedDate: string; dateUnknown: boolean; matchMethod: 'id' | 'title' })[] = []
  const validExtraBadges: { id: number | null; name: string; earnedDate: string; dateUnknown: boolean }[] = []
  const excludedItems: { title: string; dateStr: string; reason: string }[] = []

  let unknownDateCount = 0
  const matchedSkillIds = new Set<number>()
  const matchedGameIds = new Set<number>()

  for (const raw of extractedBadges) {
    // ATURAN #2: Date Filtering
    if (!raw.dateUnknown && raw.parsedDate) {
      if (raw.parsedDate < pStartDate) {
        excludedItems.push({
          title: raw.title,
          dateStr: raw.earnedDateRaw || 'Sebelum 13 Juli 2026',
          reason: 'Diperoleh sebelum 13 Juli 2026 (di luar periode program)'
        })
        continue
      }
      if (raw.parsedDate > pEndDate) {
        excludedItems.push({
          title: raw.title,
          dateStr: raw.earnedDateRaw || 'Setelah 14 Sep 2026',
          reason: 'Diperoleh setelah 14 September 2026 (di luar periode program)'
        })
        continue
      }
    } else {
      unknownDateCount++
    }

    // Match Arcade Games
    if (raw.gameId) {
      const officialGame = ARCADE_GAMES.find(g => g.id === raw.gameId)
      if (officialGame && !matchedGameIds.has(officialGame.id)) {
        matchedGameIds.add(officialGame.id)
        validGames.push({ ...officialGame, earnedDate: raw.earnedDateRaw, dateUnknown: raw.dateUnknown })
        continue
      } else if (!officialGame) {
        excludedItems.push({
          title: raw.title,
          dateStr: raw.earnedDateRaw,
          reason: 'Game di luar silabus program 2026'
        })
        continue
      }
    }

    // Match Skill Badges by ID
    if (raw.courseId) {
      const syllabusBadge = SKILL_BADGES.find(b => b.id === raw.courseId)
      if (syllabusBadge && !matchedSkillIds.has(syllabusBadge.id)) {
        matchedSkillIds.add(syllabusBadge.id)
        validSyllabusBadges.push({
          ...syllabusBadge,
          earnedDate: raw.earnedDateRaw,
          dateUnknown: raw.dateUnknown,
          matchMethod: 'id'
        })
        continue
      }
    }

    // Fallback: Match by normalized title if ID missing
    const normTitle = normalizeTitle(raw.title)
    const titleMatchedBadge = SKILL_BADGES.find(b => normalizeTitle(b.name) === normTitle)
    if (titleMatchedBadge && !matchedSkillIds.has(titleMatchedBadge.id)) {
      matchedSkillIds.add(titleMatchedBadge.id)
      validSyllabusBadges.push({
        ...titleMatchedBadge,
        earnedDate: raw.earnedDateRaw,
        dateUnknown: raw.dateUnknown,
        matchMethod: 'title'
      })
      continue
    }

    // Extra Badges (catalog badges outside syllabus)
    if (EXTRA_BADGES_ALLOWED && validExtraBadges.length < EXTRA_BADGES_MAX) {
      validExtraBadges.push({
        id: raw.courseId,
        name: raw.title,
        earnedDate: raw.earnedDateRaw,
        dateUnknown: raw.dateUnknown
      })
    } else if (!titleMatchedBadge && !raw.courseId) {
      excludedItems.push({
        title: raw.title,
        dateStr: raw.earnedDateRaw,
        reason: 'Badge di luar silabus program'
      })
    }
  }

  // ATURAN #4: Rumus Poin & Milestones
  const pointsFromGames = validGames.length * POINTS.perGame
  const totalSkillBadgesCount = validSyllabusBadges.length + validExtraBadges.length
  const pointsFromSkillBadges = Math.floor(totalSkillBadgesCount / POINTS.skillBadgesPerPoint)

  const totalArcadePoints = pointsFromGames + pointsFromSkillBadges

  // Highest achieved milestone (non-cumulative)
  let highestMilestone: typeof MILESTONES[number] | null = null
  for (const m of MILESTONES) {
    if (validGames.length >= m.games && totalSkillBadgesCount >= m.badges) {
      highestMilestone = m
    }
  }

  const milestoneBonus = highestMilestone ? highestMilestone.bonus : 0
  const totalPointsWithBonus = totalArcadePoints + milestoneBonus

  // Current Tier
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
    totalPointsWithBonus,
    currentTier,
    nextMilestoneNeeds
  }
}
