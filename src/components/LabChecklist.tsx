import React, { useState, useMemo } from 'react'
import { SKILL_BADGES, ARCADE_GAMES, TOTALS, SkillBadge, ArcadeGame } from '../config/program'
import { ParsedProfileResult } from '../utils/scraper'
import { Gamepad2, Award, Zap, Copy, Check, ExternalLink, Download, Clock, ShieldCheck, History } from 'lucide-react'

interface LabChecklistProps {
  scrapedData: ParsedProfileResult | null
}

export default function LabChecklist({ scrapedData }: LabChecklistProps) {
  const [activeSubTab, setActiveSubTab] = useState<'arcade_track' | 'skill_badge_track' | 'fasttrack' | 'track_badge'>('arcade_track')
  const [statusFilter, setStatusFilter] = useState<'all' | 'done' | 'pending'>('all')
  const [tierFilter, setTierFilter] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all')
  const [sortBy, setSortBy] = useState<'default' | 'labs_asc' | 'credits_asc'>('default')
  const [fasttrackSearch, setFasttrackSearch] = useState('')
  const [assetFilter, setAssetFilter] = useState<'current' | 'all' | 'historical'>('current')
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

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

  // Skill Badges grouped by Tier
  const skillTiers = useMemo(() => {
    const tiers = ['beginner', 'intermediate', 'advanced'] as const
    return tiers
      .filter(tier => tierFilter === 'all' || tierFilter === tier)
      .map(tier => {
        const items = SKILL_BADGES.filter(b => b.tier === tier).map(b => ({
          ...b,
          isDone: completedBadgeMap.has(b.id),
          earnedDate: completedBadgeMap.get(b.id) || null
        }))

        let filtered = items.filter(item => {
          if (statusFilter === 'done') return item.isDone
          if (statusFilter === 'pending') return !item.isDone
          return true
        })

        if (sortBy === 'labs_asc') {
          filtered = [...filtered].sort((a, b) => a.labs - b.labs)
        } else if (sortBy === 'credits_asc') {
          filtered = [...filtered].sort((a, b) => a.credits - b.credits)
        }

        const doneCount = items.filter(i => i.isDone).length

        return {
          tier,
          title: tier === 'beginner' ? 'Beginner (17 Badges)' : tier === 'intermediate' ? 'Intermediate (17 Badges)' : 'Advanced (17 Badges)',
          doneCount,
          totalCount: items.length,
          items: filtered
        }
      })
  }, [completedBadgeMap, statusFilter, tierFilter, sortBy])

  // Fasttrack List
  const fasttrackList = useMemo(() => {
    let items = SKILL_BADGES.map(b => ({
      ...b,
      isDone: completedBadgeMap.has(b.id),
      earnedDate: completedBadgeMap.get(b.id) || null
    }))

    if (tierFilter !== 'all') {
      items = items.filter(b => b.tier === tierFilter)
    }

    if (statusFilter === 'done') {
      items = items.filter(b => b.isDone)
    } else if (statusFilter === 'pending') {
      items = items.filter(b => !b.isDone)
    }

    if (fasttrackSearch.trim()) {
      const q = fasttrackSearch.toLowerCase()
      items = items.filter(b => b.name.toLowerCase().includes(q))
    }

    if (sortBy === 'labs_asc') {
      items = [...items].sort((a, b) => a.labs - b.labs)
    } else if (sortBy === 'credits_asc') {
      items = [...items].sort((a, b) => a.credits - b.credits)
    }

    return items
  }, [completedBadgeMap, statusFilter, tierFilter, fasttrackSearch, sortBy])

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

  const allAssets = useMemo(() => {
    return [...currentAssets, ...historicalAssets]
  }, [currentAssets, historicalAssets])

  const displayedAssets = useMemo(() => {
    if (assetFilter === 'current') return currentAssets
    if (assetFilter === 'historical') return historicalAssets
    return allAssets
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
          <Award size={16} /> Skill Badge Track ({doneSyllabusCount}/51)
        </button>

        <button
          className={`btn-arcade ${activeSubTab === 'fasttrack' ? 'btn-arcade-primary' : 'btn-arcade-outline'}`}
          onClick={() => setActiveSubTab('fasttrack')}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 16px', fontSize: '0.85rem' }}
        >
          <Zap size={16} /> Fasttrack (Catalog)
        </button>

        <button
          className={`btn-arcade ${activeSubTab === 'track_badge' ? 'btn-arcade-primary' : 'btn-arcade-outline'}`}
          onClick={() => setActiveSubTab('track_badge')}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 16px', fontSize: '0.85rem' }}
        >
          <History size={16} /> Track Badge ({scrapedData ? scrapedData.validGames.length + scrapedData.validSyllabusBadges.length + scrapedData.validExtraBadges.length : 0})
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
                              🔥 AKTIF — BELUM
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
                          <a
                            href={game.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`btn-arcade ${game.isDone ? 'btn-arcade-outline' : 'btn-arcade-primary'}`}
                            style={{ padding: '6px 14px', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                          >
                            {game.isDone ? 'Buka Game' : 'Kerjakan Game'} <ExternalLink size={12} />
                          </a>
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
                              🔒 DITUTUP
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
                🔒 Game September belum dirilis. Akses akan dibuka saat masa pengerjaan September dimulai.
              </div>
            )}
          </div>
        </div>
      )}

      {/* ============================================================
          2. SKILL BADGE TRACK (51 SYLLABUS BADGES)
         ============================================================ */}
      {activeSubTab === 'skill_badge_track' && (
        <div className="bento-card col-span-12" style={{ marginBottom: '32px' }}>
          <div className="card-header-flex" style={{ flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h3 className="card-title-arcade" style={{ color: 'var(--neon-cyan)' }}>
                <Award size={20} /> SKILL BADGE TRACK ({doneSyllabusCount} / 51 SILABUS SELESAI)
              </h3>
              <p style={{ marginTop: '4px', fontSize: '0.86rem' }}>
                Setiap 1 Skill Badge bernilai 0.5 Poin Arcade (2 Skill Badge = 1 Poin).
              </p>
            </div>

            <span className="badge-tag badge-tag-done">BOBOT: 0.5 PTS / BADGE</span>
          </div>

          {/* Filter & Sort Controls */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', margin: '20px 0' }}>
            <select
              className="input-arcade"
              style={{ padding: '6px 12px', fontSize: '0.82rem', width: 'auto' }}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
            >
              <option value="all">Filter Status: Semua</option>
              <option value="pending">Belum Dikerjakan</option>
              <option value="done">Sudah Selesai</option>
            </select>

            <select
              className="input-arcade"
              style={{ padding: '6px 12px', fontSize: '0.82rem', width: 'auto' }}
              value={tierFilter}
              onChange={(e) => setTierFilter(e.target.value as any)}
            >
              <option value="all">Filter Level: Semua Level</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>

            <select
              className="input-arcade"
              style={{ padding: '6px 12px', fontSize: '0.82rem', width: 'auto' }}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
            >
              <option value="default">Urutkan: Silabus Resmi</option>
              <option value="labs_asc">Jumlah Lab Paling Sedikit ⚡</option>
              <option value="credits_asc">Credit Paling Hemat 🪙</option>
            </select>
          </div>

          {skillTiers.map(tierGroup => (
            <div key={tierGroup.tier} style={{ marginBottom: '24px' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '8px 14px',
                  background: 'rgba(10, 10, 18, 0.7)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  marginBottom: '12px'
                }}
              >
                <strong style={{ fontSize: '0.88rem', color: 'var(--neon-cyan)' }}>
                  {tierGroup.title}
                </strong>
                <span className="badge-tag badge-tag-done">
                  {tierGroup.doneCount} / {tierGroup.totalCount} Selesai
                </span>
              </div>

              <div className="arcade-table-wrapper">
                <table className="arcade-table">
                  <thead>
                    <tr>
                      <th>STATUS</th>
                      <th>NAMA SKILL BADGE</th>
                      <th>LABS</th>
                      <th>CREDITS</th>
                      <th>AKSI / LINK</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tierGroup.items.map(badge => (
                      <tr key={badge.id} className={badge.isDone ? 'row-active-highlight' : ''}>
                        <td>
                          {badge.isDone ? (
                            <span className="badge-tag badge-tag-done">
                              ✓ SELESAI {badge.earnedDate ? `(${badge.earnedDate})` : ''}
                            </span>
                          ) : (
                            <span className="badge-tag badge-tag-pending">
                              ○ BELUM
                            </span>
                          )}
                        </td>
                        <td style={{ fontWeight: 600 }}>{badge.name}</td>
                        <td style={{ fontWeight: badge.labs === 1 ? 800 : 400, color: badge.labs === 1 ? 'var(--neon-yellow)' : 'inherit' }}>
                          {badge.labs} Lab {badge.labs === 1 ? '⚡ (1 Lab Fast)' : ''}
                        </td>
                        <td>{badge.credits} Cr</td>
                        <td>
                          <a
                            href={badge.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-arcade btn-arcade-outline"
                            style={{ padding: '4px 10px', fontSize: '0.78rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                          >
                            {badge.isDone ? 'Buka Link' : 'Kerjakan'} <ExternalLink size={12} />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}

          {/* BADGE TAMBAHAN */}
          {scrapedData && scrapedData.validExtraBadges.length > 0 && (
            <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid var(--border)' }}>
              <div className="card-header-flex" style={{ marginBottom: '12px' }}>
                <h3 className="card-title-arcade" style={{ color: 'var(--neon-cyan)', fontSize: '1rem' }}>
                  🌟 BADGE TAMBAHAN (DI LUAR SILABUS)
                </h3>
                <span className="badge-tag badge-tag-done">{scrapedData.validExtraBadges.length} BADGES</span>
              </div>
              <div className="arcade-table-wrapper">
                <table className="arcade-table">
                  <thead>
                    <tr>
                      <th>STATUS</th>
                      <th>NAMA BADGE</th>
                      <th>TANGGAL PEROLEHAN</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scrapedData.validExtraBadges.map((ex, idx) => (
                      <tr key={idx} className="row-active-highlight">
                        <td><span className="badge-tag badge-tag-done">✓ SELESAI (+0.5 PT)</span></td>
                        <td style={{ fontWeight: 600 }}>{ex.name}</td>
                        <td>{ex.earnedDate || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ============================================================
          3. FASTTRACK (FOUNDATIONAL CATALOG)
         ============================================================ */}
      {activeSubTab === 'fasttrack' && (
        <div className="bento-card col-span-12" style={{ marginBottom: '32px' }}>
          <div className="card-header-flex" style={{ flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h3 className="card-title-arcade" style={{ color: 'var(--state-done)' }}>
                <Zap size={20} /> FASTTRACK FOUNDATIONAL CATALOG ({fasttrackList.length} BADGES)
              </h3>
              <p style={{ marginTop: '4px', fontSize: '0.86rem' }}>
                Cari & urutkan lencana berdasarkan jumlah lab tercepat atau credit paling hemat.
              </p>
            </div>

            <span className="badge-tag badge-tag-done">0.5 PTS / BADGE</span>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', margin: '20px 0' }}>
            <div className="input-arcade-group" style={{ flex: 1, minWidth: '220px' }}>
              <input
                type="text"
                className="input-arcade"
                placeholder="🔍 Cari nama badge..."
                value={fasttrackSearch}
                onChange={(e) => setFasttrackSearch(e.target.value)}
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
              <option value="pending">Belum Dikerjakan</option>
              <option value="done">Sudah Selesai</option>
            </select>

            <select
              className="input-arcade"
              style={{ padding: '6px 12px', fontSize: '0.82rem', width: 'auto' }}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
            >
              <option value="default">Urutkan: Silabus Resmi</option>
              <option value="labs_asc">Lab Paling Sedikit (Fastest) ⚡</option>
              <option value="credits_asc">Credit Paling Hemat 🪙</option>
            </select>
          </div>

          <div className="bento-grid" style={{ gap: '16px' }}>
            {fasttrackList.map(badge => (
              <div 
                key={badge.id} 
                className="bento-card col-span-6" 
                style={{ 
                  background: badge.isDone ? 'rgba(0, 255, 157, 0.05)' : 'var(--bg-base)', 
                  border: badge.isDone ? '1px solid var(--state-done)' : '1px solid var(--border)',
                  padding: '16px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', marginBottom: '8px' }}>
                  <span className={`badge-tag ${badge.tier === 'beginner' ? 'badge-tag-done' : badge.tier === 'intermediate' ? 'badge-tag-warning' : 'badge-tag-excluded'}`}>
                    {badge.tier.toUpperCase()}
                  </span>
                  <span className={`badge-tag ${badge.isDone ? 'badge-tag-done' : 'badge-tag-pending'}`}>
                    {badge.isDone ? `✓ SELESAI ${badge.earnedDate ? `(${badge.earnedDate})` : ''}` : '○ BELUM'}
                  </span>
                </div>

                <h4 style={{ fontSize: '0.92rem', color: 'var(--text-primary)', marginBottom: '8px', lineHeight: 1.4, fontWeight: 700 }}>
                  {badge.name}
                </h4>

                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
                  <span>
                    <strong style={{ color: badge.labs === 1 ? 'var(--neon-yellow)' : 'inherit' }}>{badge.labs} Lab</strong> {badge.labs === 1 ? '⚡' : ''} • {badge.credits} Cr
                  </span>
                  <a
                    href={badge.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-arcade btn-arcade-outline"
                    style={{ padding: '4px 10px', fontSize: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                  >
                    {badge.isDone ? 'Buka Link' : 'Kerjakan'} <ExternalLink size={12} />
                  </a>
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

    </div>
  )
}
