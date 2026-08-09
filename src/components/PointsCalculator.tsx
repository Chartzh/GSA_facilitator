import React, { useState, useEffect } from 'react'
import { validateProfileUrl, parseProfileHtml, ParsedProfileResult } from '../utils/scraper'
import LabChecklist from './LabChecklist'

// Simple 10-minute client cache per profile URL
const profileCache = new Map<string, { timestamp: number; data: ParsedProfileResult }>()
const CACHE_TTL_MS = 10 * 60 * 1000 // 10 minutes

// Rate limit helper: max 20 requests per minute
let requestTimestamps: number[] = []
const MAX_REQ_PER_MIN = 20

export default function PointsCalculator() {
  const [inputUrl, setInputUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [resultData, setResultData] = useState<ParsedProfileResult | null>(null)

  // Load cached input URL and result from localStorage when mounting / returning to page
  useEffect(() => {
    try {
      const savedUrl = localStorage.getItem('gsa_calc_url')
      const savedData = localStorage.getItem('gsa_calc_data')
      if (savedUrl) setInputUrl(savedUrl)
      if (savedData) setResultData(JSON.parse(savedData))
    } catch {
      // Ignore localStorage errors
    }
  }, [])

  const saveToStorage = (url: string, data: ParsedProfileResult) => {
    try {
      localStorage.setItem('gsa_calc_url', url)
      localStorage.setItem('gsa_calc_data', JSON.stringify(data))
    } catch {
      // Ignore localStorage errors
    }
  }

  const handleCheckProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')

    const validation = validateProfileUrl(inputUrl)
    if (!validation.valid || !validation.url) {
      setErrorMsg(validation.error || 'Link public profile tidak valid.')
      return
    }

    const cleanUrl = validation.url

    // 1. Rate limiting check (20 req / min)
    const now = Date.now()
    requestTimestamps = requestTimestamps.filter(t => now - t < 60000)
    if (requestTimestamps.length >= MAX_REQ_PER_MIN) {
      setErrorMsg('Batas pencarian tercapai. Server sedang sibuk, coba lagi sebentar.')
      return
    }
    requestTimestamps.push(now)

    // 2. Check 10-minute Cache
    const cached = profileCache.get(cleanUrl)
    if (cached && now - cached.timestamp < CACHE_TTL_MS) {
      setResultData(cached.data)
      saveToStorage(cleanUrl, cached.data)
      return
    }

    setLoading(true)
    try {
      // Try local serverless API route first
      const res = await fetch(`/api/check-profile?profileUrl=${encodeURIComponent(cleanUrl)}`)
      if (res.ok) {
        const json: ParsedProfileResult = await res.json()
        profileCache.set(cleanUrl, { timestamp: Date.now(), data: json })
        setResultData(json)
        saveToStorage(cleanUrl, json)
      } else {
        // Fallback: client fetch if API fails or local dev proxy
        const clientRes = await fetch(cleanUrl, {
          headers: { 'accept': 'text/html,application/xhtml+xml' }
        })
        if (!clientRes.ok) {
          if (clientRes.status === 429) {
            throw new Error('Server sedang sibuk, coba lagi sebentar.')
          }
          throw new Error(`HTTP ${clientRes.status}`)
        }
        const html = await clientRes.text()
        const parsed = parseProfileHtml(html, cleanUrl)
        profileCache.set(cleanUrl, { timestamp: Date.now(), data: parsed })
        setResultData(parsed)
        saveToStorage(cleanUrl, parsed)
      }
    } catch (err: any) {
      setErrorMsg(
        err?.message ||
        'Server sedang sibuk, coba lagi sebentar. Pastikan profil di-set Public di pengaturan Google Skills.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ marginTop: '20px' }}>
      
      {/* Step 1: Input Form Card */}
      <div className="bento-card bento-card-large col-span-12">
        <div className="card-header-flex">
          <h2 className="card-title-arcade">
            <span>⚡</span> KALKULATOR POIN ARCADE 2026
          </h2>
          <span className="badge-tag badge-tag-done">ID-MATCHING ENGINE</span>
        </div>

        <p style={{ marginBottom: '16px' }}>
          Masukkan URL Public Profile Google Skills Anda untuk mengkalkulasi poin, milestone, dan status pengerjaan secara otomatis.
        </p>

        {/* Input Form */}
        <form onSubmit={handleCheckProfile} className="input-arcade-group" style={{ marginBottom: '12px' }}>
          <input
            type="url"
            className="input-arcade"
            placeholder="https://www.skills.google/public_profiles/YOUR_ID"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            required
          />
          <button
            type="submit"
            className="btn-arcade btn-arcade-primary"
            disabled={loading}
          >
            {loading ? 'MEMPROSES PROFIL...' : 'HITUNG POIN SAYA 🚀'}
          </button>
        </form>

        <div style={{ fontSize: '0.8rem', color: 'var(--neon-cyan)', fontWeight: 500 }}>
          💡 Hasil perhitungan tersimpan otomatis (cached) dan tidak akan hilang saat berpindah halaman.
        </div>

        {/* Error Message */}
        {errorMsg && (
          <div
            className="badge-tag badge-tag-excluded"
            style={{ padding: '12px 16px', width: '100%', marginTop: '16px', lineHeight: '1.5' }}
          >
            ❌ {errorMsg}
          </div>
        )}
      </div>

      {/* Step 3: Prominent Score Summary & Milestone Gap */}
      {resultData && (
        <div className="bento-card col-span-12 bento-card-highlight" style={{ marginTop: '24px' }}>
          
          <div className="card-header-flex" style={{ flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)' }}>
                👤 {resultData.profileName}
              </h3>
              <a
                href={resultData.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: '0.82rem', color: 'var(--neon-cyan)', textDecoration: 'none' }}
              >
                {resultData.profileUrl} ↗
              </a>
            </div>

            {resultData.currentTier && (
              <span className="badge-tag badge-tag-warning" style={{ fontSize: '0.88rem', padding: '6px 14px' }}>
                🏆 {resultData.currentTier.label} ({resultData.totalPointsWithBonus} Poin)
              </span>
            )}
          </div>

          {/* Unknown Date Info */}
          {resultData.unknownDateCount > 0 && (
            <div className="badge-tag badge-tag-done" style={{ width: '100%', margin: '16px 0', padding: '12px 16px', background: 'rgba(0, 255, 157, 0.08)', color: 'var(--state-done)' }}>
              ℹ️ Ada {resultData.unknownDateCount} badge tanpa pembacaan string tanggal — <strong>TETAP DIHITUNG MASUK</strong> ke total poin Anda.
            </div>
          )}

          {/* Giant Stat Numbers */}
          <div className="bento-grid" style={{ margin: '20px 0', gap: '16px' }}>
            <div className="stat-box col-span-3">
              <div className="stat-value-giant" style={{ fontSize: '2.2rem', color: 'var(--neon-cyan)' }}>
                {resultData.totalPointsWithBonus} PT
              </div>
              <div className="stat-label-muted">TOTAL POIN AKHIR (+BONUS)</div>
            </div>
            <div className="stat-box col-span-3">
              <div className="stat-value-giant" style={{ color: 'var(--neon-yellow)' }}>
                {resultData.validGames.length} / 12
              </div>
              <div className="stat-label-muted">ARCADE GAMES ({resultData.pointsFromGames} PT)</div>
            </div>
            <div className="stat-box col-span-3">
              <div className="stat-value-giant" style={{ color: 'var(--state-done)' }}>
                {resultData.validSyllabusBadges.length + resultData.validExtraBadges.length} Badges
              </div>
              <div className="stat-label-muted">SKILL BADGES ({resultData.pointsFromSkillBadges} PT)</div>
            </div>
            <div className="stat-box col-span-3">
              <div className="stat-value-giant" style={{ color: 'var(--neon-magenta)' }}>
                +{resultData.milestoneBonus} PT
              </div>
              <div className="stat-label-muted">BONUS MILESTONE</div>
            </div>
          </div>

          {/* Final Formula Breakdown */}
          <div
            style={{
              padding: '12px 16px',
              background: 'rgba(0, 240, 255, 0.06)',
              border: '1px solid var(--neon-cyan)',
              borderRadius: 'var(--radius-sm)',
              marginBottom: '16px',
              fontSize: '0.86rem',
              color: 'var(--text-primary)'
            }}
          >
            🧮 <strong>Rincian Perhitungan Akhir:</strong> {resultData.pointsFromGames} PT (Game) + {resultData.pointsFromSkillBadges} PT (Skill Badges) + {resultData.milestoneBonus} PT (Bonus {resultData.highestMilestone?.label || 'Milestone'}) {resultData.gearBonus ? `+ ${resultData.gearBonus} PT (Bonus Milestone GEAR)` : ''} = <strong>{resultData.totalPointsWithBonus} Poin Arcade</strong>
          </div>

          {/* Milestone Status & Gap */}
          <div
            style={{
              padding: '16px 20px',
              background: 'rgba(10, 10, 18, 0.7)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-sm)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
              <div>
                <span className="stat-label-muted">MILESTONE TERTINGGI: </span>
                <strong style={{ color: 'var(--neon-yellow)', fontSize: '1rem' }}>
                  {resultData.highestMilestone ? resultData.highestMilestone.label : 'Belum mencapai Milestone 1'}
                </strong>
              </div>

              {resultData.nextMilestoneNeeds && (
                <div style={{ fontSize: '0.88rem', color: 'var(--neon-cyan)' }}>
                  🎯 Target Berikutnya ({resultData.nextMilestoneNeeds.label}):{' '}
                  <strong>
                    Butuh {resultData.nextMilestoneNeeds.neededGames} Game + {resultData.nextMilestoneNeeds.neededBadges} Skill Badge lagi.
                  </strong>
                </div>
              )}
            </div>
          </div>

        </div>
      )}

      {/* Step 4: 2-Block Lab & Badges Checklist (Rendered directly on same page below summary) */}
      <LabChecklist scrapedData={resultData} />

    </div>
  )
}
