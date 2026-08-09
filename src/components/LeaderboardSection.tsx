import React, { useState, useEffect } from 'react'

interface Top10User {
  rank: number
  name: string
  points: number
  games: number
  badges: number
  milestone: string
}

export default function LeaderboardSection() {
  const [selectedDate, setSelectedDate] = useState('2026-08-09')
  const [snapshotDateLabel, setSnapshotDateLabel] = useState('9 Agustus 2026')
  const [top10Data, setTop10Data] = useState<Top10User[]>([
    { rank: 1, name: 'Budi Santoso', points: 96, games: 12, badges: 56, milestone: 'Ultimate Milestone' },
    { rank: 2, name: 'Siti Rahma', points: 92, games: 12, badges: 54, milestone: 'Ultimate Milestone' },
    { rank: 3, name: 'Ahmad Fauzi', points: 88, games: 12, badges: 50, milestone: 'Milestone 3' },
    { rank: 4, name: 'Dewi Lestari', points: 84, games: 10, badges: 48, milestone: 'Milestone 3' },
    { rank: 5, name: 'Rizky Pratama', points: 79, games: 10, badges: 44, milestone: 'Milestone 3' },
    { rank: 6, name: 'Nabila Putri', points: 75, games: 10, badges: 42, milestone: 'Milestone 3' },
    { rank: 7, name: 'Fikri Hidayat', points: 71, games: 8, badges: 40, milestone: 'Milestone 2' },
    { rank: 8, name: 'Anisa Wijaya', points: 68, games: 8, badges: 36, milestone: 'Milestone 2' },
    { rank: 9, name: 'Eko Prasetyo', points: 65, games: 8, badges: 34, milestone: 'Milestone 2' },
    { rank: 10, name: 'Maya Indah', points: 62, games: 8, badges: 30, milestone: 'Milestone 2' },
  ])

  // Private Rank Lookup states
  const [lookupUrl, setLookupUrl] = useState('')
  const [lookupLoading, setLookupLoading] = useState(false)
  const [lookupResult, setLookupResult] = useState<any | null>(null)
  const [lookupError, setLookupError] = useState('')

  // Admin CSV Modal states
  const [showAdminModal, setShowAdminModal] = useState(false)
  const [adminPassword, setAdminPassword] = useState('')
  const [csvText, setCsvText] = useState('')
  const [adminLoading, setAdminLoading] = useState(false)
  const [adminStatus, setAdminStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handlePrivateLookup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLookupError('')
    setLookupResult(null)

    if (!lookupUrl.trim()) return

    setLookupLoading(true)
    try {
      const res = await fetch(`/api/leaderboard?action=check_my_rank&profileUrl=${encodeURIComponent(lookupUrl)}`)
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Gagal mengecek peringkat.')

      setLookupResult(json)
    } catch (err: any) {
      setLookupError(err?.message || 'Terjadi kesalahan saat mengecek peringkat.')
    } finally {
      setLookupLoading(false)
    }
  }

  const handleCsvUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    setAdminStatus(null)

    setAdminLoading(true)
    try {
      const res = await fetch('/api/leaderboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'upload_csv',
          password: adminPassword,
          csvText
        })
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Gagal memproses CSV.')

      setAdminStatus({
        type: 'success',
        text: `✓ ${json.message} (${json.validParticipants} peserta valid terdaftar). Scraping otomatis telah dipicu!`
      })
      setCsvText('')
    } catch (err: any) {
      setAdminStatus({ type: 'error', text: err?.message || 'Terjadi kesalahan saat upload CSV.' })
    } finally {
      setAdminLoading(false)
    }
  }

  return (
    <div style={{ marginTop: '28px' }}>
      
      {/* Date-labeled Leaderboard Card */}
      <div className="bento-card col-span-12">
        <div className="card-header-flex" style={{ flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2 className="card-title-arcade">
              <span>🏆</span> TOP 10 · Update {snapshotDateLabel}
            </h2>
            <p style={{ margin: '4px 0 0 0' }}>
              Data peringkat resmi diperbarui mingguan. Papan peringkat publik hanya menampilkan TOP 10.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            {/* Archive Date Selector */}
            <select
              className="input-arcade"
              style={{ padding: '6px 12px', fontSize: '0.82rem', width: 'auto' }}
              value={selectedDate}
              onChange={(e) => {
                const val = e.target.value
                setSelectedDate(val)
                setSnapshotDateLabel(val === '2026-08-09' ? '9 Agustus 2026' : '2 Agustus 2026')
              }}
            >
              <option value="2026-08-09">Update 9 Agustus 2026</option>
              <option value="2026-08-02">Update 2 Agustus 2026</option>
            </select>

            <button
              onClick={() => setShowAdminModal(true)}
              className="btn-arcade btn-arcade-outline"
              style={{ padding: '6px 12px', fontSize: '0.78rem' }}
            >
              ⚙️ Admin Upload
            </button>
          </div>
        </div>

        {/* Top 10 Table ONLY */}
        <div className="arcade-table-wrapper" style={{ margin: '20px 0' }}>
          <table className="arcade-table">
            <thead>
              <tr>
                <th>RANK</th>
                <th>NAMA PESERTA</th>
                <th>POIN ARCADE</th>
                <th>GAMES</th>
                <th>SKILL BADGES</th>
                <th>MILESTONE</th>
              </tr>
            </thead>
            <tbody>
              {top10Data.map((user) => (
                <tr key={user.rank} className={user.rank <= 3 ? 'row-active-highlight' : ''}>
                  <td>
                    <span
                      className={`badge-tag ${
                        user.rank === 1
                          ? 'badge-tag-warning'
                          : user.rank === 2
                          ? 'badge-tag-done'
                          : user.rank === 3
                          ? 'badge-tag-excluded'
                          : 'badge-tag-pending'
                      }`}
                      style={{ fontFamily: 'var(--font-arcade)', fontSize: '0.75rem' }}
                    >
                      #{user.rank} {user.rank === 1 ? '👑' : user.rank === 2 ? '🥈' : user.rank === 3 ? '🥉' : ''}
                    </span>
                  </td>
                  <td style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{user.name}</td>
                  <td>
                    <strong style={{ color: 'var(--neon-cyan)', fontFamily: 'var(--font-arcade)', fontSize: '0.95rem' }}>
                      {user.points} PT
                    </strong>
                  </td>
                  <td>{user.games} Game</td>
                  <td>{user.badges} Badges</td>
                  <td>
                    <span className="badge-tag badge-tag-warning">{user.milestone}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Private Rank Lookup Box (STRICT PRIVACY - NO FULL 256 TABLE) */}
      <div className="bento-card col-span-12 bento-card-magenta" style={{ marginTop: '24px' }}>
        <h3 className="card-title-arcade" style={{ fontSize: '0.95rem', marginBottom: '8px', color: 'var(--neon-magenta)' }}>
          🔒 CEK PERINGKAT PRIBADI KAMU
        </h3>
        <p style={{ fontSize: '0.88rem', marginBottom: '16px' }}>
          Periksa posisi peringkat Anda saat ini di antara 256+ peserta secara privat tanpa membuka daftar peserta lain ke publik.
        </p>

        <form onSubmit={handlePrivateLookup} className="input-arcade-group" style={{ marginBottom: '12px' }}>
          <input
            type="url"
            className="input-arcade"
            placeholder="Masukkan URL Public Profile Google Skills Anda..."
            value={lookupUrl}
            onChange={(e) => setLookupUrl(e.target.value)}
            required
          />
          <button type="submit" className="btn-arcade btn-arcade-magenta" disabled={lookupLoading}>
            {lookupLoading ? 'MENGECEK...' : 'CEK PERINGKAT SAYA 🔍'}
          </button>
        </form>

        {lookupError && (
          <div className="badge-tag badge-tag-excluded" style={{ marginTop: '12px', padding: '8px 14px' }}>
            ❌ {lookupError}
          </div>
        )}

        {lookupResult && (
          <div
            style={{
              marginTop: '16px',
              padding: '16px 20px',
              background: 'rgba(10, 10, 18, 0.8)',
              border: '1px solid var(--neon-magenta)',
              borderRadius: 'var(--radius-sm)'
            }}
          >
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              👤 {lookupResult.name}
            </div>
            <div style={{ marginTop: '6px', fontSize: '1.1rem', color: 'var(--neon-yellow)' }}>
              Peringkat kamu: <strong>#{lookupResult.estimatedRank}</strong> dari {lookupResult.totalParticipants} peserta.
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Total Poin saat ini: {lookupResult.points} PT ({lookupResult.games} Game, {lookupResult.badges} Skill Badges).
            </div>
          </div>
        )}
      </div>

      {/* Admin CSV Upload Modal */}
      {showAdminModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(8px)',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
        >
          <div
            className="bento-card bento-card-large"
            style={{ width: '100%', maxWidth: '640px', background: 'var(--bg-card)' }}
          >
            <div className="card-header-flex" style={{ marginBottom: '14px' }}>
              <h3 className="card-title-arcade" style={{ color: 'var(--neon-cyan)' }}>
                ⚙️ PANEL ADMIN — UPLOAD CSV LEADERBOARD
              </h3>
              <button
                type="button"
                onClick={() => setShowAdminModal(false)}
                style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', fontSize: '1.2rem' }}
              >
                ✕
              </button>
            </div>

            <p style={{ fontSize: '0.84rem', marginBottom: '16px' }}>
              Upload file CSV penyelenggara. Sistem membaca header <strong>"Nama Peserta"</strong> dan <strong>"URL Profil Google Skills"</strong>. Email dan nomor HP tidak disimpan.
            </p>

            <form onSubmit={handleCsvUpload} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <input
                type="password"
                className="input-arcade"
                placeholder="Password Admin Fasilitator..."
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                required
              />

              <textarea
                className="input-arcade"
                rows={6}
                placeholder={`Nama Peserta,URL Profil Google Skills\n"Budi Santoso","https://www.skills.google/public_profiles/sample_1"`}
                value={csvText}
                onChange={(e) => setCsvText(e.target.value)}
                required
              />

              {adminStatus && (
                <div className={`badge-tag ${adminStatus.type === 'success' ? 'badge-tag-done' : 'badge-tag-excluded'}`} style={{ padding: '10px 14px' }}>
                  {adminStatus.text}
                </div>
              )}

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  className="btn-arcade btn-arcade-outline"
                  onClick={() => setShowAdminModal(false)}
                >
                  Batal
                </button>
                <button type="submit" className="btn-arcade btn-arcade-primary" disabled={adminLoading}>
                  {adminLoading ? 'MEMPROSES...' : 'UPLOAD & SCRAPE SEKARANG 🚀'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}
