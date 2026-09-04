import React, { useState, useMemo } from 'react'
import {
  JULY_ARCADE_GAMES,
  AUGUST_ARCADE_GAMES,
  SEPTEMBER_ARCADE_GAMES,
  CATALOG_SKILL_BADGES,
  CatalogSkillBadge,
  CatalogArcadeGame,
  CatalogArcadeLab,
  SubLabItem
} from '../config/catalogData'
import {
  Search,
  Video,
  ExternalLink,
  Code,
  Download,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Award,
  Gamepad2,
  AlertCircle,
  FileText,
  Upload,
  CheckCircle,
  Zap,
  Filter,
  X,
  Play
} from 'lucide-react'

const ADUAN_FORM_URL = 'https://forms.gle/a1Bi7qs5QfZAnvVEA'

interface ActiveSolution {
  title: string
  videoUrl?: string
  driveUrl?: string
  scriptFile?: string
  lang?: string
  note?: string
  subLabs?: SubLabItem[]
}

export default function TutorialGuide() {
  const [searchQuery, setSearchQuery] = useState('')
  const [tierFilter, setTierFilter] = useState<'all' | 'Beginner' | 'Intermediate' | 'Advanced' | 'FastTrack'>('all')
  const [openGames, setOpenGames] = useState<Record<string, boolean>>({
    'game-adventure': true,
    'game-basecamp-aug': true
  })

  // Solution Modal State
  const [activeSolution, setActiveSolution] = useState<ActiveSolution | null>(null)
  const [activeSubLabIndex, setActiveSubLabIndex] = useState<number>(0)
  const [codeContent, setCodeContent] = useState<string | null>(null)
  const [loadingScript, setLoadingScript] = useState(false)
  const [copiedScript, setCopiedScript] = useState(false)

  // Checklist Import State
  const [importedBadges, setImportedBadges] = useState<Set<string>>(new Set())
  const [importStatusMessage, setImportStatusMessage] = useState<string | null>(null)

  const toggleGameAccordion = (id: string) => {
    setOpenGames(prev => ({ ...prev, [id]: !prev[id] }))
  }

  // Open Solution Modal
  const handleOpenSolution = async (item: ActiveSolution) => {
    setActiveSolution(item)
    setActiveSubLabIndex(0)
    setCodeContent(null)
    setCopiedScript(false)

    const targetScript = item.subLabs && item.subLabs.length > 0 ? item.subLabs[0].scriptFile : item.scriptFile
    if (targetScript) {
      setLoadingScript(true)
      try {
        const res = await fetch(`/scripts/${targetScript}?t=${Date.now()}`)
        if (res.ok) {
          const text = await res.text()
          setCodeContent(text)
        } else {
          setCodeContent(`# File script '${targetScript}' tidak ditemukan di server.\nSilakan gunakan link drive / video youtube di atas.`)
        }
      } catch (err) {
        setCodeContent(`# Gagal memuat file script: ${err}`)
      } finally {
        setLoadingScript(false)
      }
    }
  }

  const handleSubLabSelect = async (index: number) => {
    if (!activeSolution || !activeSolution.subLabs) return
    setActiveSubLabIndex(index)
    setCodeContent(null)
    setCopiedScript(false)

    const sub = activeSolution.subLabs[index]
    if (sub.scriptFile) {
      setLoadingScript(true)
      try {
        const res = await fetch(`/scripts/${sub.scriptFile}?t=${Date.now()}`)
        if (res.ok) {
          const text = await res.text()
          setCodeContent(text)
        } else {
          setCodeContent(`# File script '${sub.scriptFile}' tidak ditemukan di server.`)
        }
      } catch (err) {
        setCodeContent(`# Gagal memuat file script: ${err}`)
      } finally {
        setLoadingScript(false)
      }
    }
  }

  const handleCopyScript = () => {
    if (!codeContent) return
    navigator.clipboard.writeText(codeContent)
    setCopiedScript(true)
    setTimeout(() => setCopiedScript(false), 2500)
  }

  // File Importer for Badges Checklist (.csv / .json / .html)
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const content = e.target?.result as string
      if (!content) return

      const matchedNames = new Set<string>()
      CATALOG_SKILL_BADGES.forEach(badge => {
        const normName = badge.name.toLowerCase().trim()
        if (content.toLowerCase().includes(normName)) {
          matchedNames.add(badge.name)
        }
      })

      setImportedBadges(matchedNames)
      setImportStatusMessage(`Berhasil mengimpor ${matchedNames.size} badge selesai dari file "${file.name}"!`)
      setTimeout(() => setImportStatusMessage(null), 5000)
    }
    reader.readAsText(file)
  }

  // Filtered Lists
  const filteredSkillBadges = useMemo(() => {
    return CATALOG_SKILL_BADGES.filter(badge => {
      const q = searchQuery.toLowerCase().trim()
      const matchesSearch = !q || badge.name.toLowerCase().includes(q) || (badge.note && badge.note.toLowerCase().includes(q))
      
      if (!matchesSearch) return false

      if (tierFilter === 'all') return true
      if (tierFilter === 'FastTrack') return badge.isFastTrack
      return badge.level === tierFilter
    })
  }, [searchQuery, tierFilter])

  const allArcadeGames = useMemo(() => [...JULY_ARCADE_GAMES, ...AUGUST_ARCADE_GAMES, ...SEPTEMBER_ARCADE_GAMES], [])

  return (
    <div style={{ marginTop: '24px', marginBottom: '40px' }}>

      {/* Header Banner */}
      <div 
        className="bento-card col-span-12"
        style={{
          background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.08) 0%, rgba(138, 43, 226, 0.08) 100%)',
          border: '1px solid var(--neon-cyan)',
          borderRadius: 'var(--radius-md)',
          padding: '24px 28px',
          marginBottom: '24px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 12px', background: 'rgba(0, 240, 255, 0.15)', border: '1px solid var(--neon-cyan)', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700, color: 'var(--neon-cyan)', marginBottom: '8px' }}>
              <Zap size={14} /> KATALOG 95 SKILL BADGE & ARCADE LAB TUTORIAL
            </div>
            <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '6px' }}>
              Tutorial Lab & Solusi Video YouTube
            </h2>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', maxWidth: '680px', margin: 0 }}>
              Kumpulan panduan solusi lab Arcade Games & 95 Skill Badges resmi katalog 2026. Lengkap dengan link video YouTube, script otomatisasi, file drive, dan catatan penting.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <label className="btn-arcade btn-arcade-outline" style={{ cursor: 'pointer', padding: '8px 14px', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Upload size={14} /> Impor Checklist (.csv/.json)
              <input type="file" accept=".csv,.json,.txt,.html" onChange={handleFileUpload} style={{ display: 'none' }} />
            </label>
          </div>
        </div>

        {importStatusMessage && (
          <div style={{ marginTop: '14px', padding: '10px 14px', background: 'rgba(57, 255, 20, 0.15)', border: '1px solid var(--neon-green)', borderRadius: 'var(--radius-sm)', color: 'var(--neon-green)', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle size={16} /> {importStatusMessage}
          </div>
        )}
      </div>

      {/* Search & Filter Controls */}
      <div 
        style={{ 
          display: 'flex', 
          gap: '12px', 
          marginBottom: '24px', 
          flexWrap: 'wrap',
          alignItems: 'center',
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          padding: '12px 16px',
          borderRadius: 'var(--radius)'
        }}
      >
        <div style={{ flex: '1 1 280px', position: 'relative' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Cari nama lab, skill badge, atau kata kunci..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px 8px 36px',
              background: 'var(--bg-base)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--text-primary)',
              fontSize: '0.85rem'
            }}
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Tier Filter Buttons */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {[
            { id: 'all', label: `Semua (${CATALOG_SKILL_BADGES.length})` },
            { id: 'Beginner', label: 'Beginner (17)' },
            { id: 'Intermediate', label: 'Intermediate (17)' },
            { id: 'Advanced', label: 'Advanced (17)' },
            { id: 'FastTrack', label: 'FastTrack Only ⚡' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setTierFilter(f.id as any)}
              className={`btn-arcade ${tierFilter === f.id ? 'btn-arcade-primary' : 'btn-arcade-outline'}`}
              style={{ padding: '6px 12px', fontSize: '0.78rem' }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* ============================================================
          ARCADE GAMES ACCORDION SECTION
         ============================================================ */}
      <div style={{ marginBottom: '32px' }}>
        <h3 className="section-title" style={{ fontSize: '1.15rem', color: 'var(--neon-yellow)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <Gamepad2 size={20} /> ARCADE GAMES LAB TUTORIAL (JULI & AGUSTUS)
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {allArcadeGames.map((game: CatalogArcadeGame) => {
            const isOpen = !!openGames[game.id]
            return (
              <div 
                key={game.id}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  overflow: 'hidden'
                }}
              >
                {/* Accordion Header */}
                <div 
                  onClick={() => toggleGameAccordion(game.id)}
                  style={{
                    padding: '14px 18px',
                    background: isOpen ? 'rgba(255, 255, 255, 0.03)' : 'transparent',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '1.1rem' }}>🎮</span>
                    <strong style={{ fontSize: '0.92rem', color: 'var(--text-primary)' }}>{game.name}</strong>
                    {game.isExpired && (
                      <span className="badge-tag badge-tag-closed" style={{ fontSize: '0.68rem' }}>EXPIRED</span>
                    )}
                    <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>({game.labs.length} Lab)</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--neon-cyan)' }}>
                    <span style={{ fontSize: '0.78rem' }}>{isOpen ? 'Tutup' : 'Lihat Lab'}</span>
                    {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </div>

                {/* Accordion Body */}
                {isOpen && (
                  <div style={{ padding: '16px 18px', borderTop: '1px solid var(--border)', background: 'var(--bg-base)' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {game.labs.map((lab: CatalogArcadeLab, idx: number) => (
                        <div 
                          key={idx}
                          style={{
                            padding: '10px 14px',
                            background: 'var(--bg-card)',
                            border: '1px solid var(--border)',
                            borderRadius: 'var(--radius-sm)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            gap: '10px'
                          }}
                        >
                          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                            {idx + 1}. {lab.name}
                          </div>

                          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            {lab.videoUrl && (
                              <button
                                onClick={() => handleOpenSolution({ title: lab.name, videoUrl: lab.videoUrl, driveUrl: lab.driveUrl, scriptFile: lab.scriptFile, lang: lab.lang })}
                                className="btn-arcade btn-arcade-primary"
                                style={{ padding: '4px 10px', fontSize: '0.72rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                              >
                                <Play size={12} /> Solusi YT
                              </button>
                            )}

                            {lab.driveUrl && (
                              <a
                                href={lab.driveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-arcade btn-arcade-outline"
                                style={{ padding: '4px 10px', fontSize: '0.72rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                              >
                                File / Drive <ExternalLink size={12} />
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* ============================================================
          95 SKILL BADGES CATALOG GRID SECTION
         ============================================================ */}
      <div>
        <h3 className="section-title" style={{ fontSize: '1.15rem', color: 'var(--neon-cyan)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <Award size={20} /> KATALOG 95 SKILL BADGE RESMI ({filteredSkillBadges.length} TERFILTER)
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
          {filteredSkillBadges.map((badge: CatalogSkillBadge, idx: number) => {
            const isImportedDone = importedBadges.has(badge.name)
            return (
              <div
                key={idx}
                style={{
                  background: 'var(--bg-card)',
                  border: isImportedDone ? '1px solid var(--neon-green)' : '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '12px',
                  position: 'relative'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span 
                      className={`badge-tag ${badge.level === 'Beginner' ? 'badge-tag-done' : badge.level === 'Intermediate' ? 'badge-tag-warning' : 'badge-tag-closed'}`}
                      style={{ fontSize: '0.68rem' }}
                    >
                      {badge.level.toUpperCase()}
                    </span>

                    {badge.isFastTrack ? (
                      <span style={{ fontSize: '0.68rem', padding: '2px 8px', background: 'rgba(255, 215, 0, 0.15)', border: '1px solid var(--neon-yellow)', borderRadius: '12px', color: 'var(--neon-yellow)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                        <Zap size={10} /> FastTrack (1 Lab)
                      </span>
                    ) : (
                      <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                        4 Lab Requirement
                      </span>
                    )}
                  </div>

                  <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 6px 0', lineHeight: 1.35 }}>
                    {badge.name}
                  </h4>

                  {badge.note && (
                    <div style={{ marginTop: '6px', padding: '6px 10px', background: 'rgba(255, 184, 0, 0.08)', border: '1px solid rgba(255, 184, 0, 0.25)', borderRadius: 'var(--radius-sm)', fontSize: '0.74rem', color: '#ffb800' }}>
                      💡 {badge.note}
                    </div>
                  )}

                  {/* Sub-labs dropdown preview */}
                  {badge.subLabs && badge.subLabs.length > 0 && (
                    <div style={{ marginTop: '8px', fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                      <strong>Sub-Labs ({badge.subLabs.length}):</strong>
                      <ul style={{ margin: '4px 0 0 16px', padding: 0 }}>
                        {badge.subLabs.slice(0, 2).map((sub, sIdx) => (
                          <li key={sIdx} style={{ margin: '2px 0' }}>{sub.name}</li>
                        ))}
                        {badge.subLabs.length > 2 && <li>+{badge.subLabs.length - 2} sub-lab lainnya...</li>}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Footer Buttons */}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center', paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  {(badge.videoUrl || (badge.subLabs && badge.subLabs.length > 0)) && (
                    <button
                      onClick={() => handleOpenSolution({ title: badge.name, videoUrl: badge.videoUrl, driveUrl: badge.driveUrl, scriptFile: badge.scriptFile, lang: badge.lang, note: badge.note, subLabs: badge.subLabs })}
                      className="btn-arcade btn-arcade-primary"
                      style={{ padding: '5px 12px', fontSize: '0.74rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                    >
                      <Play size={12} /> Solusi YT
                    </button>
                  )}

                  {badge.driveUrl && (
                    <a
                      href={badge.driveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-arcade btn-arcade-outline"
                      style={{ padding: '5px 10px', fontSize: '0.74rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                    >
                      Drive <ExternalLink size={12} />
                    </a>
                  )}

                  <a
                    href={badge.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-arcade btn-arcade-outline"
                    style={{ marginLeft: 'auto', padding: '5px 10px', fontSize: '0.74rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                  >
                    Buka Link <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ============================================================
          SOLUTION MODAL DIALOG (YOUTUBE EMBED PLAYER + SCRIPT VIEWER)
         ============================================================ */}
      {activeSolution && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
        >
          <div 
            style={{
              width: '100%',
              maxWidth: '860px',
              maxHeight: '90vh',
              background: 'var(--bg-card)',
              border: '1px solid var(--neon-cyan)',
              borderRadius: 'var(--radius-md)',
              overflowY: 'auto',
              boxShadow: '0 0 30px rgba(0, 240, 255, 0.2)',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Modal Header */}
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(0,0,0,0.2)' }}>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                  📺 {activeSolution.title}
                </h3>
                <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
                  Panduan Video Solusi YouTube & Script Otomatisasi
                </p>
              </div>

              <button
                onClick={() => setActiveSolution(null)}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

              {/* Sub-labs selector tab if multiple sub-labs exist */}
              {activeSolution.subLabs && activeSolution.subLabs.length > 0 && (
                <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px' }}>
                  {activeSolution.subLabs.map((sub, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSubLabSelect(idx)}
                      className={`btn-arcade ${activeSubLabIndex === idx ? 'btn-arcade-primary' : 'btn-arcade-outline'}`}
                      style={{ padding: '6px 12px', fontSize: '0.74rem', whiteSpace: 'nowrap' }}
                    >
                      Lab {idx + 1}: {sub.name}
                    </button>
                  ))}
                </div>
              )}

              {/* YouTube Video Player Embed */}
              {(() => {
                const currentVideo = activeSolution.subLabs && activeSolution.subLabs.length > 0
                  ? activeSolution.subLabs[activeSubLabIndex]?.videoUrl || activeSolution.videoUrl
                  : activeSolution.videoUrl

                if (!currentVideo) {
                  return (
                    <div style={{ padding: '24px', textAlign: 'center', background: 'var(--bg-base)', border: '1px dashed var(--border)', borderRadius: 'var(--radius)', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                      Solusi video YouTube belum tersedia untuk lab ini. Silakan cek link Drive / Github di bawah.
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

              {/* Code Script Viewer if script exists */}
              {codeContent && (
                <div style={{ background: 'var(--bg-base)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--neon-cyan)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      <Code size={14} /> SCRIPT KODE OTOMATISASI
                    </span>

                    <button
                      onClick={handleCopyScript}
                      className="btn-arcade btn-arcade-outline"
                      style={{ padding: '4px 10px', fontSize: '0.72rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                    >
                      {copiedScript ? <Check size={12} /> : <Copy size={12} />}
                      {copiedScript ? 'Tersalin!' : 'Salin Kode'}
                    </button>
                  </div>

                  <pre 
                    style={{
                      maxHeight: '220px',
                      overflowY: 'auto',
                      background: '#0a0a12',
                      padding: '12px',
                      borderRadius: 'var(--radius-sm)',
                      fontFamily: 'monospace',
                      fontSize: '0.78rem',
                      color: 'var(--text-primary)',
                      margin: 0
                    }}
                  >
                    {codeContent}
                  </pre>
                </div>
              )}

              {/* Resource & Complaint Action Buttons */}
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', paddingTop: '8px' }}>
                <a
                  href={ADUAN_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-arcade btn-arcade-outline"
                  style={{ padding: '6px 12px', fontSize: '0.76rem', color: '#ffb800', borderColor: 'rgba(255,184,0,0.4)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                >
                  <AlertCircle size={14} /> Laporkan Lab Bermasalah (Form Resmi)
                </a>

                {(() => {
                  const currentDrive = activeSolution.subLabs && activeSolution.subLabs.length > 0
                    ? activeSolution.subLabs[activeSubLabIndex]?.driveUrl || activeSolution.driveUrl
                    : activeSolution.driveUrl

                  if (!currentDrive) return null

                  return (
                    <a
                      href={currentDrive}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-arcade btn-arcade-primary"
                      style={{ padding: '6px 14px', fontSize: '0.76rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                    >
                      Buka File Drive / GitHub <ExternalLink size={14} />
                    </a>
                  )
                })()}
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  )
}
