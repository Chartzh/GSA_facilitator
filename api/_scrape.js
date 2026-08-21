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

const PROGRAM_START = Date.UTC(2026, 6, 12, 17, 0, 0)
const PROGRAM_END   = Date.UTC(2026, 8, 14, 16, 59, 59)

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
  const t = parsedDate.getTime()
  if (isNaN(t)) return true
  return t >= PROGRAM_START && t <= PROGRAM_END
}

export function cleanBadgeText(rawText) {
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

export const CATALOG_93_BADGES = [
  "Create Your First Gemini Enterprise Application",
  "Develop AI-Powered Prototypes in Google AI Studio",
  "The Basics of Google Cloud Compute",
  "Implement Event-Driven Messaging and Automation Workflows",
  "Implement Cloud Storage and Data Protection Solutions",
  "Create a Streaming Data Lake on Cloud Storage",
  "Deploy and Manage Applications on Google App Engine",
  "Implement Speech and Language Solutions with Pre-trained APIs",
  "Using the Google Cloud Speech API",
  "Analyze Speech and Language with Google APIs",
  "Store, Process, and Manage Data on Google Cloud - Console",
  "Store, Process, and Manage Data on Google Cloud - Command Line",
  "Migrate MySQL Data to Cloud SQL Using Database Migration Service",
  "Get Started with Sensitive Data Protection",
  "Analyze Images with the Cloud Vision API",
  "Build Event-Driven Applications with Eventarc",
  "Configure Service Accounts and IAM Roles for Google Cloud",
  "Get Started with App Development using Gemini Code Assist",
  "Implement Cloud Security Fundamentals in Google Cloud",
  "Engineer AI Agents with Agent Development Kit (ADK)",
  "Build Useful AI Applications with Gemini and Imagen",
  "Build a Smart Cloud Application with Vibe Coding and MCP",
  "Implement Cloud Collaboration and Productivity Workflows",
  "Analyze BigQuery Data in Connected Sheets",
  "Streaming Analytics into BigQuery",
  "Create a Secure Data Lake on Cloud Storage",
  "Secure Lakehouse Data",
  "Enrich Metadata and Discovery of Lakehouse Data",
  "Monitor and Manage Google Cloud Resources",
  "Monitor and Log with Google Cloud Observability",
  "Set Up a Google Cloud Network",
  "Integrate BigQuery Data and Google Workspace using Apps Script",
  "Engineer Data for Predictive Modeling with BigQuery ML",
  "Implement DevOps Workflows in Google Cloud",
  "Create ML Models with BigQuery ML",
  "Build a Website on Google Cloud",
  "Manage Kubernetes in Google Cloud",
  "Share Data Using Google Data Cloud",
  "Use Machine Learning APIs on Google Cloud",
  "Monitor Environments with Google Cloud Managed Service for Prometheus",
  "Organize and Manage Data with Dataplex",
  "Analyze Sentiment with Natural Language API",
  "Develop with Apps Script and AppSheet",
  "Use APIs to Manage Cloud Storage",
  "Monitoring in Google Cloud",
  "Orchestrate Multi-agent Workflows with Gemini Enterprise",
  "Connect Cloud Networks with NCC",
  "Privileged Access with IAM",
  "Enhance Gemini Model Capabilities",
  "Analyze and Reason on Multimodal Data with Gemini",
  "Implement Multimodal Vector Search with BigQuery",
  "Protect Cloud Traffic with Chrome Enterprise Premium Security",
  "Discover and Protect Sensitive Data Across Your Ecosystem",
  "Secure Software Delivery",
  "Create and Manage AlloyDB Instances",
  "Create and Manage Cloud SQL for PostgreSQL Instances",
  "Deploy and Manage Apigee X",
  "Develop Serverless Apps on Cloud Run",
  "Build a Data Warehouse with BigQuery",
  "Prepare Data for ML APIs on Google Cloud",
  "Build Serverless Applications with Cloud Run Functions",
  "Get Started with API Gateway",
  "App Building with AppSheet",
  "Build Google Cloud Infrastructure for AWS Professionals",
  "Create and Manage Bigtable Instances",
  "Implement CI/CD Pipelines in Google Cloud",
  "Using Functions, Formulas, and Charts in Google Sheets",
  "Create and Manage Cloud Spanner Instances",
  "Build Infrastructure with Terraform in Google Cloud",
  "Perform Predictive Data Analysis in BigQuery",
  "Automate Data Capture at Scale with Document AI",
  "Develop and Secure APIs with Apigee X",
  "Explore Generative AI in Agent Platform",
  "Implementing Cloud Load Balancing for Compute Engine",
  "Prompt Design in Agent Platform",
  "Inspect Rich Documents with Gemini Multimodality and Multimodal RAG",
  "Develop Gen AI Apps with Gemini and Streamlit",
  "Set Up an App Dev Environment on Google Cloud",
  "Develop Your Google Cloud Network",
  "Build a Secure Google Cloud Network",
  "Deploy Kubernetes Applications on Google Cloud",
  "Derive Insights from BigQuery Data",
  "Build LookML Objects in Looker",
  "Manage Data Models in Looker",
  "Prepare Data for Looker Dashboards and Reports",
  "Develop Serverless Apps with Firebase",
  "Cloud Architecture: Design, Implement, and Manage",
  "Build Global and Regional Load Balancing Solutions",
  "Google DeepMind: Train A Small Language Model",
  "Mitigate Threats and Vulnerabilities with Security Command Center",
  "Build a Data Mesh with Knowledge Catalog",
  "Deploy Multi-Agent Architectures",
  "Optimize Costs for Google Kubernetes Engine"
];

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

    // Match Game by custom match function or title substring
    let matchedGame = ARCADE_GAMES.find(g => (g.match && g.match(normTitle)) || normalizeTitle(g.name) === normTitle || normTitle.includes(normalizeTitle(g.name)))
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

  // Unified catalog matching engine matching LabChecklist.tsx exactly
  const normNoSpace = (s) => (s || '').toLowerCase().trim().replace(/[^a-z0-9]/g, '')
  const allEarnedMap = new Map()
  validSyllabusBadges.forEach(b => allEarnedMap.set(normNoSpace(b.name), b.earnedDate || 'Selesai'))
  validExtraBadges.forEach(b => allEarnedMap.set(normNoSpace(b.name), b.earnedDate || 'Selesai'))
  rawBadges.forEach(b => allEarnedMap.set(normNoSpace(b.title), b.earnedDateRaw || 'Selesai'))

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

  // Count unique catalog badges matched from CATALOG_SKILL_BADGES
  let matchedCatalogCount = 0
  if (Array.isArray(EXTRA_BADGES_ALLOWED)) {
    const catalog93 = CATALOG_93_BADGES
    const matchedSet = new Set()
    catalog93.forEach(catName => {
      const cNorm = normNoSpace(catName)
      let found = allEarnedMap.has(cNorm)
      if (!found) {
        for (const [key] of allEarnedMap.entries()) {
          if (key.includes(cNorm) || cNorm.includes(key) || (cNorm.length > 12 && key.slice(0, 15) === cNorm.slice(0, 15))) {
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
              if (key.includes(alNorm) || alNorm.includes(key) || (alNorm.length > 12 && key.slice(0, 15) === alNorm.slice(0, 15))) {
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

  const totalBadgesCount = Math.min(93, matchedCatalogCount > 0 ? matchedCatalogCount : (uniqueSyllabusBadges.length + uniqueExtraBadges.length))

  const baseP = calcBasePoints(uniqueGames.length, totalBadgesCount)
  const milestone = calcCurrentMilestone(uniqueGames.length, totalBadgesCount)
  const milestoneBonusP = calcMilestoneBonus(uniqueGames.length, totalBadgesCount)
  const totalPointsWithBonus = baseP + milestoneBonusP

  const currentTier = TIERS.slice().reverse().find(t => totalPointsWithBonus >= t.minPoints) || null
  const nextTier = TIERS.find(t => t.minPoints > totalPointsWithBonus) || null

  let nextMilestoneNeeds = null
  if (milestone?.key !== 'ULTIMATE') {
    const nextM = MILESTONES[MILESTONES.findIndex(m => m.key === milestone?.key) + 1] || MILESTONES[0]
    nextMilestoneNeeds = {
      label: nextM.label,
      neededGames: Math.max(0, nextM.games - uniqueGames.length),
      neededBadges: Math.max(0, nextM.badges - totalBadgesCount)
    }
  }

  return {
    profileUrl,
    profileName,
    validGames: uniqueGames,
    validSyllabusBadges: uniqueSyllabusBadges,
    validExtraBadges: uniqueExtraBadges,
    totalSkillBadgesCount: totalBadgesCount,
    excludedItems,
    pointsFromGames: uniqueGames.length * POINTS.perGame,
    pointsFromSkillBadges: totalBadgesCount / POINTS.skillBadgesPerPoint,
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
