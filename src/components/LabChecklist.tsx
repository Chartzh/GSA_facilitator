import React, { useState, useMemo } from 'react'
import { SKILL_BADGES, ARCADE_GAMES, TOTALS, SkillBadge, ArcadeGame } from '../config/program'
import { ParsedProfileResult } from '../utils/scraper'

interface LabChecklistProps {
  scrapedData: ParsedProfileResult | null
}

export default function LabChecklist({ scrapedData }: LabChecklistProps) {
  const [statusFilter, setStatusFilter] = useState<'all' | 'done' | 'pending'>('all')
  const [sortBy, setSortBy] = useState<'default' | 'labs_asc' | 'credits_asc'>('default')
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

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

  // Group Arcade Games by Month
  const gameGroups = useMemo(() => {
    const months = Array.from(new Set(ARCADE_GAMES.map(g => g.month)))
    const currentMonthStr = '2026-08' // Current active month

    return months.map(m => {
      const isPastMonth = m < currentMonthStr
      const monthGames = ARCADE_GAMES.filter(g => g.month === m).map(g => ({
        ...g,
        isDone: completedGameMap.has(g.id),
        earnedDate: completedGameMap.get(g.id) || null,
        isClosed: isPastMonth
      }))

      const monthTitle = m === '2026-07' ? 'JULI 2026 — SUDAH TUTUP' : m === '2026-08' ? 'AGUSTUS 2026 — AKTIF' : `${m} — UPCOMING`

      return {
        month: m,
        title: monthTitle,
        isClosed: isPastMonth,
        games: monthGames
      }
    })
  }, [completedGameMap])

  // Group Skill Badges by Tier
  const skillTiers = useMemo(() => {
    const tiers = ['beginner', 'intermediate', 'advanced'] as const
    return tiers.map(tier => {
      const items = SKILL_BADGES.filter(b => b.tier === tier).map(b => ({
        ...b,
        isDone: completedBadgeMap.has(b.id),
        earnedDate: completedBadgeMap.get(b.id) || null
      }))

      // Apply filter & sort
      let filtered = items.filter(item => {
        if (statusFilter === 'done') return item.isDone
        if (statusFilter === 'pending') return !item.isDone
        return true
      })

      if (sortBy === 'labs_asc') {
        filtered = filtered.sort((a, b) => a.labs - b.labs)
      } else if (sortBy === 'credits_asc') {
        filtered = filtered.sort((a, b) => a.credits - b.credits)
      }

      const doneCount = items.filter(i => i.isDone).length

      return {
        tier,
        title: tier === 'beginner' ? 'BEGINNER (17 Badges)' : tier === 'intermediate' ? 'INTERMEDIATE (17 Badges)' : 'ADVANCED (17 Badges)',
        doneCount,
        totalCount: items.length,
        items: filtered
      }
    })
  }, [completedBadgeMap, statusFilter, sortBy])

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2500)
  }

  // Export .txt checklist download
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
    content += `BLOK 1: ARCADE GAMES (12 GAMES)\n`
    content += `============================================================\n\n`

    ARCADE_GAMES.forEach((g) => {
      const isDone = completedGameMap.has(g.id)
      const isClosed = g.month < '2026-08'
      const status = isDone ? `[X] SELESAI (${completedGameMap.get(g.id)})` : isClosed ? `[LOCKED] TUTUP` : `[ ] BELUM`
      content += `- ${status} - ${g.name} (${g.month}) | URL: ${g.url}\n`
    })

    content += `\n============================================================\n`
    content += `BLOK 2: SKILL BADGES (51 BADGES)\n`
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
      
      {/* Prominent Badge Summary Banner (NO LAB PROGRESS NUMBERS) */}
      <div
        style={{
          padding: '20px 24px',
          background: 'radial-gradient(circle at top left, rgba(0, 255, 157, 0.1) 0%, var(--bg-card) 80%)',
          border: '1px solid rgba(0, 255, 157, 0.3)',
          borderRadius: 'var(--radius-card)',
          boxShadow: 'var(--glow-green)',
          marginBottom: '28px'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
              Kamu sudah menyelesaikan <span style={{ color: 'var(--state-done)' }}>{doneSyllabusCount} dari {TOTALS.skillBadges}</span> badge silabus.
            </div>
            <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
              Setiap kelipatan 2 Skill Badge bernilai 1 Poin Arcade. Badge bersifat all-or-nothing (dihitung saat terbit di profil).
            </div>
          </div>

          <button
            onClick={downloadChecklistTxt}
            className="btn-arcade btn-arcade-outline"
            style={{ padding: '8px 16px', fontSize: '0.82rem' }}
          >
            📥 DOWNLOAD CHECKLIST (.TXT)
          </button>
        </div>

        <div className="progress-bar-track" style={{ marginTop: '14px' }}>
          <div
            className="progress-bar-fill"
            style={{ width: `${Math.min(100, Math.round((doneSyllabusCount / TOTALS.skillBadges) * 100))}%` }}
          />
        </div>
      </div>

      {/* Global Filter & Sort Controls for Badges */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '24px' }}>
        <h2 style={{ fontFamily: 'var(--font-arcade)', fontSize: '1rem', color: 'var(--neon-cyan)' }}>
          📋 DAFTAR LENGKAP GAME & BADGE
        </h2>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
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
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
          >
            <option value="default">Urutkan: Silabus Resmi</option>
            <option value="labs_asc">Jumlah Lab Paling Sedikit ⚡</option>
            <option value="credits_asc">Credit Paling Hemat 🪙</option>
          </select>
        </div>
      </div>

      {/* ============================================================
          BLOK 1: ARCADE GAMES (12 GAMES) - DIPISAH TERPISAH
         ============================================================ */}
      <div className="bento-card col-span-12" style={{ marginBottom: '32px' }}>
        <div className="card-header-flex">
          <h3 className="card-title-arcade" style={{ color: 'var(--neon-yellow)' }}>
            🎮 BLOK 1 — ARCADE GAMES ({completedGameMap.size} / 12 SELESAI)
          </h3>
          <span className="badge-tag badge-tag-warning">1 GAME = 1 POIN ARCADE</span>
        </div>

        <p style={{ marginBottom: '18px', fontSize: '0.88rem' }}>
          Arcade Games memiliki periode pengerjaan bulanan. Game bulan lewat bersifat dikunci (tutup), namun <strong>game bulan Juli yang telah selesai TETAP DIHITUNG POIN</strong>.
        </p>

        {gameGroups.map(group => (
          <div key={group.month} style={{ marginBottom: '24px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '8px 14px',
                background: group.isClosed ? 'rgba(106, 106, 128, 0.15)' : 'rgba(255, 214, 0, 0.12)',
                border: group.isClosed ? '1px solid var(--border)' : '1px solid var(--neon-yellow)',
                borderRadius: 'var(--radius-sm)',
                marginBottom: '12px'
              }}
            >
              <strong style={{ fontSize: '0.88rem', color: group.isClosed ? 'var(--text-muted)' : 'var(--neon-yellow)' }}>
                {group.isClosed ? '🔒' : '🔥'} SUB-GRUP: {group.title}
              </strong>
            </div>

            <div className="arcade-table-wrapper">
              <table className="arcade-table">
                <thead>
                  <tr>
                    <th>STATUS</th>
                    <th>NAMA GAME</th>
                    <th>MONTH</th>
                    <th>ACCESS CODE</th>
                    <th>AKSI / LINK</th>
                  </tr>
                </thead>
                <tbody>
                  {group.games.map(game => (
                    <tr key={game.id} className={game.isDone ? 'row-active-highlight' : ''}>
                      <td>
                        {game.isDone ? (
                          <span className="badge-tag badge-tag-done">
                            ✓ SELESAI {game.earnedDate ? `(${game.earnedDate})` : ''} {game.isClosed ? '• Sudah Ditutup' : ''}
                          </span>
                        ) : game.isClosed ? (
                          <span className="badge-tag badge-tag-pending">
                            🔒 SUDAH DITUTUP
                          </span>
                        ) : (
                          <span className="badge-tag badge-tag-warning">
                            🔥 AKTIF — BELUM
                          </span>
                        )}
                      </td>
                      <td style={{ fontWeight: 700 }}>{game.name}</td>
                      <td>{game.month}</td>
                      <td>
                        {game.isClosed && !game.isDone ? (
                          <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Code disembunyikan (tutup)</span>
                        ) : (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <code style={{ background: 'var(--bg-base)', padding: '2px 6px', borderRadius: '4px', color: 'var(--neon-yellow)' }}>
                              {game.accessCode}
                            </code>
                            <button
                              type="button"
                              onClick={() => copyCode(game.accessCode)}
                              style={{ background: 'none', border: 'none', color: 'var(--neon-cyan)', cursor: 'pointer', fontSize: '0.78rem' }}
                            >
                              {copiedCode === game.accessCode ? '✓ Copied' : '📋 Copy'}
                            </button>
                          </div>
                        )}
                      </td>
                      <td>
                        {game.isClosed && !game.isDone ? (
                          <span
                            className="btn-arcade btn-arcade-outline"
                            style={{ padding: '4px 10px', fontSize: '0.78rem', opacity: 0.5, pointerEvents: 'none' }}
                          >
                            Tutup 🔒
                          </span>
                        ) : (
                          <a
                            href={game.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`btn-arcade ${game.isDone ? 'btn-arcade-outline' : 'btn-arcade-primary'}`}
                            style={{ padding: '6px 14px', fontSize: '0.8rem' }}
                          >
                            {game.isDone ? 'Buka Game ↗' : 'Kerjakan Game ➔'}
                          </a>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      {/* ============================================================
          BLOK 2: SKILL BADGES (51 BADGES) - DIPISAH TERPISAH
         ============================================================ */}
      <div className="bento-card col-span-12" style={{ marginBottom: '32px' }}>
        <div className="card-header-flex">
          <h3 className="card-title-arcade">
            📘 BLOK 2 — SKILL BADGES ({doneSyllabusCount} / 51 SELESAI)
          </h3>
          <span className="badge-tag badge-tag-done">2 BADGES = 1 POIN ARCADE</span>
        </div>

        <p style={{ marginBottom: '18px', fontSize: '0.88rem' }}>
          Semua 51 Skill Badge silabus aktif hingga 14 September 2026. Dikembangkan dalam 3 sub-grup tingkat kesulitan.
        </p>

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
                borderRadius: 'var(--radius-sm)',
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
                    <th>METADATA LAB</th>
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
                          style={{ padding: '4px 10px', fontSize: '0.78rem' }}
                        >
                          {badge.isDone ? 'Buka Link ↗' : 'Kerjakan ↗'}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      {/* ============================================================
          BLOK 3: BADGE TAMBAHAN (DI LUAR SILABUS)
         ============================================================ */}
      {scrapedData && scrapedData.validExtraBadges.length > 0 && (
        <div className="bento-card col-span-12" style={{ marginBottom: '32px' }}>
          <div className="card-header-flex">
            <h3 className="card-title-arcade" style={{ color: 'var(--neon-cyan)' }}>
              🌟 BLOK 3 — BADGE TAMBAHAN (DI LUAR SILABUS)
            </h3>
            <span className="badge-tag badge-tag-done">DIHITUNG POIN</span>
          </div>

          <p style={{ marginBottom: '14px', fontSize: '0.88rem' }}>
            Badge katalog umum yang diperoleh dalam periode program (maksimal 15 badge tambahan untuk mendukung Ultimate Milestone).
          </p>

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
                    <td><span className="badge-tag badge-tag-done">✓ SELESAI</span></td>
                    <td style={{ fontWeight: 600 }}>{ex.name}</td>
                    <td>{ex.earnedDate || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ============================================================
          BLOK 4: TIDAK DIHITUNG (EXCLUDED PANEL)
         ============================================================ */}
      {scrapedData && scrapedData.excludedItems.length > 0 && (
        <div className="bento-card col-span-12 bento-card-magenta">
          <div className="card-header-flex">
            <h3 className="card-title-arcade" style={{ color: 'var(--neon-magenta)' }}>
              🚫 BLOK 4 — BADGE TIDAK DIHITUNG
            </h3>
            <span className="badge-tag badge-tag-excluded">{scrapedData.excludedItems.length} ITEMS EXCLUDED</span>
          </div>

          <p style={{ marginBottom: '14px', fontSize: '0.88rem' }}>
            Daftar badge yang terdeteksi di profil Anda namun tidak dihitung poin beserta alasan ketentuannya.
          </p>

          <div className="arcade-table-wrapper">
            <table className="arcade-table">
              <thead>
                <tr>
                  <th>NAMA BADGE / GAME</th>
                  <th>TANGGAL / DATA</th>
                  <th>ALASAN EXCLUDE</th>
                </tr>
              </thead>
              <tbody>
                {scrapedData.excludedItems.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.title}</td>
                    <td>{item.dateStr || '-'}</td>
                    <td>
                      <span className="badge-tag badge-tag-excluded">
                        ❌ {item.reason}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  )
}
