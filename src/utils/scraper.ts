import * as cheerio from 'cheerio'
import {
  PROGRAM,
  POINTS,
  MILESTONES,
  TIERS,
  ARCADE_GAMES,
  SKILL_BADGES,
  GEAR_BADGES,
  BONUS_MILESTONE_POINTS,
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

// Helper to match Arcade Games by ID or Title/Keywords (with matchedGameIds check for disambiguation)
export function findArcadeGameMatch(raw: RawExtractedBadge, matchedGameIds?: Set<number>): ArcadeGame | null {
  if (raw.gameId) {
    const gameById = ARCADE_GAMES.find(g => g.id === raw.gameId)
    if (gameById) return gameById
  }

  const norm = normalizeTitle(raw.title)
  const isJuly = norm.includes('july') || norm.includes('juli') || raw.earnedDateRaw.toLowerCase().includes('jul')
  const isAugust = norm.includes('august') || norm.includes('agustus') || raw.earnedDateRaw.toLowerCase().includes('aug')

  // Specific game titles (Juli)
  if (norm.includes('safe space') || norm.includes('safe spaces')) {
    return ARCADE_GAMES.find(g => g.id === 7318) || null
  }

  if (norm.includes('data mesh') || norm.includes('datamesh')) {
    return ARCADE_GAMES.find(g => g.id === 7317) || null
  }

  // Base Camp
  if (norm.includes('base camp') || norm.includes('basecamp')) {
    if (isJuly) return ARCADE_GAMES.find(g => g.id === 7313) || null
    if (isAugust) return ARCADE_GAMES.find(g => g.id === 7394) || null
    return isAugust ? ARCADE_GAMES.find(g => g.id === 7394)! : ARCADE_GAMES.find(g => g.id === 7313)!
  }

  // Adventure / Level 1 (August: Level 1: Data Management & Analytics / 1q-datamgt-92372)
  if (norm.includes('adventure') || norm.includes('level 1') || norm.includes('level1') || norm.includes('data management') || norm.includes('datamgt') || norm.includes('lowcode')) {
    if (isJuly || norm.includes('lowcode')) return ARCADE_GAMES.find(g => g.id === 7314) || null
    return ARCADE_GAMES.find(g => g.id === 7395) || null
  }

  // Trail / Level 2 (August: Level 2: Delivery & Operations / 1q-delivery-31058)
  if (norm.includes('trail') || norm.includes('level 2') || norm.includes('level2') || norm.includes('delivery') || norm.includes('workspace')) {
    if (isJuly || norm.includes('workspace')) return ARCADE_GAMES.find(g => g.id === 7316) || null
    return ARCADE_GAMES.find(g => g.id === 7396) || null
  }

  // Simulator / Level 3 (August: Level 3: Networking & Security / 1q-network-51470)
  if (norm.includes('level 3') || norm.includes('level3') || norm.includes('networking') || norm.includes('network')) {
    return ARCADE_GAMES.find(g => g.id === 7397) || null
  }

  if (norm.includes('simulator')) {
    if (isJuly || norm.includes('data mesh')) return ARCADE_GAMES.find(g => g.id === 7317) || null
    return ARCADE_GAMES.find(g => g.id === 7397) || null
  }

  // Voyage / Trivia 1 (August: Trivia: Google Sheets / 1q-sheets-29185)
  if (norm.includes('voyage') || norm.includes('google sheets') || norm.includes('sheets') || norm.includes('bucket')) {
    if (isJuly || norm.includes('bucket')) return ARCADE_GAMES.find(g => g.id === 7315) || null
    return ARCADE_GAMES.find(g => g.id === 7398) || null
  }

  // Disambiguate August Trivia 1 (7398) vs Trivia 2 / Special Game (7399)
  if (norm.includes('special game') || norm.includes('schema') || norm.includes('database schema') || norm.includes('trivia')) {
    if (matchedGameIds) {
      if (!matchedGameIds.has(7398) && norm.includes('sheets')) return ARCADE_GAMES.find(g => g.id === 7398) || null
      if (!matchedGameIds.has(7399)) return ARCADE_GAMES.find(g => g.id === 7399) || null
      if (!matchedGameIds.has(7398)) return ARCADE_GAMES.find(g => g.id === 7398) || null
    }
    return ARCADE_GAMES.find(g => g.id === 7399) || null
  }

  // Fallback Catch-All for generic Arcade game titles (arcade, game, level, trivia, sprint, challenge, etc.)
  if (
    norm.includes('arcade') ||
    norm.includes('game') ||
    norm.includes('level') ||
    norm.includes('trivia') ||
    norm.includes('sprint') ||
    norm.includes('challenge') ||
    norm.includes('zone') ||
    norm.includes('completion') ||
    norm.includes('certification')
  ) {
    if (matchedGameIds) {
      const openGame = ARCADE_GAMES.find(g => !matchedGameIds.has(g.id))
      if (openGame) return openGame
    }
  }

  return null
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
  hasGearBonus: boolean
  gearBonus: number
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

      const elements = doc.querySelectorAll('.profile-badge, .public-profile-badge, [class*="badge-card"], [class*="BadgeCard"], .quest-card, [data-badge-id]')
      elements.forEach((card) => {
        const linkEl = card.querySelector('a[href*="course_templates"], a[href*="games"], a[href*="quests"], a[href*="badges"]')
        const href = linkEl?.getAttribute('href') || card.getAttribute('href') || ''
        const title = card.querySelector('.ql-title-medium, [class*="title"], h3, h4, span')?.textContent?.trim() || card.getAttribute('aria-label') || card.getAttribute('title') || ''
        const dateStr = card.querySelector('time, .ql-body-medium, [class*="date"], [class*="earned"], [class*="description"]')?.textContent?.trim() || ''

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
      // Fallback to Cheerio if DOMParser fails
    }
  }

  // Fallback to Cheerio (Node serverless environment or if DOMParser returned empty)
  if (extractedBadges.length === 0) {
    const $ = cheerio.load(html)
    profileName = $('h1.ql-display-small, h1').first().text().trim() || profileName

    $('.profile-badge, .public-profile-badge, [class*="badge-card"], [class*="BadgeCard"], .quest-card, [data-badge-id]').each((_, el) => {
      const card = $(el)
      const linkEl = card.find('a[href*="course_templates"], a[href*="games"], a[href*="quests"], a[href*="badges"]').first()
      const href = linkEl.attr('href') || card.attr('href') || ''
      const title = card.find('.ql-title-medium, [class*="title"], h3, h4, span').first().text().trim() || card.attr('aria-label') || card.attr('title') || ''
      const dateStr = card.find('time, .ql-body-medium, [class*="date"], [class*="earned"], [class*="description"]').first().text().trim() || card.find('time').attr('datetime') || ''

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
      $('a[href*="course_templates"], a[href*="games"], a[href*="quests"], a[href*="badges"]').each((_, el) => {
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

  const pStartDate = new Date(PROGRAM.startDate) // 2026-07-13T00:00:00+07:00
  pStartDate.setHours(0, 0, 0, 0)
  const pEndDate = new Date(PROGRAM.endDate)

  const validGames: (ArcadeGame & { earnedDate: string; dateUnknown: boolean })[] = []
  const validSyllabusBadges: (SkillBadge & { earnedDate: string; dateUnknown: boolean; matchMethod: 'id' | 'title' })[] = []
  const validExtraBadges: { id: number | null; name: string; earnedDate: string; dateUnknown: boolean }[] = []
  const excludedItems: { title: string; dateStr: string; reason: string }[] = []

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

    // 1. Check Arcade Game Match (ID or Title/Keywords)
    const arcadeGame = findArcadeGameMatch(raw, matchedGameIds)
    if (arcadeGame) {
      if (!matchedGameIds.has(arcadeGame.id)) {
        matchedGameIds.add(arcadeGame.id)
        validGames.push({ ...arcadeGame, earnedDate: raw.earnedDateRaw, dateUnknown: raw.dateUnknown })
      }
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
          matchMethod: 'id'
        })
        continue
      }
    }

    // 3. Match Skill Badges by Title
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

    // 4. All Other Skill Badges earned during the program (Included as Extra Skill Badges)
    validExtraBadges.push({
      id: raw.courseId,
      name: raw.title,
      earnedDate: raw.earnedDateRaw,
      dateUnknown: raw.dateUnknown
    })
  }

  // ATURAN #4: Rumus Poin & Milestones
  const pointsFromGames = validGames.length * POINTS.perGame
  const totalSkillBadgesCount = validSyllabusBadges.length + validExtraBadges.length
  const pointsFromSkillBadges = totalSkillBadgesCount * 0.5

  const totalArcadePoints = pointsFromGames + pointsFromSkillBadges

  // Highest achieved milestone (non-cumulative)
  let highestMilestone: typeof MILESTONES[number] | null = null
  for (const m of MILESTONES) {
    if (validGames.length >= m.games && totalSkillBadgesCount >= m.badges) {
      highestMilestone = m
    }
  }

  const milestoneBonus = highestMilestone ? highestMilestone.bonus : 0

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
    hasGearBonus,
    gearBonus,
    totalPointsWithBonus,
    currentTier,
    nextMilestoneNeeds
  }
}
