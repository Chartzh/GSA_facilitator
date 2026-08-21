import React, { useState, useMemo } from 'react'
import { SKILL_BADGES, ARCADE_GAMES, TOTALS, SkillBadge, ArcadeGame } from '../config/program'
import { ParsedProfileResult } from '../utils/scraper'
import { CATALOG_SKILL_BADGES, JULY_ARCADE_GAMES, AUGUST_ARCADE_GAMES } from '../config/catalogData'
import { Gamepad2, Award, Zap, Copy, Check, ExternalLink, Download, Clock, ShieldCheck, History, Play, X, Code, FileText } from 'lucide-react'

interface LabChecklistProps {
  scrapedData: ParsedProfileResult | null
}

const ADUAN_FORM_URL = 'https://forms.gle/a1Bi7qs5QfZAnvVEA'

export default function LabChecklist({ scrapedData }: LabChecklistProps) {
  const [activeSubTab, setActiveSubTab] = useState<'arcade_track' | 'skill_badge_track' | 'track_badge'>('arcade_track')
  const [statusFilter, setStatusFilter] = useState<'all' | 'done' | 'pending'>('all')
  const [tierFilter, setTierFilter] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all')
  const [onlyFasttrack, setOnlyFasttrack] = useState(false)
  const [sortBy, setSortBy] = useState<'default' | 'labs_asc' | 'credits_asc'>('default')
  const [searchQuery, setSearchQuery] = useState('')
  const [assetFilter, setAssetFilter] = useState<'current' | 'all' | 'historical'>('current')
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  // YouTube Solution Modal Player State
  const [activeVideoModal, setActiveVideoModal] = useState<{
    title: string
    videoUrl: string
    subLabs?: { name: string; videoUrl?: string; scriptFile?: string; lang?: string; note?: string }[]
  } | null>(null)
  const [activeSubLabIndex, setActiveSubLabIndex] = useState(0)

  const handleOpenVideoModal = (title: string, videoUrl: string, subLabs?: any[]) => {
    setActiveVideoModal({ title, videoUrl, subLabs })
    setActiveSubLabIndex(0)
  }

  // Arcade Game Modal State
  const [activeGameModal, setActiveGameModal] = useState<{
    name: string
    accessCode: string
    url: string
    labs: { name: string; videoUrl?: string; note?: string; claimUrl?: string; isClaimBadge?: boolean }[]
  } | null>(null)

  const handleOpenGameModal = (gameName: string, accessCode: string, gameUrl: string) => {
    const allCatalogGames = [...JULY_ARCADE_GAMES, ...AUGUST_ARCADE_GAMES]
    const normAccess = (accessCode || '').toLowerCase().trim()
    const normName = (gameName || '').toLowerCase().trim()

    let found = allCatalogGames.find(g => {
      const gCode = ((g as any).accessCode || (g as any).code || '').toLowerCase().trim()
      if (gCode && normAccess && gCode === normAccess) return true
      return false
    })

    if (!found) {
      found = allCatalogGames.find(g => {
        const gName = g.name.toLowerCase().trim()
        return gName === normName || normName.includes(gName) || gName.includes(normName) ||
          (normName.includes('adventure') && gName.includes('adventure')) ||
          (normName.includes('base camp') && gName.includes('base camp')) ||
          (normName.includes('voyage') && gName.includes('voyage')) ||
          (normName.includes('trail') && gName.includes('trail')) ||
          (normName.includes('simulator') && gName.includes('simulator'))
      })
    }

    const labs = found ? found.labs : []
    setActiveGameModal({
      name: gameName,
      accessCode,
      url: gameUrl,
      labs
    })
  }

  // Accordion state for Arcade Game months
  const [openMonths, setOpenMonths] = useState<Record<string, boolean>>({
    '2026-08': true,  // Agustus open by default
    '2026-07': false, // Juli collapsed by default
    '2026-09': false  // September collapsed by default
  })

  const toggleMonth = (monthKey: string) => {
    setOpenMonths(prev => ({ ...prev, [monthKey]: !prev[monthKey] }))
  }

  // Map completed badge IDs & game IDs from scrapedData
  const completedBadgeMap = useMemo(() => {
    const map = new Map<number, string>()
    if (scrapedData) {
      scrapedData.validSyllabusBadges.forEach(b => map.set(b.id, b.earnedDate || 'Selesai'))
    }
    return map
  }, [scrapedData])

  const completedGameMap = useMemo(() => {
    const map = new Map<number, string>()
    if (scrapedData) {
      scrapedData.validGames.forEach(g => map.set(g.id, g.earnedDate || 'Selesai'))
    }
    return map
  }, [scrapedData])

  const catalogVideoMap = useMemo(() => {
    const map = new Map<string, string>()
    CATALOG_SKILL_BADGES.forEach(badge => {
      const vUrl = badge.videoUrl || (badge.subLabs && badge.subLabs.length > 0 ? badge.subLabs[0].videoUrl : '')
      if (vUrl) {
        map.set(badge.name.toLowerCase().trim(), vUrl)
      }
    })
    const allGames = [...JULY_ARCADE_GAMES, ...AUGUST_ARCADE_GAMES]
    allGames.forEach(game => {
      if (game.labs) {
        game.labs.forEach(lab => {
          if (lab.videoUrl) {
            map.set(lab.name.toLowerCase().trim(), lab.videoUrl)
            map.set(game.name.toLowerCase().trim(), lab.videoUrl)
          }
        })
      }
    })
    return map
  }, [])

  const doneSyllabusCount = completedBadgeMap.size

  // Arcade Games grouped by Month
  const julyGames = useMemo(() => {
    return ARCADE_GAMES.filter(g => g.month === '2026-07').map(g => ({
      ...g,
      isDone: completedGameMap.has(g.id),
      earnedDate: completedGameMap.get(g.id) || null
    }))
  }, [completedGameMap])

  const augustGames = useMemo(() => {
    return ARCADE_GAMES.filter(g => g.month === '2026-08').map(g => ({
      ...g,
      isDone: completedGameMap.has(g.id),
      earnedDate: completedGameMap.get(g.id) || null
    }))
  }, [completedGameMap])

  const julyDoneCount = julyGames.filter(g => g.isDone).length
  const augustDoneCount = augustGames.filter(g => g.isDone).length

  // 93 Catalog Skill Badges list with exact participant earned status
  const catalogSkillBadgeList = useMemo(() => {
    const normalize = (t: string) => (t || '').toLowerCase().trim().replace(/[^a-z0-9]/g, '')
    
    // Map of earned badges from scrapedData
    const earnedMap = new Map<string, string>()
    if (scrapedData) {
      scrapedData.validSyllabusBadges.forEach(b => earnedMap.set(normalize(b.name), b.earnedDate || 'Selesai'))
      scrapedData.validExtraBadges.forEach(b => earnedMap.set(normalize(b.name), b.earnedDate || 'Selesai'))
    }

    const aliases = new Map<string, string[]>([
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

    const list = CATALOG_SKILL_BADGES.map((badge, idx) => {
      const normName = normalize(badge.name)
      let earnedDate = earnedMap.get(normName)

      if (!earnedDate) {
        for (const [key, val] of earnedMap.entries()) {
          if (key.includes(normName) || normName.includes(key) || (normName.length > 12 && key.slice(0, 15) === normName.slice(0, 15))) {
            earnedDate = val
            break
          }
        }
      }

      if (!earnedDate) {
        const catKey = badge.name.toLowerCase().trim()
        const aliasList = aliases.get(catKey) || []
        for (const al of aliasList) {
          const alNorm = normalize(al)
          earnedDate = earnedMap.get(alNorm)
          if (!earnedDate) {
            for (const [key, val] of earnedMap.entries()) {
              if (key.includes(alNorm) || alNorm.includes(key) || (alNorm.length > 12 && key.slice(0, 15) === alNorm.slice(0, 15))) {
                earnedDate = val
                break
              }
            }
          }
          if (earnedDate) break
        }
      }

      const tier = badge.level.toLowerCase().includes('intermediate')
        ? 'intermediate'
        : badge.level.toLowerCase().includes('advanced')
        ? 'advanced'
        : 'beginner'

      const labsCount = badge.subLabs && badge.subLabs.length > 0 ? badge.subLabs.length : 1

      return {
        ...badge,
        id: `catalog-${idx}`,
        tier,
        labsCount,
        isDone: Boolean(earnedDate),
        earnedDate: earnedDate || null
      }
    })

    let filtered = list

    if (tierFilter !== 'all') {
      filtered = filtered.filter(b => b.tier === tierFilter)
    }

    if (statusFilter === 'done') {
      filtered = filtered.filter(b => b.isDone)
    } else if (statusFilter === 'pending') {
      filtered = filtered.filter(b => !b.isDone)
    }

    if (onlyFasttrack) {
      filtered = filtered.filter(b => b.isFastTrack)
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      filtered = filtered.filter(b => b.name.toLowerCase().includes(q))
    }

    if (sortBy === 'labs_asc') {
      filtered = [...filtered].sort((a, b) => a.labsCount - b.labsCount)
    }

    return filtered
  }, [scrapedData, tierFilter, statusFilter, onlyFasttrack, searchQuery, sortBy])

  const doneCatalogCount = useMemo(() => {
    const normalize = (t: string) => (t || '').toLowerCase().trim().replace(/[^a-z0-9]/g, '')
    const earnedMap = new Set<string>()
    if (scrapedData) {
      scrapedData.validSyllabusBadges.forEach(b => earnedMap.add(normalize(b.name)))
      scrapedData.validExtraBadges.forEach(b => earnedMap.add(normalize(b.name)))
    }

    const aliases = new Map<string, string[]>([
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

    return CATALOG_SKILL_BADGES.filter(badge => {
      const normName = normalize(badge.name)
      if (earnedMap.has(normName)) return true
      for (const key of earnedMap) {
        if (key.includes(normName) || normName.includes(key) || (normName.length > 12 && key.slice(0, 15) === normName.slice(0, 15))) {
          return true
        }
      }
      const catKey = badge.name.toLowerCase().trim()
      const aliasList = aliases.get(catKey) || []
      for (const al of aliasList) {
        const alNorm = normalize(al)
        if (earnedMap.has(alNorm)) return true
        for (const key of earnedMap) {
          if (key.includes(alNorm) || alNorm.includes(key) || (alNorm.length > 12 && key.slice(0, 15) === alNorm.slice(0, 15))) {
            return true
          }
        }
      }
      return false
    }).length
  }, [scrapedData])

  // Collected Assets Data for "Track Badge" tab
  const currentAssets = useMemo(() => {
    if (!scrapedData) return []
    const list: { id: string; name: string; category: 'GAME' | 'SKILL'; points: number; earnedDate: string; valid: boolean; imageUrl?: string | null }[] = []

    scrapedData.validGames.forEach((g, idx) => {
      list.push({
        id: `game-${g.id}-${idx}`,
        name: g.name,
        category: 'GAME',
        points: 1.0,
        earnedDate: g.earnedDate || 'Agustus 2026',
        valid: true,
        imageUrl: g.imageUrl || null
      })
    })

    scrapedData.validSyllabusBadges.forEach((b, idx) => {
      list.push({
        id: `syllabus-${b.id}-${idx}`,
        name: b.name,
        category: 'SKILL',
        points: 0.5,
        earnedDate: b.earnedDate || 'Agustus 2026',
        valid: true,
        imageUrl: b.imageUrl || null
      })
    })

    scrapedData.validExtraBadges.forEach((ex, idx) => {
      list.push({
        id: `extra-${idx}`,
        name: ex.name,
        category: 'SKILL',
        points: 0.5,
        earnedDate: ex.earnedDate || 'Agustus 2026',
        valid: true,
        imageUrl: ex.imageUrl || null
      })
    })

    return list
  }, [scrapedData])

  const historicalAssets = useMemo(() => {
    if (!scrapedData) return []
    return scrapedData.excludedItems.map((item, idx) => ({
      id: `excluded-${idx}`,
      name: item.title,
      category: 'SKILL' as const,
      points: 0,
      earnedDate: item.dateStr || 'Lama',
      valid: false,
      reason: item.reason,
      imageUrl: item.imageUrl || null
    }))
  }, [scrapedData])

function parseDateForSort(dateStr: string): number {
  if (!dateStr || typeof dateStr !== 'string') return 0
  const clean = dateStr.trim()

  // Try parsing ISO Date
  const dIso = new Date(clean)
  if (!isNaN(dIso.getTime()) && clean.length >= 8) {
    return dIso.getTime()
  }

  // Month map for Indonesian & English
  const monthMap: Record<string, number> = {
    jan: 0, januari: 0, january: 0,
    feb: 1, februari: 1, february: 1,
    mar: 2, maret: 2, march: 2,
    apr: 3, april: 3,
    may: 4, mei: 4,
    jun: 5, juni: 5, june: 5,
    jul: 6, juli: 6, july: 6,
    aug: 7, agust: 7, agustus: 7, august: 7, agu: 7, ags: 7,
    sep: 8, september: 8, sept: 8,
    oct: 9, oktober: 9, october: 9, okt: 9,
    nov: 10, november: 10,
    dec: 11, des: 11, desember: 11, december: 11
  }

  // 1. Day Month Year regex e.g. "15 Juli 2026", "15 Jul 2026", "Earned 15 Aug 2026"
  const dmyMatch = /(\d{1,2})?\s*([A-Za-z]+)\s*,?\s*(\d{4})/i.exec(clean)
  if (dmyMatch) {
    const day = dmyMatch[1] ? parseInt(dmyMatch[1], 10) : 15
    const mStr = dmyMatch[2].toLowerCase()
    const year = parseInt(dmyMatch[3], 10)
    const mIdx = monthMap[mStr] ?? monthMap[mStr.slice(0, 3)]
    if (mIdx !== undefined) {
      return new Date(year, mIdx, day).getTime()
    }
  }

  // 2. Month Day Year regex e.g. "Jul 15, 2026", "Agustus 2026"
  const mdyMatch = /([A-Za-z]+)\s*(\d{1,2})?,?\s*(\d{4})/i.exec(clean)
  if (mdyMatch) {
    const mStr = mdyMatch[1].toLowerCase()
    const day = mdyMatch[2] ? parseInt(mdyMatch[2], 10) : 15
    const year = parseInt(mdyMatch[3], 10)
    const mIdx = monthMap[mStr] ?? monthMap[mStr.slice(0, 3)]
    if (mIdx !== undefined) {
      return new Date(year, mIdx, day).getTime()
    }
  }

  return 0
}

  const allAssets = useMemo(() => {
    return [...currentAssets, ...historicalAssets]
  }, [currentAssets, historicalAssets])

  const displayedAssets = useMemo(() => {
    let list = []
    if (assetFilter === 'current') list = [...currentAssets]
    else if (assetFilter === 'historical') list = [...historicalAssets]
    else list = [...allAssets]

    return [...list].sort((a, b) => {
      const timeA = parseDateForSort(a.earnedDate)
      const timeB = parseDateForSort(b.earnedDate)
      if (timeA !== timeB) {
        return timeB - timeA // Descending: newest date at top
      }
      return 0
    })
  }, [assetFilter, currentAssets, historicalAssets, allAssets])

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2500)
  }

  const downloadChecklistTxt = () => {
    let content = `============================================================\n`
    content += `CHECKLIST PROGRES GOOGLE SKILLS ARCADE FACILITATOR 2026\n`
    content += `Fasilitator: Muhammad Rajif Raditya (GCAF26-ID-UAQ-MFC)\n`
    content += `Terakhir di-generate: ${new Date().toLocaleString('id-ID')}\n`
    content += `============================================================\n\n`
    content += `RINGKASAN PROGRES BADGE:\n`
    content += `- Skill Badges Silabus: ${doneSyllabusCount} / ${TOTALS.skillBadges} Selesai\n`
    content += `- Arcade Games Selesai: ${completedGameMap.size} / ${TOTALS.gamesAvailable} Selesai\n\n`

    content += `============================================================\n`
    content += `ARCADE GAME (12 GAMES)\n`
    content += `============================================================\n\n`

    ARCADE_GAMES.forEach((g) => {
      const isDone = completedGameMap.has(g.id)
      const isClosed = g.month < '2026-08'
      const status = isDone ? `[X] SELESAI (${completedGameMap.get(g.id)})` : isClosed ? `[LOCKED] TUTUP` : `[ ] BELUM`
      content += `- ${status} - ${g.name} (${g.month}) | URL: ${g.url}\n`
    })

    content += `\n============================================================\n`
    content += `SKILL BADGE (51 BADGES)\n`
    content += `============================================================\n\n`

    SKILL_BADGES.forEach((b) => {
      const isDone = completedBadgeMap.has(b.id)
      const status = isDone ? `[X] SELESAI (${completedBadgeMap.get(b.id)})` : `[ ] BELUM`
      content += `- ${status} - ${b.name} (${b.tier.toUpperCase()}) | ${b.labs} Lab | ${b.credits} Credits\n`
      content += `   URL: ${b.url}\n`
    })

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `Checklist-Arcade-2026-${new Date().toISOString().slice(0, 10)}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div style={{ marginTop: '28px' }}>

      {/* Sub-tabs Navigation */}
      <div 
        style={{ 
          display: 'flex', 
          gap: '8px', 
          marginBottom: '24px', 
          flexWrap: 'wrap', 
          background: 'var(--bg-card)', 
          border: '1px solid var(--border)', 
          padding: '6px', 
          borderRadius: 'var(--radius)', 
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)' 
        }}
      >
        <button
          className={`btn-arcade ${activeSubTab === 'arcade_track' ? 'btn-arcade-primary' : 'btn-arcade-outline'}`}
          onClick={() => setActiveSubTab('arcade_track')}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 16px', fontSize: '0.85rem' }}
        >
          <Gamepad2 size={16} /> Arcade Track ({completedGameMap.size}/12)
        </button>

        <button
          className={`btn-arcade ${activeSubTab === 'skill_badge_track' ? 'btn-arcade-primary' : 'btn-arcade-outline'}`}
          onClick={() => setActiveSubTab('skill_badge_track')}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 16px', fontSize: '0.85rem' }}
        >
          <Award size={16} /> Skill Badge Track ({doneCatalogCount}/93)
        </button>

        <button
          className={`btn-arcade ${activeSubTab === 'track_badge' ? 'btn-arcade-primary' : 'btn-arcade-outline'}`}
          onClick={() => setActiveSubTab('track_badge')}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 16px', fontSize: '0.85rem' }}
        >
          <History size={16} /> Track Badge ({scrapedData ? scrapedData.validGames.length + ((scrapedData as any).totalSkillBadgesCount ?? Math.min(93, scrapedData.validSyllabusBadges.length + scrapedData.validExtraBadges.length)) : 0})
        </button>

        <button
          onClick={downloadChecklistTxt}
          className="btn-arcade btn-arcade-outline"
          style={{ marginLeft: 'auto', padding: '8px 16px', fontSize: '0.82rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
        >
          <Download size={14} /> Download TXT
        </button>
      </div>

      {/* ============================================================
          1. ARCADE TRACK (GAMES)
         ============================================================ */}
      {activeSubTab === 'arcade_track' && (
        <div className="bento-card col-span-12" style={{ marginBottom: '32px' }}>
          <div className="card-header-flex">
            <h3 className="card-title-arcade" style={{ color: 'var(--neon-yellow)' }}>
              <Gamepad2 size={20} /> ARCADE TRACK ({completedGameMap.size} / 12 GAME SELESAI)
            </h3>
            <span className="badge-tag badge-tag-warning">BOBOT: 1.0 PTS / GAME</span>
          </div>

          <p style={{ marginBottom: '18px', fontSize: '0.88rem' }}>
            Arcade Game dirilis bulanan. Game bulan lalu sudah ditutup untuk pengerjaan baru, tetapi <strong>game yang diselesaikan dalam periode program tetap dihitung poinnya</strong>.
          </p>

          {/* --- AGUSTUS --- */}
          <div style={{ marginBottom: '20px', border: '1px solid var(--neon-yellow)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
            <div
              onClick={() => toggleMonth('2026-08')}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 16px',
                background: 'rgba(255, 214, 0, 0.12)',
                cursor: 'pointer'
              }}
            >
              <strong style={{ fontSize: '0.95rem', color: 'var(--neon-yellow)' }}>
                {openMonths['2026-08'] ? '▾' : '▸'} Agustus 2026
              </strong>
              <span className="badge-tag badge-tag-done">
                {augustDoneCount} / {augustGames.length} Selesai — AKTIF
              </span>
            </div>

            {openMonths['2026-08'] && (
              <div className="arcade-table-wrapper" style={{ borderTop: '1px solid var(--border)' }}>
                <table className="arcade-table">
                  <thead>
                    <tr>
                      <th>STATUS</th>
                      <th>NAMA GAME</th>
                      <th>ACCESS CODE</th>
                      <th>AKSI / LINK</th>
                    </tr>
                  </thead>
                  <tbody>
                    {augustGames.map(game => (
                      <tr key={game.id} className={game.isDone ? 'row-active-highlight' : ''}>
                        <td>
                          {game.isDone ? (
                            <span className="badge-tag badge-tag-done">
                              ✓ SELESAI {game.earnedDate ? `(${game.earnedDate})` : ''}
                            </span>
                          ) : (
                            <span className="badge-tag badge-tag-warning">
                              AKTIF — BELUM
                            </span>
                          )}
                        </td>
                        <td style={{ fontWeight: 700 }}>{game.name}</td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <code style={{ background: 'var(--bg-base)', padding: '2px 6px', borderRadius: 'var(--radius)', color: 'var(--neon-yellow)' }}>
                              {game.accessCode}
                            </code>
                            <button
                              type="button"
                              onClick={() => copyCode(game.accessCode)}
                              style={{ background: 'none', border: 'none', color: 'var(--neon-cyan)', cursor: 'pointer', fontSize: '0.78rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                            >
                              {copiedCode === game.accessCode ? <Check size={14} /> : <Copy size={14} />}
                              {copiedCode === game.accessCode ? 'Copied' : 'Copy'}
                            </button>
                          </div>
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                            <button
                              onClick={() => handleOpenGameModal(game.name, game.accessCode, game.url)}
                              className="btn-arcade btn-arcade-primary"
                              style={{ padding: '6px 12px', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                            >
                              <Play size={12} /> Solusi & Detail Game
                            </button>
                            <a
                              href={game.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`btn-arcade ${game.isDone ? 'btn-arcade-outline' : 'btn-arcade-primary'}`}
                              style={{ padding: '6px 14px', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                            >
                              {game.isDone ? 'Buka Game' : 'Kerjakan Game'} <ExternalLink size={12} />
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* --- JULI --- */}
          <div style={{ marginBottom: '20px', border: '1px solid var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
            <div
              onClick={() => toggleMonth('2026-07')}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 16px',
                background: 'rgba(106, 106, 128, 0.15)',
                cursor: 'pointer'
              }}
            >
              <strong style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                {openMonths['2026-07'] ? '▾' : '▸'} Juli 2026 — {julyDoneCount}/{julyGames.length} Selesai
              </strong>
              <span className="badge-tag badge-tag-pending">
                SUDAH DITUTUP
              </span>
            </div>

            {openMonths['2026-07'] && (
              <div className="arcade-table-wrapper" style={{ borderTop: '1px solid var(--border)' }}>
                <table className="arcade-table">
                  <thead>
                    <tr>
                      <th>STATUS</th>
                      <th>NAMA GAME</th>
                      <th>KETERANGAN</th>
                    </tr>
                  </thead>
                  <tbody>
                    {julyGames.map(game => (
                      <tr key={game.id} className={game.isDone ? 'row-active-highlight' : ''}>
                        <td>
                          {game.isDone ? (
                            <span className="badge-tag badge-tag-done">
                              ✓ SELESAI ({game.earnedDate || 'Juli'}) — POIN DIHITUNG
                            </span>
                          ) : (
                            <span className="badge-tag badge-tag-pending">
                              DITUTUP
                            </span>
                          )}
                        </td>
                        <td style={{ color: game.isDone ? 'var(--text-primary)' : 'var(--text-muted)', fontWeight: game.isDone ? 700 : 400 }}>
                          {game.name}
                        </td>
                        <td>
                          {game.isDone ? (
                            <span style={{ color: 'var(--state-done)', fontSize: '0.8rem' }}>Poin telah ditambahkan ke total</span>
                          ) : (
                            <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', cursor: 'not-allowed' }}>Game Juli sudah tidak dapat dikerjakan</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* --- SEPTEMBER --- */}
          <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
            <div
              onClick={() => toggleMonth('2026-09')}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 16px',
                background: 'rgba(106, 106, 128, 0.1)',
                cursor: 'pointer'
              }}
            >
              <strong style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                {openMonths['2026-09'] ? '▾' : '▸'} September 2026
              </strong>
              <span className="badge-tag badge-tag-pending">
                BELUM DIRILIS
              </span>
            </div>

            {openMonths['2026-09'] && (
              <div style={{ padding: '20px', fontSize: '0.88rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                Game September belum dirilis. Akses akan dibuka saat masa pengerjaan September dimulai.
              </div>
            )}
          </div>
        </div>
      )}

      {/* ============================================================
          2. SKILL BADGE TRACK (93 KATALOG RESMI ARCADE 2026)
         ============================================================ */}
      {activeSubTab === 'skill_badge_track' && (
        <div className="bento-card col-span-12" style={{ marginBottom: '32px' }}>
          <div className="card-header-flex" style={{ flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h3 className="card-title-arcade" style={{ color: 'var(--neon-cyan)' }}>
                <Award size={20} /> SKILL BADGE TRACK ({doneCatalogCount} / 93 KATALOG SELESAI)
              </h3>
              <p style={{ marginTop: '4px', fontSize: '0.86rem' }}>
                Seluruh 93 Skill Badge resmi katalog Arcade 2026. Lengkap dengan indikator perolehan & solusi video YouTube per lab.
              </p>
            </div>

            <span className="badge-tag badge-tag-done">BOBOT: 0.5 PTS / BADGE (MAKS 93)</span>
          </div>

          {/* Filter Bar */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', margin: '20px 0' }}>
            <div className="input-arcade-group" style={{ flex: 1, minWidth: '220px' }}>
              <input
                type="text"
                className="input-arcade"
                placeholder="🔍 Cari nama skill badge / lab..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ padding: '6px 12px', fontSize: '0.82rem' }}
              />
            </div>

            <select
              className="input-arcade"
              style={{ padding: '6px 12px', fontSize: '0.82rem', width: 'auto' }}
              value={tierFilter}
              onChange={(e) => setTierFilter(e.target.value as any)}
            >
              <option value="all">Level: Semua Level</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>

            <select
              className="input-arcade"
              style={{ padding: '6px 12px', fontSize: '0.82rem', width: 'auto' }}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
            >
              <option value="all">Status: Semua</option>
              <option value="done">✓ Sudah Selesai</option>
              <option value="pending">○ Belum Selesai</option>
            </select>

            <button
              onClick={() => setOnlyFasttrack(!onlyFasttrack)}
              className={`btn-arcade ${onlyFasttrack ? 'btn-arcade-primary' : 'btn-arcade-outline'}`}
              style={{ padding: '6px 12px', fontSize: '0.82rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
            >
              <Zap size={14} /> {onlyFasttrack ? '⚡ FastTrack Aktif' : '⚡ Filter FastTrack'}
            </button>

            <select
              className="input-arcade"
              style={{ padding: '6px 12px', fontSize: '0.82rem', width: 'auto' }}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
            >
              <option value="default">Urutkan: Katalog Resmi</option>
              <option value="labs_asc">Lab Tercepat (Fastest) ⚡</option>
              <option value="credits_asc">Credit Paling Hemat 🪙</option>
            </select>
          </div>

          {/* 93 Catalog Skill Badges Grid */}
          <div className="bento-grid" style={{ gap: '16px' }}>
            {catalogSkillBadgeList.map(badge => (
              <div 
                key={badge.id} 
                className="bento-card col-span-6" 
                style={{ 
                  background: badge.isDone ? 'rgba(0, 255, 157, 0.05)' : 'var(--bg-base)', 
                  border: badge.isDone ? '1px solid var(--state-done)' : '1px solid var(--border)',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      <span className={`badge-tag ${badge.tier === 'beginner' ? 'badge-tag-done' : badge.tier === 'intermediate' ? 'badge-tag-warning' : 'badge-tag-excluded'}`}>
                        {badge.tier.toUpperCase()}
                      </span>
                      {badge.isFastTrack && (
                        <span className="badge-tag badge-tag-warning" style={{ background: 'rgba(255, 230, 0, 0.15)', color: 'var(--neon-yellow)' }}>
                          ⚡ FastTrack ({badge.labsCount} Lab)
                        </span>
                      )}
                    </div>

                    <span className={`badge-tag ${badge.isDone ? 'badge-tag-done' : 'badge-tag-pending'}`}>
                      {badge.isDone ? `✓ SELESAI ${badge.earnedDate ? `(${badge.earnedDate})` : ''}` : '○ BELUM'}
                    </span>
                  </div>

                  <h4 style={{ fontSize: '0.94rem', color: 'var(--text-primary)', marginBottom: '4px', lineHeight: 1.4, fontWeight: 700 }}>
                    {badge.name}
                  </h4>

                  {/* Sub-labs list with YouTube links */}
                  {badge.subLabs && badge.subLabs.length > 0 && (
                    <div style={{ marginTop: '10px', paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                      <span style={{ fontSize: '0.74rem', color: 'var(--neon-cyan)', fontWeight: 700, display: 'block', marginBottom: '6px' }}>
                        📋 DAFTAR SUB-LAB & SOLUSI:
                      </span>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {badge.subLabs.map((sub, sIdx) => (
                          <div key={sIdx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.76rem', background: 'rgba(0,0,0,0.3)', padding: '4px 8px', borderRadius: '4px' }}>
                            <span style={{ color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '70%' }}>
                              {sIdx + 1}. {sub.name}
                            </span>
                            {sub.videoUrl && (
                              <button
                                onClick={() => handleOpenVideoModal(badge.name, sub.videoUrl!, badge.subLabs)}
                                className="btn-arcade btn-arcade-primary"
                                style={{ padding: '2px 8px', fontSize: '0.7rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                              >
                                <Play size={10} /> YT
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer Action Buttons */}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'flex-end', paddingTop: '12px', marginTop: '12px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    {badge.videoUrl && (
                      <button
                        onClick={() => handleOpenVideoModal(badge.name, badge.videoUrl!, badge.subLabs)}
                        className="btn-arcade btn-arcade-primary"
                        style={{ padding: '4px 10px', fontSize: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                      >
                        <Play size={12} /> Solusi YT
                      </button>
                    )}

                    <a
                      href={badge.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`btn-arcade ${badge.isDone ? 'btn-arcade-outline' : 'btn-arcade-primary'}`}
                      style={{ padding: '4px 10px', fontSize: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                    >
                      {badge.isDone ? 'Buka Link' : 'Kerjakan'} <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================
          4. TRACK BADGE (COLLECTED ASSETS - FULL WIDTH 100%)
         ============================================================ */}
      {activeSubTab === 'track_badge' && (
        <div className="bento-card col-span-12" style={{ marginBottom: '32px' }}>
          <div className="card-header-flex" style={{ flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
            <div>
              <h3 className="card-title-arcade" style={{ color: 'var(--neon-cyan)', fontSize: '1rem' }}>
                <ShieldCheck size={18} /> COLLECTED ASSETS ({displayedAssets.length})
              </h3>
              <p style={{ marginTop: '2px', fontSize: '0.8rem' }}>
                Riwayat lencana yang berhasil tercatat di profil Anda.
              </p>
            </div>

            {/* Filter Tabs */}
            <div style={{ display: 'flex', gap: '4px', background: 'var(--bg-base)', padding: '3px', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
              <button
                onClick={() => setAssetFilter('current')}
                className={`btn-arcade ${assetFilter === 'current' ? 'btn-arcade-primary' : 'btn-arcade-outline'}`}
                style={{ padding: '4px 10px', fontSize: '0.74rem' }}
              >
                Periode Ini ({currentAssets.length})
              </button>
              <button
                onClick={() => setAssetFilter('all')}
                className={`btn-arcade ${assetFilter === 'all' ? 'btn-arcade-primary' : 'btn-arcade-outline'}`}
                style={{ padding: '4px 10px', fontSize: '0.74rem' }}
              >
                Semua ({allAssets.length})
              </button>
              <button
                onClick={() => setAssetFilter('historical')}
                className={`btn-arcade ${assetFilter === 'historical' ? 'btn-arcade-primary' : 'btn-arcade-outline'}`}
                style={{ padding: '4px 10px', fontSize: '0.74rem' }}
              >
                Riwayat ({historicalAssets.length})
              </button>
            </div>
          </div>

          {displayedAssets.length === 0 ? (
            <div style={{ padding: '32px', textAlign: 'center', border: '1px dashed var(--border)', borderRadius: 'var(--radius)', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              BELUM ADA BADGE YANG TERCATAT UNTUK KATEGORI INI.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '560px', overflowY: 'auto', paddingRight: '4px' }}>
              {displayedAssets.map((asset) => (
                <div
                  key={asset.id}
                  style={{
                    padding: '12px 16px',
                    background: 'var(--bg-base)',
                    border: asset.valid ? '1px solid var(--border)' : '1px solid var(--neon-magenta)',
                    borderRadius: 'var(--radius)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                    {asset.imageUrl ? (
                      <img
                        src={asset.imageUrl}
                        alt={asset.name}
                        style={{
                          width: '40px',
                          height: '40px',
                          objectFit: 'contain',
                          flexShrink: 0,
                          borderRadius: 'var(--radius)',
                          border: '1px solid var(--border)',
                          background: 'var(--bg-base)'
                        }}
                      />
                    ) : (
                      <div 
                        style={{ 
                          width: '40px', 
                          height: '40px', 
                          background: 'rgba(0, 240, 255, 0.1)', 
                          border: '1px solid var(--neon-cyan)', 
                          borderRadius: 'var(--radius)', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          fontWeight: 700, 
                          color: 'var(--neon-cyan)', 
                          fontSize: '0.75rem',
                          flexShrink: 0
                        }}
                      >
                        {asset.category === 'GAME' ? '🎮' : '🏅'}
                      </div>
                    )}

                    <div style={{ minWidth: 0 }}>
                      <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {asset.name}
                      </h4>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px', fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                        <span 
                          className={`badge-tag ${asset.category === 'GAME' ? 'badge-tag-warning' : 'badge-tag-done'}`}
                          style={{ fontSize: '0.68rem', padding: '2px 6px' }}
                        >
                          {asset.category}
                        </span>
                        <span>Diterima: {asset.earnedDate}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    {asset.valid ? (
                      <span className="badge-tag badge-tag-done" style={{ fontWeight: 700 }}>
                        +{asset.points} PT
                      </span>
                    ) : (
                      <span className="badge-tag badge-tag-excluded" title="Badge lama / tidak memenuhi kriteria">
                        ARSIP
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* YouTube Embedded Solution Player Modal */}
      {activeVideoModal && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(8px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={() => setActiveVideoModal(null)}
        >
          <div 
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              width: '100%',
              maxWidth: '850px',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '24px',
              boxShadow: '0 8px 32px rgba(0, 240, 255, 0.2)',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', marginBottom: '16px' }}>
              <div>
                <span className="badge-tag badge-tag-done" style={{ marginBottom: '6px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <Play size={14} /> Solusi Video YouTube
                </span>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', margin: 0, lineHeight: 1.3 }}>
                  {activeVideoModal.title}
                </h3>
              </div>
              <button 
                onClick={() => setActiveVideoModal(null)}
                className="btn-arcade btn-arcade-outline"
                style={{ padding: '6px 10px', fontSize: '0.8rem' }}
              >
                <X size={16} /> Tutup
              </button>
            </div>

            {/* Sub-labs selector tabs if multiple exist */}
            {activeVideoModal.subLabs && activeVideoModal.subLabs.length > 1 && (
              <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '10px', marginBottom: '14px' }}>
                {activeVideoModal.subLabs.map((sub, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSubLabIndex(idx)}
                    className={`btn-arcade ${activeSubLabIndex === idx ? 'btn-arcade-primary' : 'btn-arcade-outline'}`}
                    style={{ padding: '4px 12px', fontSize: '0.76rem', whiteSpace: 'nowrap' }}
                  >
                    Lab {idx + 1}: {sub.name}
                  </button>
                ))}
              </div>
            )}

            {/* YouTube Player Frame */}
            {(() => {
              const currentVideo = activeVideoModal.subLabs && activeVideoModal.subLabs.length > 0
                ? activeVideoModal.subLabs[activeSubLabIndex]?.videoUrl || activeVideoModal.videoUrl
                : activeVideoModal.videoUrl

              if (!currentVideo) {
                return (
                  <div style={{ padding: '24px', textAlign: 'center', background: 'var(--bg-base)', borderRadius: 'var(--radius)', color: 'var(--text-muted)' }}>
                    Solusi video belum tersedia.
                  </div>
                )
              }

              return (
                <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%', borderRadius: 'var(--radius)', overflow: 'hidden', border: '1px solid var(--border)' }}>
                  <iframe
                    src={currentVideo}
                    title="YouTube Solution Player"
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )
            })()}

            <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
              <a
                href={ADUAN_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-arcade btn-arcade-outline"
                style={{ padding: '6px 14px', fontSize: '0.78rem', color: '#ff5555', borderColor: 'rgba(255,85,85,0.3)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                🚨 Laporkan Lab Bermasalah (Form Dicoding)
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Arcade Game Solution & Details Modal */}
      {activeGameModal && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(8px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={() => setActiveGameModal(null)}
        >
          <div 
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              width: '100%',
              maxWidth: '850px',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '24px',
              boxShadow: '0 8px 32px rgba(255, 230, 0, 0.2)',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', marginBottom: '16px' }}>
              <div>
                <span className="badge-tag badge-tag-warning" style={{ marginBottom: '6px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <Gamepad2 size={14} /> Solusi & Guide Arcade Game
                </span>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', margin: 0, lineHeight: 1.3, fontWeight: 700 }}>
                  {activeGameModal.name}
                </h3>
              </div>
              <button 
                onClick={() => setActiveGameModal(null)}
                className="btn-arcade btn-arcade-outline"
                style={{ padding: '6px 10px', fontSize: '0.8rem' }}
              >
                <X size={16} /> Tutup
              </button>
            </div>

            {/* Access Code & Direct Game Link Bar */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg-base)', border: '1px solid var(--border)', padding: '14px', borderRadius: 'var(--radius)', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>Access Code:</span>
                <code style={{ background: '#0a0a12', padding: '4px 10px', borderRadius: 'var(--radius-sm)', color: 'var(--neon-yellow)', fontWeight: 700, fontFamily: 'var(--font-arcade)', fontSize: '0.95rem' }}>
                  {activeGameModal.accessCode}
                </code>
                <button
                  type="button"
                  onClick={() => copyCode(activeGameModal.accessCode)}
                  className="btn-arcade btn-arcade-outline"
                  style={{ padding: '4px 10px', fontSize: '0.74rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                >
                  {copiedCode === activeGameModal.accessCode ? <Check size={12} /> : <Copy size={12} />}
                  {copiedCode === activeGameModal.accessCode ? 'Tersalin' : 'Salin Kode'}
                </button>
              </div>

              <a
                href={activeGameModal.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-arcade btn-arcade-primary"
                style={{ padding: '8px 18px', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '6px', textDecoration: 'none' }}
              >
                🚀 Kerjakan Game di Google Skills <ExternalLink size={14} />
              </a>
            </div>

            {/* List of Child Labs with YouTube Video Links */}
            <h4 style={{ fontSize: '0.95rem', color: 'var(--neon-cyan)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              📋 DAFTAR LAB & VIDEO SOLUSI YOUTUBE ({activeGameModal.labs.length} LAB):
            </h4>

            {activeGameModal.labs.length === 0 ? (
              <div style={{ padding: '20px', textAlign: 'center', background: 'var(--bg-base)', borderRadius: 'var(--radius)', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                Gunakan tombol "Kerjakan Game di Google Skills" di atas untuk mengakses seluruh lab game ini di platform resmi.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {activeGameModal.labs.map((lab, idx) => (
                  <div 
                    key={idx} 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'space-between', 
                      gap: '12px', 
                      background: 'var(--bg-base)', 
                      border: '1px solid var(--border)', 
                      padding: '12px 16px', 
                      borderRadius: 'var(--radius)' 
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '2px' }}>
                        Lab {idx + 1}: {lab.name}
                      </span>
                      {lab.isClaimBadge && (
                        <span className="badge-tag badge-tag-warning" style={{ fontSize: '0.7rem' }}>
                          🎁 Claim Badge (Langsung Klaim)
                        </span>
                      )}
                    </div>

                    {lab.videoUrl ? (
                      <button
                        onClick={() => {
                          setActiveGameModal(null)
                          handleOpenVideoModal(`Solusi: ${lab.name}`, lab.videoUrl!)
                        }}
                        className="btn-arcade btn-arcade-primary"
                        style={{ padding: '6px 14px', fontSize: '0.78rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                      >
                        <Play size={12} /> Solusi YT
                      </button>
                    ) : lab.claimUrl ? (
                      <a
                        href={lab.claimUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-arcade btn-arcade-primary"
                        style={{ padding: '6px 14px', fontSize: '0.78rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                      >
                        Klaim Lencana <ExternalLink size={12} />
                      </a>
                    ) : null}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  )
}
