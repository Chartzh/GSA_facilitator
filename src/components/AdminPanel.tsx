import React, { useState, useRef } from 'react'

interface AdminPanelProps {
  onClose: () => void
  onScrapeFinished?: () => void
}

export default function AdminPanel({ onClose, onScrapeFinished }: AdminPanelProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [passwordInput, setPasswordInput] = useState('')
  const [loginError, setLoginError] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)

  // CSV State
  const [csvText, setCsvText] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadLoading, setUploadLoading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<any | null>(null)

  // Scraping loop state
  const [scrapeState, setScrapeState] = useState<{
    isRunning: boolean;
    isPaused: boolean;
    offset: number;
    total: number;
    succeeded: number;
    failed: number;
    jobId: number | string | null;
    errors: Array<{ nama: string; reason: string }>;
  }>({
    isRunning: false,
    isPaused: false,
    offset: 0,
    total: 0,
    succeeded: 0,
    failed: 0,
    jobId: null,
    errors: []
  })

  const cancelRef = useRef(false)

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
    cancelRef.current = false

    const isResuming = scrapeState.isPaused && scrapeState.offset > 0
    let currentOffset: number | null = isResuming ? scrapeState.offset : 0
    let currentJobId: number | string | undefined = scrapeState.jobId || undefined
    let currentSucceeded = isResuming ? scrapeState.succeeded : 0
    let currentFailed = isResuming ? scrapeState.failed : 0
    const accumulatedErrors = isResuming ? [...scrapeState.errors] : []

    setScrapeState(prev => ({
      ...prev,
      isRunning: true,
      isPaused: false,
      offset: currentOffset || 0,
      succeeded: currentSucceeded,
      failed: currentFailed,
      errors: accumulatedErrors
    }))

    try {
      while (currentOffset !== null && !cancelRef.current) {
        const chunkRes: Response = await fetch('/api/admin/scrape-chunk', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            password: passwordInput,
            jobId: currentJobId,
            offset: currentOffset,
            limit: 20
          })
        })

        if (!chunkRes.ok) {
          const errJson: any = await chunkRes.json()
          throw new Error(errJson.error || `Potongan gagal pada offset ${currentOffset}`)
        }

        const chunkData: any = await chunkRes.json()
        currentJobId = chunkData.jobId
        currentSucceeded += chunkData.succeeded
        currentFailed += chunkData.failed
        accumulatedErrors.push(...(chunkData.errors || []))

        const nextOff: number | null = chunkData.nextOffset

        setScrapeState({
          isRunning: nextOff !== null && !cancelRef.current,
          isPaused: cancelRef.current && nextOff !== null,
          offset: nextOff !== null ? nextOff : chunkData.totalParticipants,
          total: chunkData.totalParticipants,
          succeeded: currentSucceeded,
          failed: currentFailed,
          jobId: currentJobId || null,
          errors: accumulatedErrors
        })

        currentOffset = nextOff

        if (currentOffset === null) {
          onScrapeFinished?.()
        } else if (!cancelRef.current) {
          // Polite 1-second delay between chunks
          await new Promise(r => setTimeout(r, 1000))
        }
      }
    } catch (err: any) {
      alert(err?.message || 'Terjadi kesalahan saat scraping.')
      setScrapeState(prev => ({ ...prev, isRunning: false }))
    }
  }

  const handleStopScrape = () => {
    cancelRef.current = true
    setScrapeState(prev => ({ ...prev, isRunning: false, isPaused: true }))
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

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
                {!scrapeState.isRunning ? (
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      type="button"
                      onClick={() => handleRunScrape()}
                      className="btn-arcade btn-arcade-outline"
                      style={{ fontSize: '0.8rem' }}
                    >
                      {scrapeState.isPaused && scrapeState.offset > 0 ? '▶️ Lanjutkan dari Offset ' + scrapeState.offset : '⚡ Jalankan Scraping Sekarang'}
                    </button>
                    {scrapeState.isPaused && scrapeState.offset > 0 && (
                      <button
                        type="button"
                        onClick={() => {
                          setScrapeState(prev => ({ ...prev, offset: 0, succeeded: 0, failed: 0, errors: [], isPaused: false }))
                          setTimeout(() => handleRunScrape(), 50)
                        }}
                        className="btn-arcade btn-arcade-outline"
                        style={{ fontSize: '0.8rem', opacity: 0.8 }}
                      >
                        🔄 Ulangi Dari Awal (Offset 0)
                      </button>
                    )}
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleStopScrape}
                    className="btn-arcade btn-arcade-outline"
                    style={{ fontSize: '0.8rem', borderColor: 'var(--neon-magenta)', color: 'var(--neon-magenta)' }}
                  >
                    ⏹ Hentikan Scraping
                  </button>
                )}

                <button type="submit" className="btn-arcade btn-arcade-primary" disabled={uploadLoading || scrapeState.isRunning}>
                  {uploadLoading ? 'MEMPROSES...' : 'PROSES CSV 🚀'}
                </button>
              </div>
            </form>

            {/* SCRAPING PROGRESS SECTION */}
            {(scrapeState.isRunning || scrapeState.offset > 0) && (
              <div
                style={{
                  padding: '16px',
                  background: 'rgba(0, 240, 255, 0.05)',
                  border: '1px solid var(--neon-cyan)',
                  borderRadius: 'var(--radius-sm)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <strong style={{ color: 'var(--neon-cyan)', fontSize: '0.9rem' }}>
                    ⚡ PROGRESS SCRAPING LEADERBOARD
                  </strong>
                  {scrapeState.isRunning && (
                    <button
                      type="button"
                      onClick={handleStopScrape}
                      className="btn-arcade btn-arcade-outline"
                      style={{ padding: '4px 12px', fontSize: '0.78rem', borderColor: 'var(--neon-magenta)', color: 'var(--neon-magenta)' }}
                    >
                      ⏹ Hentikan
                    </button>
                  )}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', marginBottom: '6px' }}>
                  <span>Memproses <strong>{Math.min(scrapeState.offset, scrapeState.total)}</strong> / <strong>{scrapeState.total}</strong> peserta</span>
                  <strong style={{ color: 'var(--neon-yellow)' }}>
                    {Math.round((Math.min(scrapeState.offset, scrapeState.total) / (scrapeState.total || 1)) * 100)}%
                  </strong>
                </div>

                {/* Progress Bar */}
                <div style={{ width: '100%', height: '12px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '6px', overflow: 'hidden', marginBottom: '10px' }}>
                  <div
                    style={{
                      width: `${Math.min(100, Math.round((Math.min(scrapeState.offset, scrapeState.total) / (scrapeState.total || 1)) * 100))}%`,
                      height: '100%',
                      background: 'linear-gradient(90deg, var(--neon-cyan), var(--state-done))',
                      transition: 'width 0.3s ease'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '16px', fontSize: '0.82rem', flexWrap: 'wrap' }}>
                  <span style={{ color: 'var(--state-done)' }}>✓ Tersimpan hari ini: <strong>{scrapeState.succeeded} / {scrapeState.total || 256}</strong></span>
                  <span style={{ color: 'var(--neon-magenta)' }}>✕ Gagal: <strong>{scrapeState.failed}</strong></span>
                </div>

                {/* Failed Participants Log */}
                {scrapeState.errors.length > 0 && (
                  <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid rgba(255, 255, 255, 0.1)', fontSize: '0.8rem' }}>
                    <strong style={{ color: 'var(--neon-magenta)' }}>⚠️ Daftar Peserta Gagal ({scrapeState.errors.length}):</strong>
                    <ul style={{ maxHeight: '120px', overflowY: 'auto', marginTop: '4px', paddingLeft: '20px', color: 'var(--text-muted)' }}>
                      {scrapeState.errors.map((err, idx) => (
                        <li key={idx}>
                          <strong>{err.nama}</strong> — {err.reason}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

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

          </div>
        )}
      </div>
    </div>
  )
}
