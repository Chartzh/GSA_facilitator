import React, { useState, useEffect, useRef } from 'react'
import faqData from './faqData.json'
import PointsCalculator from './components/PointsCalculator'
import LeaderboardSection from './components/LeaderboardSection'
import {
  Sparkles,
  Calculator,
  Award,
  MessageSquare,
  Share2,
  Users,
  CheckCircle,
  Moon,
  Sun,
  ArrowRight,
  Info,
  HelpCircle,
  Send,
  Heart,
  Search,
  Copy,
  Laptop,
  Check,
  Calendar,
  Volume2,
  AlertTriangle,
  ChevronDown,
  Menu,
  X,
  Target,
  Flame,
  Trophy
} from 'lucide-react'

// Custom inline SVG icons for social platforms
const Instagram = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
)

const Linkedin = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
)

const Github = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
)

// Configuration
const CONFIG = {
  FACIL_NAME: "Muhammad Rajif Raditya",
  REFERRAL_CODE: "GCAF26-ID-UAQ-MFC",
  WA_LINK: "https://chat.whatsapp.com/IEDhYSI9EpYDI9LEdT95h1",
  REGISTRATION_LINK: "https://docs.google.com/forms/d/e/1FAIpQLSfvBy0GqZPZpzC3aa6TKB5q3CMV9124cbsX4Ytv95O_plxN5w/viewform?usp=pp_url&entry.1875553715=__other_option__&entry.1875553715.other_option_response=GCAF26-ID-UAQ-MFC&entry.111338853=__other_option__&entry.111338853.other_option_response=Muhammad%20Rajif%20Raditya&entry.600268542=__other_option__&entry.600268542.other_option_response=GCAF26-ID-UAQ-MFC",
  TARGET_DATE: new Date("2026-07-13T09:00:00+07:00"),
  MUTUAL_FORM_URL: "https://docs.google.com/forms/d/e/1FAIpQLScrReJb1rJeHNA2AZFyHoTweVUlPS9AB8dl-RSYt0HJpflvxw/formResponse",
  MUTUAL_ENTRY_ID: "entry.1233135674"
}

// Weekly Schedule
const WEEKLY_SCHEDULE = [
  { week: "Week 1", period: "Sabtu 25 Jul – Jumat 31 Jul 2026", winners: "Top 3", startDate: new Date("2026-07-25T00:00:00+07:00"), endDate: new Date("2026-07-31T23:59:59+07:00") },
  { week: "Week 2", period: "Sabtu 1 Agu – Jumat 7 Agu 2026", winners: "Top 3", startDate: new Date("2026-08-01T00:00:00+07:00"), endDate: new Date("2026-08-07T23:59:59+07:00") },
  { week: "Week 3", period: "Sabtu 8 Agu – Jumat 14 Agu 2026", winners: "Top 3", startDate: new Date("2026-08-08T00:00:00+07:00"), endDate: new Date("2026-08-14T23:59:59+07:00") },
  { week: "Week 4", period: "Sabtu 15 Agu – Jumat 21 Agu 2026", winners: "Top 4", startDate: new Date("2026-08-15T00:00:00+07:00"), endDate: new Date("2026-08-21T23:59:59+07:00") },
  { week: "Week 5", period: "Sabtu 22 Agu – Jumat 28 Agu 2026", winners: "Top 4", startDate: new Date("2026-08-22T00:00:00+07:00"), endDate: new Date("2026-08-28T23:59:59+07:00") },
  { week: "Week 6", period: "Sabtu 29 Agu – Jumat 4 Sep 2026", winners: "Top 4", startDate: new Date("2026-08-29T00:00:00+07:00"), endDate: new Date("2026-09-04T23:59:59+07:00") },
  { week: "Week 7 (Grand Final)", period: "Sabtu 5 Sep – Jumat 11 Sep 2026", winners: "Top 5", startDate: new Date("2026-09-05T00:00:00+07:00"), endDate: new Date("2026-09-11T23:59:59+07:00") }
]

