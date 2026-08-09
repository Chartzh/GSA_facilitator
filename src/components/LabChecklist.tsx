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

  // Arcade Games grouped by Month (Juli, Agustus, September)
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
    return tiers.map(tier => {
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
        filtered = filtered.sort((a, b) => a.labs - b.labs)
      } else if (sortBy === 'credits_asc') {
        filtered = filtered.sort((a, b) => a.credits - b.credits)
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
  }, [completedBadgeMap, statusFilter, sortBy])

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
      
      {/* Badge Summary Banner */}
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
              Setiap 1 Skill Badge bernilai 0.5 Poin Arcade (2 Skill Badge = 1 Poin). Badge dihitung saat terbit di profil.
            </div>
          </div>

          <button
            onClick={downloadChecklistTxt}
            className="btn-arcade btn-arcade-outline"
            style={{ padding: '8px 16px', fontSize: '0.82rem' }}
          >
            📥 Download Checklist (.txt)
          </button>
        </div>

        <div className="progress-bar-track" style={{ marginTop: '14px' }}>
          <div
            className="progress-bar-fill"
            style={{ width: `${Math.min(100, Math.round((doneSyllabusCount / TOTALS.skillBadges) * 100))}%` }}
          />
        </div>
      </div>

      {/* Global Filter & Sort Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '24px' }}>
        <h2 style={{ fontFamily: 'var(--font-arcade)', fontSize: '1rem', color: 'var(--neon-cyan)' }}>
          📋 DAFTAR ARCADE GAME & SKILL BADGE
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
          ARCADE GAME (12 GAMES)
         ============================================================ */}
      <div className="bento-card col-span-12" style={{ marginBottom: '32px' }}>
        <div className="card-header-flex">
          <h3 className="card-title-arcade" style={{ color: 'var(--neon-yellow)' }}>
            🎮 ARCADE GAME ({completedGameMap.size} / 12 SELESAI)
          </h3>
          <span className="badge-tag badge-tag-warning">1 GAME = 1 POIN ARCADE</span>
        </div>

        <p style={{ marginBottom: '18px', fontSize: '0.88rem' }}>
          Arcade Game dirilis bulanan. Game bulan lewat ditutup untuk pengerjakan baru, namun <strong>game Juli yang sudah selesai TETAP DIHITUNG POINNYA</strong>.
        </p>

        {/* --- AGUSTUS (Terbuka, default tampil) --- */}
        <div style={{ marginBottom: '20px', border: '1px solid var(--neon-yellow)', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
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
              {openMonths['2026-08'] ? '▾' : '▸'} Agustus
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
                      </td>
                      <td>
                        <a
                          href={game.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`btn-arcade ${game.isDone ? 'btn-arcade-outline' : 'btn-arcade-primary'}`}
                          style={{ padding: '6px 14px', fontSize: '0.8rem' }}
                        >
                          {game.isDone ? 'Buka Game ↗' : 'Kerjakan Game ➔'}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* --- JULI (Tertutup / Collapsed, Link Mati, Poin Selesai Tetap Dihitung) --- */}
        <div style={{ marginBottom: '20px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
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
              {openMonths['2026-07'] ? '▾' : '▸'} Juli — {julyDoneCount}/{julyGames.length} selesai
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
                            ✅ SELESAI ({game.earnedDate || 'Juli'}) — POIN DIHITUNG
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

        {/* --- SEPTEMBER (Tertutup / Collapsed + Gembok) --- */}
        <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
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
              {openMonths['2026-09'] ? '▾' : '▸'} 🔒 September
            </strong>
            <span className="badge-tag badge-tag-pending">
              BELUM DIRILIS
            </span>
          </div>

          {openMonths['2026-09'] && (
            <div style={{ padding: '20px', fontSize: '0.88rem', color: 'var(--text-muted)', textAlign: 'center' }}>
              🔒 Game September belum dirilis. Nantikan awal September.
            </div>
          )}
        </div>
      </div>

      {/* ============================================================
          SKILL BADGE (51 BADGES)
         ============================================================ */}
      <div className="bento-card col-span-12" style={{ marginBottom: '32px' }}>
        <div className="card-header-flex">
          <h3 className="card-title-arcade">
            📘 SKILL BADGE ({doneSyllabusCount} / 51 SELESAI)
          </h3>
          <span className="badge-tag badge-tag-done">2 BADGES = 1 POIN ARCADE</span>
        </div>

        <p style={{ marginBottom: '18px', fontSize: '0.88rem' }}>
          Semua 51 Skill Badge silabus aktif hingga 14 September 2026.
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

      {/* BADGE TAMBAHAN */}
      {scrapedData && scrapedData.validExtraBadges.length > 0 && (
        <div className="bento-card col-span-12" style={{ marginBottom: '32px' }}>
          <div className="card-header-flex">
            <h3 className="card-title-arcade" style={{ color: 'var(--neon-cyan)' }}>
              🌟 BADGE TAMBAHAN (DI LUAR SILABUS)
            </h3>
            <span className="badge-tag badge-tag-done">DIHITUNG POIN</span>
          </div>

          <p style={{ marginBottom: '14px', fontSize: '0.88rem' }}>
            Semua Skill Badge katalog umum yang diperoleh dalam periode program (mulai 13 Juli 2026) dihitung masuk ke total poin Arcade.
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

      {/* BADGE TIDAK DIHITUNG */}
      {scrapedData && scrapedData.excludedItems.length > 0 && (
        <div className="bento-card col-span-12 bento-card-magenta">
          <div className="card-header-flex">
            <h3 className="card-title-arcade" style={{ color: 'var(--neon-magenta)' }}>
              🚫 BADGE TIDAK DIHITUNG
            </h3>
            <span className="badge-tag badge-tag-excluded">{scrapedData.excludedItems.length} ITEMS EXCLUDED</span>
          </div>

          <p style={{ marginBottom: '14px', fontSize: '0.88rem' }}>
            Daftar badge yang terdeteksi di profil Anda namun tidak memenuhi syarat periode atau silabus.
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
