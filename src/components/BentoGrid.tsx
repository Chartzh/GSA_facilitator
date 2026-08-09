import React, { useState, useEffect } from 'react'
import PointsCalculator from './PointsCalculator'
import { TOTALS, PROGRAM } from '../config/program'
import { ParsedProfileResult } from '../utils/scraper'

interface BentoGridProps {
  onProfileCalculated?: (data: ParsedProfileResult) => void
}

export default function BentoGrid({ onProfileCalculated }: BentoGridProps) {
  // Countdown Timer state to Sept 14, 2026 23:59:59 WIB
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const targetDate = new Date(PROGRAM.endDate).getTime()

    const interval = setInterval(() => {
      const now = new Date().getTime()
      const diff = targetDate - now

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        clearInterval(interval)
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24))
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((diff % (1000 * 60)) / 1000)
        setTimeLeft({ days, hours, minutes, seconds })
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="bento-grid" id="home">
      
      {/* 1. Large Card: Points Calculator */}
      <PointsCalculator onProfileScraped={onProfileCalculated} />

      {/* 2. Medium Card: Weekly Challenge Highlight */}
      <div className="bento-card col-span-6 bento-card-highlight" id="weekly-challenge">
        <div className="card-header-flex">
          <h3 className="card-title-arcade" style={{ color: 'var(--neon-yellow)' }}>
            🔥 WEEKLY CHALLENGE IS LIVE
          </h3>
          <span className="badge-tag badge-tag-warning">MINGGU KE-4</span>
        </div>

        <p style={{ marginBottom: '16px' }}>
          Setiap minggu, kumpulkan skill badge sebanyak-banyaknya dan rebut total hadiah mingguan <strong>800K – 2JT</strong>!
        </p>

        <div style={{ padding: '12px 16px', background: 'rgba(10, 10, 18, 0.7)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', marginBottom: '16px' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--neon-cyan)' }}>
            🎁 Total Hadiah Minggu Ini: <strong>Top 4 Winners</strong>
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Penilaian berdasarkan penambahan skill badge terbanyak dalam periode 15 - 21 Agustus.
          </div>
        </div>

        <a href="#weekly-challenge-detail" className="btn-arcade btn-arcade-primary" style={{ width: '100%' }}>
          LIHAT ATURAN WEEKLY CHALLENGE ➔
        </a>
      </div>

      {/* 3. Medium Card: Top 10 Leaderboard Preview */}
      <div className="bento-card col-span-6">
        <div className="card-header-flex">
          <h3 className="card-title-arcade">
            🏆 LEADERBOARD PREVIEW
          </h3>
          <a href="#leaderboard" style={{ fontSize: '0.8rem', color: 'var(--neon-cyan)', textDecoration: 'none' }}>
            Lihat Semua ➔
          </a>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', margin: '14px 0' }}>
          <div style={{ display: 'flex', justifySelf: 'space-between', justifyContent: 'space-between', padding: '10px 14px', background: 'rgba(255, 214, 0, 0.08)', border: '1px solid var(--neon-yellow)', borderRadius: 'var(--radius-sm)' }}>
            <span>🥇 1. Budi Santoso</span>
            <strong style={{ color: 'var(--neon-yellow)' }}>96 PT</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: 'rgba(0, 240, 255, 0.08)', border: '1px solid var(--neon-cyan)', borderRadius: 'var(--radius-sm)' }}>
            <span>🥈 2. Siti Rahma</span>
            <strong style={{ color: 'var(--neon-cyan)' }}>92 PT</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: 'rgba(255, 46, 151, 0.08)', border: '1px solid var(--neon-magenta)', borderRadius: 'var(--radius-sm)' }}>
            <span>🥉 3. Ahmad Fauzi</span>
            <strong style={{ color: 'var(--neon-magenta)' }}>88 PT</strong>
          </div>
        </div>
      </div>

      {/* 4. Small Card: Countdown Timer */}
      <div className="bento-card col-span-4">
        <h3 className="card-title-arcade" style={{ fontSize: '0.78rem', marginBottom: '12px' }}>
          ⏳ SISA WAKTU PROGRAM
        </h3>

        <div style={{ display: 'flex', justifyContent: 'space-between', textAlign: 'center' }}>
          <div>
            <div className="stat-value-giant" style={{ fontSize: '1.4rem' }}>{timeLeft.days}</div>
            <div className="stat-label-muted">HARI</div>
          </div>
          <div>
            <div className="stat-value-giant" style={{ fontSize: '1.4rem' }}>{timeLeft.hours}</div>
            <div className="stat-label-muted">JAM</div>
          </div>
          <div>
            <div className="stat-value-giant" style={{ fontSize: '1.4rem' }}>{timeLeft.minutes}</div>
            <div className="stat-label-muted">MENIT</div>
          </div>
          <div>
            <div className="stat-value-giant" style={{ fontSize: '1.4rem', color: 'var(--neon-magenta)' }}>{timeLeft.seconds}</div>
            <div className="stat-label-muted">DETIK</div>
          </div>
        </div>
      </div>

      {/* 5. Small Card: Program Stats */}
      <div className="bento-card col-span-4">
        <h3 className="card-title-arcade" style={{ fontSize: '0.78rem', marginBottom: '12px' }}>
          📊 STATISTIK PROGRAM
        </h3>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
          <div className="stat-box" style={{ flex: 1, padding: '10px 6px' }}>
            <div className="stat-value-giant" style={{ fontSize: '1.2rem' }}>{TOTALS.skillBadges}</div>
            <div className="stat-label-muted" style={{ fontSize: '0.65rem' }}>BADGES</div>
          </div>
          <div className="stat-box" style={{ flex: 1, padding: '10px 6px' }}>
            <div className="stat-value-giant" style={{ fontSize: '1.2rem', color: 'var(--neon-yellow)' }}>{TOTALS.totalLabs}</div>
            <div className="stat-label-muted" style={{ fontSize: '0.65rem' }}>LABS</div>
          </div>
          <div className="stat-box" style={{ flex: 1, padding: '10px 6px' }}>
            <div className="stat-value-giant" style={{ fontSize: '1.2rem', color: 'var(--state-done)' }}>{TOTALS.gamesAvailable}</div>
            <div className="stat-label-muted" style={{ fontSize: '0.65rem' }}>GAMES</div>
          </div>
        </div>
      </div>

      {/* 6. Small Card: WhatsApp Group CTA */}
      <div className="bento-card col-span-4" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <h3 className="card-title-arcade" style={{ fontSize: '0.78rem', marginBottom: '8px', color: 'var(--state-done)' }}>
            💬 GRUP WHATSAPP FASILITATOR
          </h3>
          <p style={{ fontSize: '0.82rem' }}>
            Bergabung dengan 660+ anggota WhatsApp Kak Rajif untuk diskusi eror & info program.
          </p>
        </div>

        <a
          href="https://chat.whatsapp.com/IEDhYSI9EpYDI9LEdT95h1"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-arcade btn-arcade-primary"
          style={{ marginTop: '12px', background: 'var(--state-done)', color: '#000' }}
        >
          GABUNG GRUP WA 💬
        </a>
      </div>

    </section>
  )
}
