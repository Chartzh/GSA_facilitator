import React, { useState } from 'react'

interface AdminPanelProps {
  onClose: () => void
}

export default function AdminPanel({ onClose }: AdminPanelProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [passwordInput, setPasswordInput] = useState('')
  const [loginError, setLoginError] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)

  // CSV State
  const [csvText, setCsvText] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadLoading, setUploadLoading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<any | null>(null)

  // Scraping trigger state
  const [scrapeLoading, setScrapeLoading] = useState(false)
  const [scrapeStatus, setScrapeStatus] = useState<any | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')
    setLoginLoading(true)

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passwordInput })
      })

      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Login gagal.')

      setIsAuthenticated(true)
    } catch (err: any) {
      setLoginError(err?.message || 'Password admin salah.')
    } finally {
      setLoginLoading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onload = (event) => {
        const text = event.target?.result as string
        if (text) setCsvText(text)
      }
      reader.readAsText(file)
    }
  }

  const handleUploadCsv = async (e: React.FormEvent) => {
    e.preventDefault()
    setUploadStatus(null)

    if (!csvText.trim()) {
      alert('Isi CSV kosong. Silakan pilih file .csv atau tempel teks CSV.')
      return
    }

    setUploadLoading(true)
    try {
      const res = await fetch('/api/admin/upload-csv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          password: passwordInput,
          csvText
        })
      })

      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Gagal mengunggah CSV.')

      setUploadStatus(json)
    } catch (err: any) {
      setUploadStatus({ error: err?.message || 'Terjadi kesalahan saat upload CSV.' })
    } finally {
      setUploadLoading(false)
    }
  }

  const handleRunScrape = async () => {
    setScrapeStatus(null)
    setScrapeLoading(true)
    try {
      const res = await fetch('/api/cron-leaderboard', {
        headers: { 'Authorization': `Bearer ${passwordInput}` }
      })
      const json = await res.json()
      setScrapeStatus(json)
    } catch (err: any) {
      setScrapeStatus({ error: 'Gagal menjalankan scraping.' })
    } finally {
      setScrapeLoading(false)
    }
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0, 0, 0, 0.88)',
        backdropFilter: 'blur(8px)',
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
    >
      {/* NOINDEX META FOR SECURITY */}
      <meta name="robots" content="noindex, nofollow" />

      <div
        className="bento-card bento-card-large"
        style={{ width: '100%', maxWidth: '680px', maxHeight: '90vh', overflowY: 'auto', background: 'var(--bg-card)' }}
      >
        <div className="card-header-flex" style={{ marginBottom: '16px' }}>
          <h3 className="card-title-arcade" style={{ color: 'var(--neon-cyan)', fontSize: '1rem' }}>
            ⚙️ PANEL ADMIN — LEADERBOARD GSA 2026
          </h3>
          <button
            type="button"
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', fontSize: '1.4rem' }}
          >
            ✕
          </button>
        </div>

        {!isAuthenticated ? (
          /* LOGIN FORM */
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <p style={{ fontSize: '0.88rem' }}>
              Masukkan password admin untuk mengakses pengunggahan CSV dan manajemen leaderboard.
            </p>

            <input
              type="password"
              className="input-arcade"
              placeholder="Masukkan Password Admin..."
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              required
              autoFocus
            />

            {loginError && (
              <div className="badge-tag badge-tag-excluded" style={{ width: '100%', padding: '10px 14px' }}>
                ❌ {loginError}
              </div>
            )}

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '10px' }}>
              <button type="button" className="btn-arcade btn-arcade-outline" onClick={onClose}>
                Batal
              </button>
              <button type="submit" className="btn-arcade btn-arcade-primary" disabled={loginLoading}>
                {loginLoading ? 'MEMERIKSA...' : 'MASUK ADMIN ➔'}
              </button>
            </div>
          </form>
        ) : (
          /* AUTHENTICATED ADMIN PANEL */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Database Notice */}
            {uploadStatus?.dbUsed === false ? (
              <div
                style={{
                  padding: '12px 16px',
                  background: 'rgba(255, 46, 151, 0.1)',
                  border: '1px solid var(--neon-magenta)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.84rem',
                  color: 'var(--neon-magenta)'
                }}
              >
                ⚠️ Database belum terhubung. Cek SETUP.md.
              </div>
            ) : (
              <div
                style={{
                  padding: '12px 16px',
                  background: 'rgba(0, 240, 255, 0.08)',
                  border: '1px solid var(--neon-cyan)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.84rem'
                }}
              >
                ✅ Authenticated sebagai Admin. Data CSV diparsing di memori; hanya <strong>Nama Peserta</strong> dan <strong>URL Profil</strong> yang disimpan.
              </div>
            )}

            {/* CSV UPLOAD & PASTE FORM */}
            <form onSubmit={handleUploadCsv} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <h4 style={{ color: 'var(--neon-yellow)', fontSize: '0.92rem' }}>
                📁 UPLOAD ATAU PASTE CSV PESERTA
              </h4>

              {/* File Input Option */}
              <div>
                <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                  Pilihan 1: Unggah File .CSV
                </label>
                <input
                  type="file"
                  accept=".csv,text/csv"
                  onChange={handleFileChange}
                  className="input-arcade"
                  style={{ padding: '8px' }}
                />
              </div>

              {/* Textarea Paste Option */}
              <div>
                <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                  Pilihan 2: Tempel Teks CSV
                </label>
                <textarea
                  className="input-arcade"
                  rows={5}
                  placeholder={`Nama Peserta,URL Profil Google Skills,Email Peserta,Nomor HP\n"Budi Santoso","https://www.skills.google/public_profiles/sample_1","budi@gmail.com","08123"`}
                  value={csvText}
                  onChange={(e) => setCsvText(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'space-between', alignItems: 'center' }}>
                <button
                  type="button"
                  onClick={handleRunScrape}
                  className="btn-arcade btn-arcade-outline"
                  disabled={scrapeLoading}
                  style={{ fontSize: '0.8rem' }}
                >
                  {scrapeLoading ? 'MEMPROSES SCRAPING...' : '⚡ Jalankan Scraping Sekarang'}
                </button>

                <button type="submit" className="btn-arcade btn-arcade-primary" disabled={uploadLoading}>
                  {uploadLoading ? 'MEMPROSES...' : 'PROSES CSV 🚀'}
                </button>
              </div>
            </form>

            {/* Upload Status Details */}
            {uploadStatus && (
              <div
                style={{
                  padding: '14px',
                  background: uploadStatus.error ? 'rgba(255, 46, 151, 0.1)' : 'rgba(0, 255, 157, 0.1)',
                  border: uploadStatus.error ? '1px solid var(--neon-magenta)' : '1px solid var(--state-done)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.85rem'
                }}
              >
                {uploadStatus.error ? (
                  <div style={{ color: 'var(--neon-magenta)' }}>❌ {uploadStatus.error}</div>
                ) : (
                  <div>
                    <strong style={{ color: 'var(--state-done)' }}>✓ {uploadStatus.message}</strong>
                    <div style={{ marginTop: '6px' }}>
                      • Peserta Valid Disimpan: <strong>{uploadStatus.validParticipantsCount}</strong> dari {uploadStatus.totalRowsProcessed} baris.
                    </div>
                    {uploadStatus.skippedRowsCount > 0 && (
                      <div style={{ marginTop: '4px', color: 'var(--neon-yellow)' }}>
                        • Baris Dibiarkan ({uploadStatus.skippedRowsCount} baris): Formats/URL tidak valid di-skip otomatis.
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Scrape Trigger Status */}
            {scrapeStatus && (
              <div
                style={{
                  padding: '12px',
                  background: 'rgba(255, 214, 0, 0.1)',
                  border: '1px solid var(--neon-yellow)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.84rem'
                }}
              >
                ⚡ Status Scraping: Batch selesai ({scrapeStatus.successCount || 0} profil berhasil diproses).
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  )
}