const formatFaqAnswer = (text: string) => {
  if (!text) return ""
  const urlRegex = /`?(https?:\/\/[^\s`"]+)`?/g
  const parts: any[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null
  const regex = new RegExp(urlRegex)

  while ((match = regex.exec(text)) !== null) {
    const matchIndex = match.index
    const matchedUrl = match[1]
    if (matchIndex > lastIndex) {
      parts.push(text.substring(lastIndex, matchIndex))
    }
    parts.push(
      <a
        key={matchIndex}
        href={matchedUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: 'var(--neon-cyan)', textDecoration: 'underline', fontWeight: '600' }}
      >
        Klik di sini
      </a>
    )
    lastIndex = regex.lastIndex
  }
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex))
  }
  return parts.length > 0 ? parts : text
}

export default function App() {
  const getInitialTab = () => {
    const rawHash = window.location.hash.replace('#', '').toLowerCase()
    if (rawHash === 'weekly' || rawHash === 'weekly-challenge') return 'weekly-challenge'
    const validTabs = ['home', 'kalkulator', 'leaderboard', 'tentang', 'cara', 'faq', 'komunitas', 'skills', 'gear', 'weekly-challenge']
    return validTabs.includes(rawHash) ? rawHash : 'home'
  }

  const [activeTab, setActiveTab] = useState(getInitialTab)
  const [copied, setCopied] = useState(false)
  const [countdown, setCountdown] = useState({ days: '--', hours: '--', minutes: '--', seconds: '--' })
  const [isRegOpen, setIsRegOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    window.location.hash = activeTab
  }, [activeTab])

  useEffect(() => {
    const handleHashChange = () => {
      const rawHash = window.location.hash.replace('#', '').toLowerCase()
      if (rawHash === 'weekly' || rawHash === 'weekly-challenge') {
        setActiveTab('weekly-challenge')
      } else {
        const validTabs = ['home', 'kalkulator', 'leaderboard', 'tentang', 'cara', 'faq', 'komunitas', 'skills', 'gear', 'weekly-challenge']
        if (validTabs.includes(rawHash)) {
          setActiveTab(rawHash)
        }
      }
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const copyReferralCode = () => {
    navigator.clipboard.writeText(CONFIG.REFERRAL_CODE)
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const difference = CONFIG.TARGET_DATE.getTime() - now

      if (difference <= 0) {
        clearInterval(timer)
        setIsRegOpen(true)
        setCountdown({ days: '00', hours: '00', minutes: '00', seconds: '00' })
      } else {
        setIsRegOpen(false)
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)

        setCountdown({
          days: String(days).padStart(2, '0'),
          hours: String(hours).padStart(2, '0'),
          minutes: String(minutes).padStart(2, '0'),
          seconds: String(seconds).padStart(2, '0')
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // FAQ Accordion State
  const [faqSearch, setFaqSearch] = useState('')
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)
  const [selectedFaqCategory, setSelectedFaqCategory] = useState('Semua')

  // Chatbot State
  const [chatOpen, setChatOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState([
    { text: `Halo! Selamat datang 👋 Saya <strong>ArcBot</strong>, asisten virtual Kak Rajif.`, isBot: true },
    { text: `Ada yang bisa saya bantu seputar program <strong>Google Cloud Arcade Facilitator 2026</strong>? Pilih menu cepat atau tulis pesanmu di bawah:`, isBot: true }
  ])
  const [chatInput, setChatInput] = useState('')
  const [chatTyping, setChatTyping] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [chatMessages, chatTyping])

  const handleSendChat = (textToSend?: string) => {
    const text = textToSend || chatInput.trim()
    if (!text) return

    setChatMessages(prev => [...prev, { text, isBot: false }])
    setChatInput('')
    setChatTyping(true)

    setTimeout(() => {
      setChatTyping(false)
      let reply = ""
      const query = text.toLowerCase()

      if (query.includes('wa') || query.includes('whatsapp') || query.includes('grup') || query.includes('komunitas')) {
        reply = `Grup WhatsApp bimbingan Kak Rajif adalah wadah diskusi, sharing token lab, dan tanya-jawab. Yuk gabung sekarang:<br><br><a href="${CONFIG.WA_LINK}" target="_blank" class="btn btn-success" style="padding: 6px 12px; font-size: 0.76rem; border-radius: 4px; display: inline-flex;">Join Grup WA</a>`
      } else if (query.includes('daftar') || query.includes('registrasi') || query.includes('ikut') || query.includes('join')) {
        reply = `Pendaftaran <strong>TELAH DIBUKA!</strong> 😍<br>Kamu bisa mendaftar secara langsung via form resmi ini:<br><br><a href="${CONFIG.REGISTRATION_LINK}" target="_blank" class="btn btn-primary" style="padding: 6px 12px; font-size: 0.76rem; border-radius: 4px; display: inline-flex;">Form Registrasi</a><br>Jangan lupa isi kode referral: <strong>${CONFIG.REFERRAL_CODE}</strong>`
      } else if (query.includes('kalkulator') || query.includes('poin')) {
        reply = `Kamu bisa mengecek poin dan status lab kamu secara otomatis di halaman <a href="#kalkulator" style="color: var(--neon-cyan)">Kalkulator Poin</a>!`
      } else {
        reply = `Ada yang bisa ArcBot bantu seputar program Arcade Facilitator 2026? Silakan cek tab <strong>Kalkulator</strong>, <strong>Leaderboard</strong>, atau <strong>FAQ</strong>.`
      }

      setChatMessages(prev => [...prev, { text: reply, isBot: true }])
    }, 800)
  }

  return (
    <>
      {/* Header */}
      <header className="header-nav" id="main-header">
        <div className="container nav-flex">
          <a href="#home" className="brand-logo" onClick={() => setActiveTab('home')}>
            <span>GSA ARCADE</span>
            <span className="logo-title-sub">FASILITATOR 2026</span>
          </a>

          {/* Desktop Nav */}
          <nav className="desktop-nav">
            <ul className="nav-links">
              <li>
                <span className={`nav-link ${activeTab === 'kalkulator' ? 'active' : ''}`} onClick={() => setActiveTab('kalkulator')}>
                  Kalkulator
                </span>
              </li>
              <li>
                <span className={`nav-link ${activeTab === 'leaderboard' ? 'active' : ''}`} onClick={() => setActiveTab('leaderboard')}>
                  Leaderboard
                </span>
              </li>
              <li>
                <span 
                  className={`nav-link ${activeTab === 'weekly-challenge' ? 'active' : ''}`} 
                  onClick={() => setActiveTab('weekly-challenge')}
                  style={{ display: 'inline-flex', alignItems: 'center' }}
                >
                  Weekly Challenge <span className="nav-dot-magenta" />
                </span>
              </li>
              <li 
                style={{ position: 'relative' }}
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <span 
                  className={`nav-link ${['cara', 'faq', 'komunitas', 'tentang', 'skills', 'gear'].includes(activeTab) ? 'active' : ''}`} 
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
                >
                  Panduan <ChevronDown size={14} style={{ transform: isDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                </span>
                {isDropdownOpen && (
                  <div style={{ position: 'absolute', top: '100%', left: 0, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '8px 0', minWidth: '180px', zIndex: 100, boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>
                    <div className="nav-link" style={{ padding: '8px 16px', display: 'block' }} onClick={() => { setActiveTab('cara'); setIsDropdownOpen(false); }}>Cara Bermain</div>
                    <div className="nav-link" style={{ padding: '8px 16px', display: 'block' }} onClick={() => { setActiveTab('faq'); setIsDropdownOpen(false); }}>FAQ</div>
                    <div className="nav-link" style={{ padding: '8px 16px', display: 'block' }} onClick={() => { setActiveTab('komunitas'); setIsDropdownOpen(false); }}>Komunitas</div>
                    <div className="nav-link" style={{ padding: '8px 16px', display: 'block' }} onClick={() => { setActiveTab('tentang'); setIsDropdownOpen(false); }}>Tentang</div>
                  </div>
                )}
              </li>
            </ul>
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <a 
              href={CONFIG.REGISTRATION_LINK} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-arcade btn-arcade-primary"
              style={{ padding: '8px 16px', fontSize: '0.82rem', whiteSpace: 'nowrap' }}
            >
              Daftar
            </a>
            
            <button 
              className="mobile-nav-toggle" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {isMobileMenuOpen && (
          <div style={{ padding: '16px 20px', background: 'var(--bg-card)', borderBottom: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div className="nav-link" onClick={() => { setActiveTab('kalkulator'); setIsMobileMenuOpen(false); }}>Kalkulator Poin</div>
            <div className="nav-link" onClick={() => { setActiveTab('leaderboard'); setIsMobileMenuOpen(false); }}>Leaderboard</div>
            <div className="nav-link" onClick={() => { setActiveTab('weekly-challenge'); setIsMobileMenuOpen(false); }}>Weekly Challenge</div>
            <div className="nav-link" onClick={() => { setActiveTab('cara'); setIsMobileMenuOpen(false); }}>Cara Bermain</div>
            <div className="nav-link" onClick={() => { setActiveTab('faq'); setIsMobileMenuOpen(false); }}>FAQ</div>
            <div className="nav-link" onClick={() => { setActiveTab('komunitas'); setIsMobileMenuOpen(false); }}>Komunitas</div>
            <div className="nav-link" onClick={() => { setActiveTab('tentang'); setIsMobileMenuOpen(false); }}>Tentang</div>
          </div>
        )}
      </header>

      {/* Main Content Area (Original Layout Preserved 100%) */}
      <main className="container" id="main-content-area" style={{ padding: '24px 20px', flex: 1 }}>
        
        {/* HOME TAB (Original Layout Restored) */}
        {activeTab === 'home' && (
          <div className="hero-wrapper">
            <div className="hero-box">
              <div>
                <div className="hero-weekly-banner" onClick={() => setActiveTab('weekly-challenge')}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '1.1rem' }}>🔥</span>
                    <span style={{ fontSize: '0.88rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                      <strong>Weekly Challenge is LIVE</strong> — Rebut hadiah tiap minggu!
                    </span>
                  </div>
                  <button className="btn-arcade btn-arcade-primary" style={{ padding: '6px 14px', fontSize: '0.8rem' }}>
                    Lihat Detail <ArrowRight size={14} />
                  </button>
                </div>

                <h1 className="hero-title" style={{ fontSize: '2.5rem', margin: '16px 0' }}>
                  Kuasai Skill Cloud & Dapatkan <span className="gradient-text">Swag Resmi Google!</span>
                </h1>
                <p className="hero-desc" style={{ marginBottom: '24px' }}>
                  Google Cloud Arcade Facilitator 2026 adalah program gamifikasi belajar cloud gratis. Dipandu oleh <strong>Muhammad Rajif Raditya</strong> sebagai fasilitator kalian, ayo selesaikan praktikum, raih lencana digital, dan kumpulkan poin untuk ditukarkan dengan hadiah impian!
                </p>

                <div className="hero-buttons" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <a href={CONFIG.WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-arcade btn-arcade-primary" style={{ background: 'var(--state-done)', color: '#000' }}>
                    <Users size={16} /> Gabung WhatsApp Group
                  </a>
                  <button className="btn-arcade btn-arcade-outline" onClick={() => setActiveTab('tentang')}>
                    Pelajari Selengkapnya <ArrowRight size={16} />
                  </button>
                </div>
              </div>

              {/* Profile Referral Box */}
              <div className="bento-card bento-card-highlight">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div className="avatar" style={{ padding: '10px', background: 'rgba(0, 240, 255, 0.15)', borderRadius: '50%', color: 'var(--neon-cyan)' }}>
                    <Award size={24} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.1rem' }}>Profil Peserta</h3>
                    <span className="badge-tag badge-tag-done">Level 1: Trooper</span>
                  </div>
                </div>

                <div style={{ background: 'var(--bg-base)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '14px', marginBottom: '16px' }}>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Kode Referral Bimbingan:</span>
                  <div 
                    onClick={copyReferralCode} 
                    style={{ fontFamily: 'var(--font-arcade)', fontSize: '1.1rem', color: 'var(--neon-cyan)', cursor: 'pointer', marginTop: '4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                  >
                    {CONFIG.REFERRAL_CODE} <Copy size={16} />
                  </div>
                  {copied && <div className="badge-tag badge-tag-done" style={{ marginTop: '8px' }}>✓ Kode berhasil disalin!</div>}
                </div>

                {/* Countdown */}
                <div style={{ background: 'var(--bg-base)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '14px' }}>
                  <div style={{ fontSize: '0.84rem', fontWeight: 700, marginBottom: '8px', color: 'var(--neon-yellow)' }}>
                    📅 Pendaftaran Resmi Dimulai: 13 Juli 2026
                  </div>
                  <a href={CONFIG.REGISTRATION_LINK} target="_blank" rel="noopener noreferrer" className="btn-arcade btn-arcade-primary" style={{ width: '100%', textDecoration: 'none' }}>
                    Form Registrasi Resmi ➔
                  </a>
                </div>
              </div>
            </div>

            {/* Milestone Strategy Card */}
            <div className="bento-card col-span-12" style={{ marginTop: '32px' }}>
              <h3 className="card-title-arcade" style={{ fontSize: '1.1rem', marginBottom: '16px' }}>
                <Award size={20} className="text-yellow" /> ESTIMASI STRATEGI PENYELESAIAN (ATURAN RESMI)
              </h3>

              <div className="bento-grid" style={{ gap: '20px' }}>
                <div className="bento-card col-span-6" style={{ background: 'rgba(10, 10, 18, 0.6)' }}>
                  <h4 style={{ color: 'var(--neon-cyan)', marginBottom: '12px', fontSize: '0.95rem' }}>✨ Konversi Lencana ke Poin</h4>
                  <div style={{ fontSize: '0.88rem', lineHeight: '1.7' }}>
                    <p>• <strong>1 Game Badge</strong> = 1 Poin (Selesaikan ~4-6 Labs)</p>
                    <p>• <strong>2 Skill Badges</strong> = 1 Poin (Selesaikan 2 Challenge Labs)</p>
                  </div>
                </div>

                <div className="bento-card col-span-6" style={{ background: 'rgba(10, 10, 18, 0.6)' }}>
                  <h4 style={{ color: 'var(--state-done)', marginBottom: '12px', fontSize: '0.95rem' }}>🏆 Target Milestone Swag</h4>
                  <div style={{ fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Milestone 1 (6 Game + 14 Skill Badges):</span>
                      <strong style={{ color: 'var(--state-done)' }}>30 Poin*</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Milestone 2 (8 Game + 28 Skill Badges):</span>
                      <strong style={{ color: 'var(--neon-cyan)' }}>50 Poin*</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Milestone 3 (10 Game + 42 Skill Badges):</span>
                      <strong style={{ color: 'var(--neon-yellow)' }}>70 Poin*</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Ultimate Milestone (12 Game + 56 Skill Badges):</span>
                      <strong style={{ color: 'var(--neon-magenta)' }}>90 Poin*</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2 NEW PAGES */}
        {activeTab === 'kalkulator' && <PointsCalculator />}
        {activeTab === 'leaderboard' && <LeaderboardSection />}

        {/* ORIGINAL TABS RESTORED */}
        {activeTab === 'weekly-challenge' && (
          <div style={{ padding: '24px 0' }} id="weekly-challenge-tab">
            <div className="bento-card col-span-12 bento-card-highlight">
              <h1 className="card-title-arcade" style={{ fontSize: '1.4rem', marginBottom: '12px' }}>
                🔥 PLAYER WEEKLY CHALLENGE
              </h1>
              <p style={{ marginBottom: '20px' }}>
                Setiap minggu, kumpulkan skill badge sebanyak-banyaknya dan rebut total hadiah <strong>800K – 2JT</strong> setiap minggu!
              </p>

              <div className="bento-grid" style={{ gap: '16px' }}>
                <div className="stat-box col-span-4">
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--neon-cyan)' }}>CHALLENGE</div>
                  <div style={{ fontSize: '0.82rem', marginTop: '4px' }}>Kumpulkan skill badges mingguan</div>
                </div>
                <div className="stat-box col-span-4">
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--state-done)' }}>ELIGIBILITY</div>
                  <div style={{ fontSize: '0.82rem', marginTop: '4px' }}>Minimal 5 Skill Badge + 1 Game Badge</div>
                </div>
                <div className="stat-box col-span-4">
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--neon-yellow)' }}>HOW IT WORKS</div>
                  <div style={{ fontSize: '0.82rem', marginTop: '4px' }}>Penilaian berdasarkan delta pertambahan badge</div>
                </div>
              </div>

              <div className="arcade-table-wrapper" style={{ marginTop: '24px' }}>
                <table className="arcade-table">
                  <thead>
                    <tr>
                      <th>MINGGU</th>
                      <th>PERIODE</th>
                      <th>PEMENANG</th>
                      <th>STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {WEEKLY_SCHEDULE.map((item) => {
                      const now = new Date()
                      const isCurrent = now >= item.startDate && now <= item.endDate
                      const isPast = now > item.endDate
                      return (
                        <tr key={item.week} className={isCurrent ? 'row-active-highlight' : ''}>
                          <td style={{ fontWeight: 700 }}>{item.week}</td>
                          <td>{item.period}</td>
                          <td><span className="badge-tag badge-tag-warning">{item.winners}</span></td>
                          <td>
                            {isCurrent ? (
                              <span className="badge-tag badge-tag-done">🔥 Sedang Berlangsung</span>
                            ) : isPast ? (
                              <span className="badge-tag badge-tag-pending">Selesai</span>
                            ) : (
                              <span className="badge-tag badge-tag-warning">Mendatang</span>
                            )}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tentang' && (
          <div className="bento-card col-span-12" style={{ marginTop: '24px' }}>
            <h2 className="card-title-arcade" style={{ fontSize: '1.2rem', marginBottom: '16px' }}>
              ℹ️ TENTANG BIMBINGAN & PROGRAM
            </h2>
            <p style={{ lineHeight: '1.7', marginBottom: '16px' }}>
              <strong>Google Cloud Arcade Facilitator 2026</strong> adalah program gamifikasi resmi berskala global dari Google Cloud yang bertujuan melatih skill cloud computing dan Generative AI secara gratis.
            </p>
            <p style={{ lineHeight: '1.7' }}>
              Didampingi oleh <strong>Muhammad Rajif Raditya</strong> sebagai fasilitator berlisensi (kode: <code>{CONFIG.REFERRAL_CODE}</code>), peserta dibimbing menyelesaikan lab secara gratis tanpa kartu kredit.
            </p>
          </div>
        )}

        {activeTab === 'cara' && (
          <div className="bento-card col-span-12" style={{ marginTop: '24px' }}>
            <h2 className="card-title-arcade" style={{ fontSize: '1.2rem', marginBottom: '16px' }}>
              💻 CARA BERMAIN & LANGKAH PENGERJAAN
            </h2>
            <ol style={{ paddingLeft: '20px', lineHeight: '1.8', color: 'var(--text-primary)' }}>
              <li><strong>Daftar & Gabung Grup:</strong> Gunakan form prefill resmi dengan kode <code>{CONFIG.REFERRAL_CODE}</code>.</li>
              <li><strong>Klaim Kredit & Mulai Lab:</strong> Gunakan token kredit gratis untuk mengakses Google Cloud Console.</li>
              <li><strong>Kumpulkan Badges & Poin:</strong> Selesaikan 12 Arcade Game Badges dan 51 Skill Badges.</li>
              <li><strong>Redeem Swag Impian:</strong> Tukarkan poin saat masa Swag Drop dibuka oleh Google Cloud.</li>
            </ol>
          </div>
        )}

        {activeTab === 'faq' && (
          <section className="bento-card col-span-12" id="faq" style={{ marginTop: '24px' }}>
            <div className="card-header-flex" style={{ flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <h2 className="card-title-arcade">
                  <span>💬</span> FREQUENTLY ASKED QUESTIONS (FAQ)
                </h2>
                <p style={{ margin: '4px 0 0 0' }}>
                  93 jawaban lengkap terkait pendaftaran, poin, milestone, bonus, dan kendala lab.
                </p>
              </div>
              <span className="badge-tag badge-tag-warning">93 Q&A DATABASE</span>
            </div>

            <div className="input-arcade-group" style={{ margin: '20px 0' }}>
              <input
                type="text"
                className="input-arcade"
                placeholder="🔍 Cari pertanyaan atau kata kunci..."
                value={faqSearch}
                onChange={(e) => setFaqSearch(e.target.value)}
              />
            </div>

            <div>
              {faqData
                .filter((faq: any) => {
                  if (selectedFaqCategory !== 'Semua' && faq.category !== selectedFaqCategory) return false
                  const q = faq.question.toLowerCase()
                  const a = faq.answer.toLowerCase()
                  const search = faqSearch.toLowerCase()
                  return !search || q.includes(search) || a.includes(search)
                })
                .map((faq: any, idx: number) => {
                  const isOpen = openFaqIndex === idx
                  return (
                    <div key={idx} className="faq-accordion-item">
                      <div className="faq-trigger" onClick={() => setOpenFaqIndex(isOpen ? null : idx)}>
                        <div className="faq-trigger-question">
                          <span style={{ color: 'var(--neon-cyan)', marginRight: '8px' }}>Q{idx + 1}.</span>
                          {faq.question}
                        </div>
                        <div style={{ color: 'var(--neon-cyan)', fontWeight: 700 }}>
                          {isOpen ? '▲' : '▼'}
                        </div>
                      </div>

                      {isOpen && (
                        <div className="faq-content">
                          <div className="badge-tag badge-tag-done" style={{ marginBottom: '10px', fontSize: '0.72rem' }}>
                            Kategori: {faq.category}
                          </div>
                          <div>{formatFaqAnswer(faq.answer)}</div>
                        </div>
                      )}
                    </div>
                  )
                })}
            </div>
          </section>
        )}

        {activeTab === 'komunitas' && (
          <div className="bento-card col-span-12" style={{ marginTop: '24px' }}>
            <h2 className="card-title-arcade" style={{ fontSize: '1.2rem', marginBottom: '16px', color: 'var(--state-done)' }}>
              💬 KOMUNITAS & GRUP WHATSAPP
            </h2>
            <p style={{ marginBottom: '18px' }}>
              Bergabung dengan grup bimbingan WhatsApp Kak Rajif untuk koordinasi token, sharing lab, dan troubleshooting.
            </p>
            <a href={CONFIG.WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-arcade btn-arcade-primary" style={{ background: 'var(--state-done)', color: '#000' }}>
              GABUNG GRUP WHATSAPP 💬
            </a>
          </div>
        )}

      </main>

      {/* Floating Chatbot */}
      <div className="chat-container">
        <button className="chat-toggle" onClick={() => setChatOpen(!chatOpen)} aria-label="Toggle Chatbot" style={{ position: 'fixed', bottom: '24px', right: '24px', background: 'var(--neon-cyan)', color: '#000', border: 'none', borderRadius: '50%', width: '48px', height: '48px', cursor: 'pointer', boxShadow: 'var(--glow-cyan)', zIndex: 999 }}>
          <MessageSquare size={24} />
        </button>

        {chatOpen && (
          <div style={{ position: 'fixed', bottom: '80px', right: '24px', width: '340px', background: 'var(--bg-card)', border: '1px solid var(--neon-cyan)', borderRadius: 'var(--radius-card)', padding: '16px', zIndex: 999, boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
            <div style={{ fontWeight: 700, color: 'var(--neon-cyan)', marginBottom: '8px' }}>🤖 ArcBot Asisten</div>
            <div style={{ maxHeight: '240px', overflowY: 'auto', fontSize: '0.85rem', marginBottom: '12px' }}>
              {chatMessages.map((m, idx) => (
                <div key={idx} style={{ marginBottom: '8px', textAlign: m.isBot ? 'left' : 'right' }} dangerouslySetInnerHTML={{ __html: m.text }} />
              ))}
              <div ref={chatEndRef} />
            </div>
            <input
              type="text"
              className="input-arcade"
              placeholder="Tulis pertanyaan..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
              style={{ width: '100%', padding: '6px 10px', fontSize: '0.82rem' }}
            />
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="footer-arcade">
        <div className="container">
          <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '8px' }}>
            Google Skills Arcade Facilitator 2026 - Indonesia
          </div>
          <div>Fasilitator Resmi: <strong>Muhammad Rajif Raditya</strong> (Kode: <code>{CONFIG.REFERRAL_CODE}</code>)</div>

          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '16px 0 8px 0' }}>
            ⚠️ Disclaimer: Web ini tidak resmi, dibuat oleh fasilitator. Angka poin di sini adalah estimasi. Data resmi tetap dari Google/Dicoding.
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', fontSize: '0.82rem', flexWrap: 'wrap' }}>
            <a href={CONFIG.WA_LINK} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--state-done)', textDecoration: 'none' }}>
              💬 Grup WhatsApp Facilitator
            </a>
            <a href="mailto:arcade@dicoding.com" style={{ color: 'var(--neon-cyan)', textDecoration: 'none' }}>
              ✉️ Email Dukungan (arcade@dicoding.com)
            </a>
          </div>
        </div>
      </footer>

    </>
  )
}
