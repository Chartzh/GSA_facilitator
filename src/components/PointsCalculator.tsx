import React, { useState, useEffect } from 'react'
import { validateProfileUrl, parseProfileHtml, ParsedProfileResult } from '../utils/scraper'
import { formatPoints } from '../utils/points'
import LabChecklist from './LabChecklist'
import { LogOut, RotateCw } from 'lucide-react'

// Simple 10-minute client cache per profile URL
const profileCache = new Map<string, { timestamp: number; data: ParsedProfileResult }>()
const CACHE_TTL_MS = 10 * 60 * 1000 // 10 minutes

// Rate limit helper: max 20 requests per minute
let requestTimestamps: number[] = []
const MAX_REQ_PER_MIN = 20

export default function PointsCalculator() {
  const [inputUrl, setInputUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [toastMsg, setToastMsg] = useState('')
  const [resultData, setResultData] = useState<ParsedProfileResult | null>(null)

  const handleLogout = () => {
    setResultData(null)
    profileCache.clear()
    try {
      localStorage.removeItem('gsa_calc_data')
    } catch {
      // Ignore localStorage errors
    }
  }

  const handleRefreshProfile = async () => {
    if (!resultData || refreshing) return
    const cleanUrl = resultData.profileUrl
    setRefreshing(true)
    setToastMsg('')
    setErrorMsg('')

    try {
      const now = Date.now()
      profileCache.delete(cleanUrl)
      const res = await fetch(`/api/check-profile?profileUrl=${encodeURIComponent(cleanUrl)}&_t=${now}&force=true`)
      const json = await res.json().catch(() => null)

      if (res.ok && json && !json.error) {
        profileCache.set(cleanUrl, { timestamp: now, data: json })
        setResultData(json)
        saveToStorage(cleanUrl, json)
        setToastMsg('Data profil berhasil diperbarui!')
        setTimeout(() => setToastMsg(''), 4000)
      } else {
        throw new Error(json?.error || 'Gagal memperbarui profil. Pastikan profil di-set Public.')
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'Gagal memperbarui profil. Coba lagi nanti.')
      setTimeout(() => setErrorMsg(''), 4000)
    } finally {
      setRefreshing(false)
    }
  }

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
      const res = await fetch(`/api/check-profile?profileUrl=${encodeURIComponent(cleanUrl)}&_t=${now}`)
      const json = await res.json().catch(() => null)

      if (res.ok && json && !json.error) {
        profileCache.set(cleanUrl, { timestamp: Date.now(), data: json })
        setResultData(json)
        saveToStorage(cleanUrl, json)
      } else {
        throw new Error(json?.error || 'Gagal membaca profil. Pastikan profil di-set Public.')
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
      
      {/* Step 1: Input Form Card (Only shown when NO profile result is active) */}
      {!resultData && (
        <div 
          className="bento-card" 
          style={{ 
            maxWidth: '520px', 
            margin: '40px auto', 
            padding: '36px 32px', 
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <h2 style={{ fontFamily: 'var(--font-arcade)', fontSize: '1.35rem', color: 'var(--text-primary)', marginBottom: '6px', letterSpacing: '0.04em' }}>
            KALKULATOR ARCADE
          </h2>

          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '20px' }}>
            GOOGLE CLOUD SKILLS BOOST
          </div>

          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '28px', maxWidth: '420px' }}>
            Cukup masukkan URL profil Google Cloud Skills Boost Anda yang sudah disetel ke <strong>Publik</strong>. Nama diambil otomatis dari profil.
          </p>

          {/* Input Form */}
          <form onSubmit={handleCheckProfile} style={{ width: '100%', textAlign: 'left' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
              URL PROFIL SKILLS BOOST
            </label>

            <input
              type="url"
              className="input-arcade"
              placeholder="https://www.skills.google/public_profiles/YOUR_ID"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              required
              style={{ width: '100%', marginBottom: '16px', padding: '12px 14px', fontSize: '0.85rem' }}
            />

            <button
              type="submit"
              className="btn-arcade btn-arcade-primary"
              disabled={loading}
              style={{ width: '100%', padding: '14px', fontSize: '0.9rem', fontWeight: 800, background: 'var(--neon-yellow)', color: '#000', borderColor: 'var(--neon-yellow)' }}
            >
              {loading ? 'MEMPROSES PROFIL...' : 'ENTER THE ARCADE'}
            </button>
          </form>

          {/* Error Message */}
          {errorMsg && (
            <div
              className="badge-tag badge-tag-excluded"
              style={{ padding: '12px 16px', width: '100%', marginTop: '16px', lineHeight: '1.5', textAlign: 'center' }}
            >
              {errorMsg}
            </div>
          )}
        </div>
      )}

      {/* Step 2: Dashboard Result & Tracker (Shown when profile is loaded) */}
      {resultData && (
        <div className="bento-card col-span-12 bento-card-highlight">
          
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

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              {resultData.currentTier && (
                <span className="badge-tag badge-tag-warning" style={{ fontSize: '0.88rem', padding: '6px 14px' }}>
                  🏆 {resultData.currentTier.label} ({resultData.totalPointsWithBonus} Poin)
                </span>
              )}

              <button 
                className="btn-arcade btn-arcade-outline" 
                onClick={handleRefreshProfile} 
                disabled={refreshing}
                style={{ padding: '6px 14px', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--neon-cyan)', borderColor: 'var(--neon-cyan)', cursor: refreshing ? 'not-allowed' : 'pointer' }}
              >
                <RotateCw size={14} className={refreshing ? 'spin-icon' : ''} /> {refreshing ? 'Memperbarui...' : 'Perbarui Data'}
              </button>

              <button 
                className="btn-arcade btn-arcade-outline" 
                onClick={handleLogout} 
                style={{ padding: '6px 14px', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--neon-magenta)', borderColor: 'var(--neon-magenta)' }}
              >
                <LogOut size={14} /> Keluar
              </button>
            </div>
          </div>

          {/* Toast Message */}
          {toastMsg && (
            <div
              style={{
                marginTop: '12px',
                padding: '10px 16px',
                fontSize: '0.85rem',
                fontWeight: 600,
                borderRadius: '8px',
                background: 'rgba(0, 255, 157, 0.12)',
                color: 'var(--state-done)',
                border: '1px solid var(--state-done)',
                display: 'inline-block'
              }}
            >
              ✓ {toastMsg}
            </div>
          )}

          {/* Giant Stat Numbers */}
          <div className="bento-grid" style={{ margin: '20px 0', gap: '16px' }}>
            <div className="stat-box col-span-3">
              <div className="stat-value-giant" style={{ fontSize: '2.2rem', color: 'var(--neon-cyan)' }}>
                {formatPoints(resultData.totalPointsWithBonus)}
              </div>
              <div className="stat-label-muted">TOTAL POIN AKHIR</div>
            </div>
            <div className="stat-box col-span-3">
              <div className="stat-value-giant" style={{ color: 'var(--neon-yellow)' }}>
                {resultData.validGames.length}
              </div>
              <div className="stat-label-muted">{resultData.validGames.length} Game ({formatPoints(resultData.pointsFromGames)} PT)</div>
            </div>
            <div className="stat-box col-span-3">
              <div className="stat-value-giant" style={{ color: 'var(--state-done)' }}>
                {formatPoints(resultData.pointsFromSkillBadges)}
              </div>
              <div className="stat-label-muted">{resultData.validSyllabusBadges.length + resultData.validExtraBadges.length} Badge ({formatPoints(resultData.pointsFromSkillBadges)} PT)</div>
            </div>
            <div className="stat-box col-span-3">
              <div className="stat-value-giant" style={{ color: 'var(--neon-magenta)' }}>
                +{resultData.milestoneBonus}
              </div>
              <div className="stat-label-muted">BONUS {resultData.highestMilestone?.label || 'MILESTONE'}</div>
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
            🧮 <strong>Rincian Poin:</strong> {resultData.validGames.length} Game ({formatPoints(resultData.pointsFromGames)}) + {resultData.validSyllabusBadges.length + resultData.validExtraBadges.length} Badge ({formatPoints(resultData.pointsFromSkillBadges)}) + Bonus {resultData.highestMilestone?.label || 'Milestone'} (+{resultData.milestoneBonus}) {resultData.gearBonus ? `+ Bonus GEAR (+${resultData.gearBonus})` : ''} = <strong>{formatPoints(resultData.totalPointsWithBonus)} Total Poin</strong>
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

      {/* Step 4: 2-Block Lab & Badges Checklist (Only rendered when profile is loaded) */}
      {resultData && <LabChecklist scrapedData={resultData} />}

    </div>
  )
}
