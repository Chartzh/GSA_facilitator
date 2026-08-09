import React, { useState, useEffect } from 'react'
import AdminPanel from './AdminPanel'

interface Top10User {
  rank: number
  name: string
  points: number
  games: number
  badges: number
}

export default function LeaderboardSection() {
  const [selectedDate, setSelectedDate] = useState('2026-08-09')
  const [snapshotDateLabel, setSnapshotDateLabel] = useState('9 Agustus 2026')
  const [top10Data, setTop10Data] = useState<Top10User[]>([])
  const [dbReady, setDbReady] = useState<boolean>(true)
  const [loading, setLoading] = useState(true)

  // Private Rank Lookup states
  const [lookupUrl, setLookupUrl] = useState('')
  const [lookupLoading, setLookupLoading] = useState(false)
  const [lookupResult, setLookupResult] = useState<any | null>(null)
  const [lookupError, setLookupError] = useState('')

  // Admin Modal toggle state
  const [showAdminModal, setShowAdminModal] = useState(false)

  // Fetch Top 10 from Server
  useEffect(() => {
    let isMounted = true
    setLoading(true)
    fetch(`/api/leaderboard?action=get_top10&date=${selectedDate}`)
      .then(res => res.json())
      .then(data => {
        if (isMounted) {
          setTop10Data(data.top10 || [])
          setDbReady(Boolean(data.dbReady))
          if (data.lastUpdated) setSnapshotDateLabel(data.lastUpdated)
        }
      })
      .catch(err => {
        console.warn('Leaderboard fetch error:', err)
        if (isMounted) setTop10Data([])
      })
      .finally(() => {
        if (isMounted) setLoading(false)
      })
    return () => { isMounted = false }
  }, [selectedDate])

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

  return (
    <div style={{ marginTop: '28px' }}>
      
      {/* Date-labeled Leaderboard Card */}
      <div className="bento-card col-span-12">
        <div className="card-header-flex" style={{ flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2 className="card-title-arcade">
              <span>🏆</span> TOP 10 — {snapshotDateLabel}
            </h2>
            <p style={{ margin: '4px 0 0 0' }}>
              Data peringkat resmi diperbarui mingguan. Papan peringkat publik hanya menampilkan TOP 10.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <select
              className="input-arcade"
              style={{ padding: '6px 12px', fontSize: '0.82rem', width: 'auto' }}
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            >
              <option value="2026-08-09">Update 9 Agustus 2026</option>
              <option value="2026-08-02">Update 2 Agustus 2026</option>
            </select>

            <button
              onClick={() => setShowAdminModal(true)}
              className="btn-arcade btn-arcade-outline"
              style={{ padding: '6px 12px', fontSize: '0.78rem' }}
            >
              ⚙️ Area Admin
            </button>
          </div>
        </div>

        {/* Top 10 Table or Empty State */}
        <div className="arcade-table-wrapper" style={{ margin: '20px 0' }}>
          {loading ? (
            <div style={{ padding: '30px', textAlign: 'center', color: 'var(--text-muted)' }}>
              Memuat data Top 10...
            </div>
          ) : top10Data.length === 0 ? (
            <div style={{ padding: '36px 20px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Leaderboard belum tersedia. Data akan muncul setelah scraping pertama dijalankan.
            </div>
          ) : (
            <table className="arcade-table">
              <thead>
                <tr>
                  <th>RANK</th>
                  <th>NAMA PESERTA</th>
                  <th>POIN ARCADE</th>
                  <th>GAMES</th>
                  <th>SKILL BADGES</th>
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
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Private Rank Lookup Box (STRICT PRIVACY - ONLY RETURNS SINGLE RANK NUMBER) */}
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
              Peringkat kamu: <strong>#{lookupResult.rank}</strong> dari {lookupResult.totalParticipants} peserta.
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Total Poin saat ini: {lookupResult.points} PT ({lookupResult.games} Game, {lookupResult.badges} Skill Badges).
            </div>
          </div>
        )}
      </div>

      {/* Admin Panel Modal */}
      {showAdminModal && <AdminPanel onClose={() => setShowAdminModal(false)} />}

    </div>
  )
}
