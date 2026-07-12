import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Calculator, 
  Award, 
  MessageSquare, 
  Share2, 
  Key, 
  Users, 
  CheckCircle, 
  Moon, 
  Sun, 
  ArrowRight, 
  Lock, 
  Plus, 
  Minus, 
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
  Backpack,
  Gift,
  AlertTriangle,
  ChevronDown
} from 'lucide-react';

// Custom inline SVG icons for brands (not exported in newer Lucide versions)
const Instagram = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const Linkedin = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const Github = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

// Central Configuration Object
const CONFIG = {
  FACIL_NAME: "Muhammad Rajif Raditya",
  REFERRAL_CODE: "GCAF26-ID-UAQ-MFC",
  WA_LINK: "https://chat.whatsapp.com/IEDhYSI9EpYDI9LEdT95h1",
  REGISTRATION_LINK: "https://docs.google.com/forms/d/e/1FAIpQLSfvBy0GqZPZpzC3aa6TKB5q3CMV9124cbsX4Ytv95O_plxN5w/closedform?resourcekey=0-zGX30xoG2JuARKgKrOztow",
  TARGET_DATE: new Date("2026-07-13T09:00:00+07:00"),
  ANONYMOUS_FORM_URL: "https://docs.google.com/forms/d/e/1FAIpQLSdjykb5NiyW57GowHRhFOyuE9GvjwcVsF8smy7dGq77vGreIw/formResponse",
  ANONYMOUS_ENTRY_ID: "entry.1958733736",
  MUTUAL_FORM_URL: "https://docs.google.com/forms/d/e/1FAIpQLScrReJb1rJeHNA2AZFyHoTweVUlPS9AB8dl-RSYt0HJpflvxw/formResponse",
  MUTUAL_ENTRY_ID: "entry.1233135674"
};

export default function App() {
  // Hash Routing Helpers
  const getInitialTab = () => {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    const validTabs = ['home', 'tentang', 'cara', 'qna', 'komunitas', 'skills', 'gear'];
    return validTabs.includes(hash) ? hash : 'home';
  };

  const [activeTab, setActiveTab] = useState(getInitialTab);
  const [theme, setTheme] = useState('dark');
  const [copied, setCopied] = useState(false);
  const [countdown, setCountdown] = useState({ days: '--', hours: '--', minutes: '--', seconds: '--' });
  const [isRegOpen, setIsRegOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Synchronize Tab with URL hash
  useEffect(() => {
    window.location.hash = activeTab;
  }, [activeTab]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      const validTabs = ['home', 'tentang', 'cara', 'qna', 'komunitas', 'skills', 'gear'];
      if (validTabs.includes(hash)) {
        setActiveTab(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Theme Controller
  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    if (nextTheme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  };

  // Click to Copy Code
  const copyReferralCode = () => {
    navigator.clipboard.writeText(CONFIG.REFERRAL_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  // Countdown & Reg State Logic
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = CONFIG.TARGET_DATE.getTime() - now;

      if (difference <= 0) {
        clearInterval(timer);
        setIsRegOpen(true);
        setCountdown({ days: '00', hours: '00', minutes: '00', seconds: '00' });
      } else {
        setIsRegOpen(false);
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setCountdown({
          days: String(days).padStart(2, '0'),
          hours: String(hours).padStart(2, '0'),
          minutes: String(minutes).padStart(2, '0'),
          seconds: String(seconds).padStart(2, '0')
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);



  // FAQ Accordion State
  const [faqSearch, setFaqSearch] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const faqData = [
    {
      q: "Apakah bimbingan Google Cloud Arcade X Dicoding ini berbayar?",
      a: "Sama sekali tidak, 100% gratis! Pendaftaran bimbingan tidak dipungut biaya apa pun. Selama program berlangsung, kamu akan dibagikan kode token gratis dari Google untuk meluncurkan Console tanpa kartu kredit.",
      k: "gratis free biaya bayar bimbingan"
    },
    {
      q: "Bagaimana cara klaim swag? Apakah gratis ongkos kirim ke Indonesia?",
      a: "Setiap modul praktikum yang diselesaikan akan memberikan lencana digital (badge) di profil Google Cloud Skills Boost. Akumulasikan badge tersebut untuk dikonversi menjadi poin di akhir musim. Poin tersebut digunakan untuk memesan swag fisik di toko merchandise resmi. Ya, pengiriman merchandise ke alamat rumahmu di Indonesia sepenuhnya gratis tanpa biaya ongkir ditanggung Google!",
      k: "swag hadiah kirim ongkir bayar paket rumah"
    },
    {
      q: "Bagaimana jika token lab habis di tengah jalan atau akun saya terblokir?",
      a: "Jika token gratis habis, kamu bisa mengajukan penambahan kredit gratis melalui Google Form khusus yang dibagikan Kak Rajif di grup WA. Jika akun terkena blokir kuota (quota blocked), kamu bisa langsung menggunakan fitur bantuan chat online di portal Skills Boost untuk mereset kuota akunmu secara instan.",
      k: "token kredit habis kuota blocked block limit error"
    },
    {
      q: "Saya tidak punya latar belakang IT / pemrograman, apakah bisa ikut bimbingan?",
      a: "Tentu saja! Program ini dirancang untuk pemula. Setiap lab praktikum dilengkapi petunjuk langkah demi langkah yang sangat detail (cukup salin dan tempel perintah). Selain itu, Kak Rajif sebagai fasilitator akan membagikan panduan visual dan membantu kendalamu langsung di grup chat.",
      k: "pemula basic noob non-it programming coding"
    },
    {
      q: "Kapan pendaftaran dibuka dan di mana saya bisa mengakses link pendaftaran?",
      a: "Pendaftaran program bimbingan peserta resmi dimulai pada 13 Juli 2026 pukul 09:00 WIB hingga penutupan pada 14 September 2026 pukul 23:59 WIB. Kak Rajif telah menyertakan tombol pendaftaran di portal ini yang akan otomatis aktif ketika pendaftaran resmi dibuka.",
      k: "daftar link buka registrasi kapan form"
    },
    {
      q: "Apakah saya bisa mengerjakan praktikum hanya menggunakan Handphone (HP)?",
      a: "Ya, sangat bisa! Pada musim bimbingan sebelumnya, ada beberapa anak didik Kak Rajif yang tidak mempunyai laptop/PC dan hanya belajar bermodalkan browser di HP. Mereka tetap tekun menyelesaikan praktikum dan sukses membawa pulang hadiah Google Cloud.",
      k: "hp handphone device laptop pc komputer smartphone"
    }
  ];



  // Social Mutuals State
  const [mutualsSearch, setMutualsSearch] = useState('');
  const [activeMutualTab, setActiveMutualTab] = useState('instagram');
  const [submittedMutuals, setSubmittedMutuals] = useState([
    { platform: 'instagram', username: '@rajif_raditya', role: 'Fasilitator (Admin)', link: 'https://www.instagram.com/rajif_raditya/' },
    { platform: 'instagram', username: '@ahmad_cloud', role: 'Peserta', link: '#' },
    { platform: 'instagram', username: '@siti_dev', role: 'Peserta', link: '#' },
    { platform: 'linkedin', username: 'Muhammad Rajif Raditya', role: 'Fasilitator (Admin)', link: 'https://www.linkedin.com/in/rajifraditya' },
    { platform: 'linkedin', username: 'Budi Santoso', role: 'Peserta', link: '#' },
    { platform: 'github', username: 'Chartzh', role: 'Fasilitator (Admin)', link: 'https://github.com/Chartzh/' },
    { platform: 'github', username: 'dewi-codes', role: 'Peserta', link: '#' }
  ]);

  const [newMutual, setNewMutual] = useState({ platform: 'instagram', username: '', link: '' });
  const [mutualSuccess, setMutualSuccess] = useState(false);

  const handleMutualSubmit = (e) => {
    e.preventDefault();
    if (!newMutual.username || !newMutual.link) return;

    // Send data to background Form
    const fullMsg = `[Mutualan Request]\nTipe: ${newMutual.platform}\nUsername: ${newMutual.username}\nLink: ${newMutual.link}`;
    const formData = new URLSearchParams();
    formData.append(CONFIG.MUTUAL_ENTRY_ID, fullMsg);

    fetch(CONFIG.MUTUAL_FORM_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData.toString()
    }).catch(err => console.warn('Background submission error ignored'));

    setMutualSuccess(true);
    setNewMutual({ platform: 'instagram', username: '', link: '' });
    setTimeout(() => setMutualSuccess(false), 5000);
  };



  // Chatbot State
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { text: `Halo! Selamat datang 👋 Saya <strong>ArcBot</strong>, asisten virtual Kak Rajif.`, isBot: true },
    { text: `Ada yang bisa saya bantu seputar program <strong>Google Cloud Arcade X Dicoding 2026</strong>? Pilih menu cepat atau tulis pesanmu di bawah:`, isBot: true }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [chatTyping, setChatTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, chatTyping]);

  const handleSendChat = (textToSend) => {
    const text = textToSend || chatInput.trim();
    if (!text) return;

    setChatMessages(prev => [...prev, { text, isBot: false }]);
    setChatInput('');
    setChatTyping(true);

    setTimeout(() => {
      setChatTyping(false);
      let reply = "";
      const query = text.toLowerCase();

      if (query.includes('wa') || query.includes('whatsapp') || query.includes('grup') || query.includes('komunitas')) {
        reply = `Grup WhatsApp bimbingan Kak Rajif adalah wadah diskusi, sharing token lab, dan tanya-jawab. Yuk gabung sekarang:<br><br><a href="${CONFIG.WA_LINK}" target="_blank" class="btn btn-success" style="padding: 6px 12px; font-size: 0.76rem; border-radius: 4px; display: inline-flex;"><i class="fa-brands fa-whatsapp"></i> Join Grup WA</a>`;
      } else if (query.includes('daftar') || query.includes('registrasi') || query.includes('ikut') || query.includes('join')) {
        if (isRegOpen) {
          reply = `Pendaftaran <strong>TELAH DIBUKA!</strong> 😍<br>Kamu bisa mendaftar secara langsung via form resmi ini:<br><br><a href="${CONFIG.REGISTRATION_LINK}" target="_blank" class="btn btn-primary" style="padding: 6px 12px; font-size: 0.76rem; border-radius: 4px; display: inline-flex;">Form Registrasi</a><br>Jangan lupa isi kode referral: <strong>${CONFIG.REFERRAL_CODE}</strong>`;
        } else {
          reply = `Status pendaftaran saat ini masih <strong>Coming Soon</strong>. Resmi dibuka pada <strong>13 Juli 2026 pukul 09:00 WIB</strong>.<br><br>Siapkan akunmu dulu di <a href="https://www.cloudskillsboost.google/" target="_blank" style="color: var(--color-primary-light);">Google Cloud Skills Boost</a>. Link pendaftaran langsung Kak Rajif share di grup WA begitu dibuka!`;
        }
      } else if (query.includes('gratis') || query.includes('bayar') || query.includes('biaya')) {
        reply = `Bimbingan ini **100% gratis**. Akses modul belajar, token kredit Google Cloud, hingga pengiriman merchandise swag ke alamat rumahmu ditanggung penuh oleh Google.`;
      } else if (query.includes('swag') || query.includes('hadiah') || query.includes('kaos') || query.includes('jaket') || query.includes('ransel') || query.includes('tumbler')) {
        reply = `Swag premium seperti Jaket Hoodie, Ransel laptop, Speaker bluetooth, Collapsible Tumbler, dan Bricks Set bisa ditukarkan dengan poin hasil pengumpulan lencana praktikum lab resmi Google Cloud. Kumpulkan poin sebanyak-banyaknya untuk menukarkannya!`;
      } else if (query.includes('poin') || query.includes('point') || query.includes('hitung') || query.includes('badge')) {
        reply = `Sistem poin resmi:<br>
        • <strong>1 Arcade Game Badge</strong> = 1 Poin.<br>
        • <strong>2 Skill Badges</strong> = 1 Poin.<br><br>
        Kumpulkan poin sebanyak-banyaknya untuk mencapai target Milestone swag!`;
      } else {
        reply = `Maaf, saya belum memahami pertanyaan Anda 😅<br><br>Cobalah tanyakan:<br>
        • "cara daftar"<br>
        • "apakah gratis?"<br>
        • "grup whatsapp"<br>
        • "hadiah swag"<br>
        • "sistem poin"`;
      }

      setChatMessages(prev => [...prev, { text: reply, isBot: true }]);
    }, 800);
  };

  return (
    <>
      {/* Header */}
      <header className="header" id="main-header">
        <div className="container nav-container">
          <div className="logo-link" id="logo-brand">
            <span className="g-blue">G</span><span className="g-red">o</span><span className="g-yellow">o</span><span
              className="g-blue">g</span><span className="g-green">l</span><span className="g-red">e</span>
            <span className="logo-arcade" id="logo-arcade-txt">Arcade</span>
          </div>

          <nav id="desktop-navigation">
            <ul className="nav-menu">
              <li><span className={`nav-item-link ${activeTab === 'home' ? 'active' : ''}`} onClick={() => { setActiveTab('home'); setIsDropdownOpen(false); }}>Home</span></li>
              <li><span className={`nav-item-link ${activeTab === 'tentang' ? 'active' : ''}`} onClick={() => { setActiveTab('tentang'); setIsDropdownOpen(false); }}>Tentang</span></li>
              <li><span className={`nav-item-link ${activeTab === 'cara' ? 'active' : ''}`} onClick={() => { setActiveTab('cara'); setIsDropdownOpen(false); }}>Cara Bermain</span></li>
              <li><span className={`nav-item-link ${activeTab === 'qna' ? 'active' : ''}`} onClick={() => { setActiveTab('qna'); setIsDropdownOpen(false); }}>QnA</span></li>
              <li><span className={`nav-item-link ${activeTab === 'komunitas' ? 'active' : ''}`} onClick={() => { setActiveTab('komunitas'); setIsDropdownOpen(false); }}>Komunitas</span></li>
              <li 
                className="nav-dropdown-item" 
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                style={{ position: 'relative' }}
              >
                <span className={`nav-item-link ${(activeTab === 'skills' || activeTab === 'gear') ? 'active' : ''}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  Panduan <ChevronDown size={14} style={{ transform: isDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                </span>
                {isDropdownOpen && (
                  <ul className="dropdown-menu">
                    <li onClick={() => { setActiveTab('skills'); setIsDropdownOpen(false); }}>
                      <span className={`dropdown-link ${activeTab === 'skills' ? 'active' : ''}`}>Panduan Google Skills</span>
                    </li>
                    <li onClick={() => { setActiveTab('gear'); setIsDropdownOpen(false); }}>
                      <span className={`dropdown-link ${activeTab === 'gear' ? 'active' : ''}`}>Panduan GEAR</span>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          </nav>

          <div className="nav-actions-wrapper">
            <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Toggle Theme">
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <a 
              href={isRegOpen ? CONFIG.REGISTRATION_LINK : "#"} 
              target={isRegOpen ? "_blank" : undefined} 
              onClick={(e) => !isRegOpen && e.preventDefault()}
              className={`btn btn-primary ${!isRegOpen ? 'btn-coming-soon' : ''}`}
            >
              {isRegOpen ? 'Daftar Sekarang' : 'Coming Soon'}
            </a>
          </div>
        </div>
      </header>

      {/* Render active tabs */}
      <main className="container" id="main-content-area">
        {activeTab === 'home' && (
          <div className="hero-wrapper">
            <div className="hero-box">
              
              <div>
                <h1 className="hero-title">
                  Kuasai Skill Cloud & Dapatkan <span className="gradient-text">Swag Resmi Google!</span>
                </h1>
                <p className="hero-desc">
                  Google Cloud Arcade X Dicoding 2026 adalah program gamifikasi belajar cloud gratis. Dipandu oleh <strong>Muhammad Rajif Raditya</strong> sebagai fasilitator kalian, ayo selesaikan praktikum, raih lencana digital, and kumpulkan poin untuk ditukarkan dengan hadiah impian!
                </p>

                <div className="hero-buttons">
                  <a href={CONFIG.WA_LINK} target="_blank" className="btn btn-success">
                    <Users size={16} /> Gabung WhatsApp Group
                  </a>
                  <button className="btn btn-outline" onClick={() => setActiveTab('tentang')}>
                    Pelajari Selengkapnya <ArrowRight size={16} />
                  </button>
                </div>
              </div>

              {/* Simulated profile space panel */}
              <div className="card">
                <div className="sim-profile-box">
                  <div className="profile-row">
                    <div className="avatar"><Award size={20} /></div>
                    <div className="profile-info">
                      <h3>Profil Peserta</h3>
                      <span className="badge green-badge" style={{ fontSize: '0.62rem', padding: '2px 8px' }}>Level 1: Trooper</span>
                    </div>
                    <div className="points-pill">
                      <strong>--</strong>
                      <span>Poin</span>
                    </div>
                  </div>

                  {/* Referral code card */}
                  <div className="referral-box">
                    <span>Salin Kode Referral Bimbingan:</span>
                    <div className="code-field" onClick={copyReferralCode} title="Klik untuk menyalin">
                      {CONFIG.REFERRAL_CODE} <Copy size={16} style={{ color: 'var(--color-primary-light)' }} />
                    </div>
                    {copied && <div className="copy-status-tip"><CheckCircle size={12} style={{ display: 'inline', marginRight: '4px' }} /> Kode berhasil disalin!</div>}
                  </div>

                  {/* Countdown timer */}
                  <div className="countdown-box">
                    <div className="countdown-title-row">
                      <Calendar size={14} className="blink" style={{ color: 'var(--color-danger)' }} />
                      <div>
                        <strong>{isRegOpen ? 'Pendaftaran Dibuka!' : 'Pendaftaran Dibuka Dalam:'}</strong>
                        <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Pendaftaran resmi dimulai pada 13 Juli 2026, 09:00 WIB.</p>
                      </div>
                    </div>
                    {!isRegOpen && (
                      <div className="countdown-grid">
                        <div className="countdown-block"><strong>{countdown.days}</strong><span>Hari</span></div>
                        <div className="countdown-block"><strong>{countdown.hours}</strong><span>Jam</span></div>
                        <div className="countdown-block"><strong>{countdown.minutes}</strong><span>Min</span></div>
                        <div className="countdown-block"><strong>{countdown.seconds}</strong><span>Det</span></div>
                      </div>
                    )}
                    <a 
                      href={isRegOpen ? CONFIG.REGISTRATION_LINK : "#"} 
                      target={isRegOpen ? "_blank" : undefined}
                      onClick={(e) => !isRegOpen && e.preventDefault()}
                      className={`btn btn-block ${isRegOpen ? 'btn-primary' : 'btn-coming-soon'}`}
                      style={{ marginTop: '6px' }}
                    >
                      {isRegOpen ? 'Registrasi Sekarang' : 'Pendaftaran Belum Dibuka'}
                    </a>
                  </div>

                </div>
              </div>

            </div>

            {/* Milestone Strategy Card */}
            <div className="card" style={{ marginTop: '32px', marginBottom: '32px' }}>
              <h3 className="card-title" style={{ fontSize: '1.35rem', marginBottom: '20px' }}>
                <Award size={22} className="text-yellow" style={{ display: 'inline', fill: 'var(--color-warning)' }} /> Estimasi Strategi Penyelesaian (Berdasarkan Aturan Resmi)
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '28px' }}>
                
                {/* Left Side: Conversion Rules */}
                <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '20px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <h4 style={{ fontSize: '1rem', color: 'var(--color-primary-light)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Sparkles size={16} /> Konversi Lencana ke Poin
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                      <span><strong>1 Game Badge</strong></span>
                      <span className="text-yellow" style={{ fontWeight: 600 }}>1 Poin</span>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0, paddingLeft: '8px', borderLeft: '2px solid var(--color-secondary)', lineHeight: 1.45 }}>
                      Selesaikan ~4-6 Labs (Senilai 1 Poin).
                    </p>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px', marginTop: '8px' }}>
                      <span><strong>2 Skill Badges</strong> (Keahlian)</span>
                      <span className="text-yellow" style={{ fontWeight: 600 }}>1 Poin</span>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0, paddingLeft: '8px', borderLeft: '2px solid var(--color-secondary)', lineHeight: 1.45 }}>
                      Selesaikan 2 Challenge Labs (Senilai 1 Poin).
                    </p>
                  </div>
                </div>

                {/* Right Side: Milestone Goals */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <h4 style={{ fontSize: '1rem', color: 'var(--color-success)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Award size={16} /> Target Milestone Swag
                  </h4>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.15)', padding: '10px 14px', borderRadius: 'var(--radius-sm)' }}>
                    <div>
                      <strong style={{ fontSize: '0.9rem' }}>Milestone 1 (Minimal)</strong>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>6 Game Badges + 14 Skill Badges</div>
                    </div>
                    <span className="badge green-badge" style={{ fontSize: '0.85rem' }}>30 Poin*</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(99, 102, 241, 0.05)', border: '1px solid rgba(99, 102, 241, 0.15)', padding: '10px 14px', borderRadius: 'var(--radius-sm)' }}>
                    <div>
                      <strong style={{ fontSize: '0.9rem' }}>Milestone 2</strong>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>8 Game Badges + 28 Skill Badges</div>
                    </div>
                    <span className="badge" style={{ fontSize: '0.85rem', background: 'rgba(99, 102, 241, 0.2)', color: 'var(--color-primary-light)' }}>50 Poin*</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(6, 182, 212, 0.05)', border: '1px solid rgba(6, 182, 212, 0.15)', padding: '10px 14px', borderRadius: 'var(--radius-sm)' }}>
                    <div>
                      <strong style={{ fontSize: '0.9rem' }}>Milestone 3</strong>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>10 Game Badges + 42 Skill Badges</div>
                    </div>
                    <span className="badge" style={{ fontSize: '0.85rem', background: 'rgba(6, 182, 212, 0.2)', color: 'var(--color-secondary)' }}>70 Poin*</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(245, 158, 11, 0.05)', border: '1px solid rgba(245, 158, 11, 0.15)', padding: '10px 14px', borderRadius: 'var(--radius-sm)' }}>
                    <div>
                      <strong style={{ fontSize: '0.9rem' }}>Ultimate Milestone</strong>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>12 Game Badges + 56 Skill Badges</div>
                    </div>
                    <span className="badge yellow-badge" style={{ fontSize: '0.85rem' }}>90 Poin*</span>
                  </div>
                </div>

              </div>

              {/* Footnote */}
              <div style={{ marginTop: '20px', paddingTop: '14px', borderTop: '1px solid var(--border-color)', fontSize: '0.82rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'flex-start', gap: '6px', lineHeight: '1.45' }}>
                <span style={{ fontSize: '1.1rem' }}>💡</span>
                <div>
                  * Poin di atas sudah termasuk bonus otomatis 10 poin kelayakan pendaftaran. Lencana hanya dihitung jika diselesaikan dari tanggal <strong>13 Juli 2026 hingga 14 September 2026</strong>.
                </div>
              </div>
            </div>

            {/* Quick Teasers */}
            <div className="dashboard-grid">
              <div className="card" style={{ gridColumn: 'span 6' }}>
                <h3 className="card-title"><Info size={18} className="text-blue" /> Tentang Bimbingan</h3>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: 1.6 }}>
                  Pelajari kolaborasi Google Cloud Arcade X Dicoding dan peran bimbingan Kak Rajif dalam mendistribusikan token lab gratis serta menangani error modul.
                </p>
                <button className="btn btn-primary" onClick={() => setActiveTab('tentang')}>Selengkapnya</button>
              </div>

              <div className="card" style={{ gridColumn: 'span 6' }}>
                <h3 className="card-title"><Laptop size={18} className="text-yellow" /> Bagaimana Cara Main?</h3>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: 1.6 }}>
                  Ikuti timeline mudah mendaftar platform, mengklaim kredit, menyelesaikan lab instruksi Google Cloud Console, and menukarkan merchandise.
                </p>
                <button className="btn btn-outline" onClick={() => setActiveTab('cara')}>Langkah Main</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tentang' && (
          <div style={{ padding: '40px 0' }}>
            <div className="section-header text-center">
              <span className="hero-tag"><Info size={14} /> Informasi Program</span>
              <h1 className="hero-title" style={{ fontSize: '2.5rem', marginTop: '10px' }}>Tentang Bimbingan & Program</h1>
              <p className="section-subtitle">Dapatkan pemahaman utuh seputar jalannya event Google Cloud Arcade X Dicoding 2026.</p>
            </div>

            <div className="dashboard-grid">
              <div className="card" style={{ gridColumn: 'span 7' }}>
                <h3 className="card-title" style={{ fontSize: '1.25rem' }}>Mekanisme Gamifikasi Cloud</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 16 }}>
                  <strong>Google Cloud Arcade</strong> adalah program gamifikasi resmi berskala global dari Google Cloud yang bertujuan melatih skill teknologi awan (cloud computing) dan kecerdasan buatan (generative AI) secara gratis.
                </p>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 20 }}>
                  Didampingi oleh <strong>Muhammad Rajif Raditya</strong> sebagai fasilitator berlisensi, kamu akan bergabung ke dalam kelas bimbingan untuk dibantu menyelesaikan lab-lab yang disediakan secara terarah dan gratis tanpa perlu kartu kredit.
                </p>
                
                <div style={{ display: 'flex', gap: '16px', borderTop: '1px solid var(--border-color)', paddingTop: '20px', alignItems: 'center' }}>
                  <div className="avatar" style={{ background: 'var(--grad-green)' }}><Check size={20} /></div>
                  <div>
                    <h5 style={{ fontWeight: 700, fontSize: '0.92rem' }}>Kak Muhammad Rajif Raditya (Fasil)</h5>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Mengoordinasikan token, sharing trik lab tersulit, dan live troubleshooting di grup WA.</p>
                  </div>
                </div>
              </div>

              <div className="card" style={{ gridColumn: 'span 5' }}>
                <h3 className="card-title" style={{ fontSize: '1.1rem' }}>Keuntungan Ikut Bimbingan</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <CheckCircle size={16} className="text-green" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}><strong>Token Lab Gratis:</strong> Akses cloud console tanpa kartu kredit.</p>
                  </div>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <CheckCircle size={16} className="text-green" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}><strong>Group Support WA:</strong> Komunitas aktif berbagi tips.</p>
                  </div>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <CheckCircle size={16} className="text-green" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}><strong>Merchandise Google:</strong> Kesempatan klaim Jaket Hoodie, Ransel, Tumbler gratis ongkir.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'cara' && (
          <div style={{ padding: '40px 0' }}>
            <div className="section-header text-center" style={{ marginBottom: '32px' }}>
              <span className="hero-tag"><Laptop size={14} /> Panduan Pengerjaan</span>
              <h1 className="hero-title" style={{ fontSize: '2.5rem', marginTop: '10px' }}>Langkah Mudah <span className="text-yellow">Mulai Petualanganmu</span></h1>
              <p className="section-subtitle">Ikuti panduan langkah demi langkah ini untuk memastikan kamu mengumpulkan poin dengan benar!</p>
              <div style={{ marginTop: '24px' }}>
                <a 
                  href="https://rsvp.withgoogle.com/events/arcade-fasilitator-id/silabus" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-primary"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 28px', fontSize: '0.95rem' }}
                >
                  <Award size={18} /> Akses Silabus Program
                </a>
              </div>
            </div>

            <div className="guide-timeline" style={{ marginBottom: '60px' }}>
              <div className="timeline-step">
                <div className="timeline-marker">
                  <div className="marker-num">1</div>
                  <div className="marker-line"></div>
                </div>
                <div className="timeline-content-card">
                  <h4>Daftar & Gabung Grup</h4>
                  <p>Daftarkan dirimu melalui link registrasi resmi (saat pendaftaran dibuka) dan pastikan langsung bergabung ke grup WhatsApp Kak Rajif untuk koordinasi.</p>
                </div>
              </div>

              <div className="timeline-step">
                <div className="timeline-marker">
                  <div className="marker-num">2</div>
                  <div className="marker-line"></div>
                </div>
                <div className="timeline-content-card">
                  <h4>Klaim Token & Mulai Lab</h4>
                  <p>Kamu akan mendapatkan token akses gratis. Gunakan token ini untuk meluncurkan Google Cloud Console dan mulai menyelesaikan quest/lab bulanan yang ditentukan.</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '8px', borderTop: '1px solid var(--border-color)', paddingTop: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Info size={12} className="text-blue" /> Cara ini baru akan digunakan setelah kalian mendapatkan email konfirmasi pendaftaran program nanti.
                  </p>
                </div>
              </div>

              <div className="timeline-step">
                <div className="timeline-marker">
                  <div className="marker-num">3</div>
                  <div className="marker-line"></div>
                </div>
                <div className="timeline-content-card">
                  <h4>Kumpulkan Badges & Poin</h4>
                  <p>Selesaikan lab untuk meraih lencana. Ada 2 tipe lencana: <strong>Arcade Game Badge</strong> (1 Poin) dan <strong>Skills Badge</strong> (2 Lencana = 1 Poin). Kumpulkan sebanyak-banyaknya!</p>
                </div>
              </div>

              <div className="timeline-step">
                <div className="timeline-marker">
                  <div className="marker-num">4</div>
                  <div className="marker-line"></div>
                </div>
                <div className="timeline-content-card">
                  <h4>Redeem Swag Impian</h4>
                  <p>Ketika masa "Swag Drop" dibuka, tukarkan akumulasi poinmu di website resmi Arcade Google Cloud dengan merchandise eksklusif pilihanmu.</p>
                </div>
              </div>
            </div>

            {/* Badges Rule Details */}
            <div className="dashboard-grid" style={{ marginTop: '40px' }}>
              <div className="card" style={{ gridColumn: 'span 6', padding: '32px' }}>
                <h3 className="card-title text-blue" style={{ fontSize: '1.25rem', marginBottom: '16px' }}><Laptop size={20} /> 1. Arcade Game Badges (1 Poin)</h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '16px' }}>
                  Setiap bulannya, Google Cloud merilis game bertema spesifik (seperti Trivia, Level 1, Level 2, dll.).
                </p>
                <ul style={{ paddingLeft: '20px', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem', lineHeight: 1.6 }}>
                  <li>Satu game biasanya memuat 4 hingga 8 lab praktik.</li>
                  <li>Tidak ada pengerjaan kuis berulang; Anda cukup menyelesaikan lab hingga mendapat centang hijau.</li>
                  <li>Begitu game terselesaikan 100%, badge digital akan otomatis masuk ke profil Anda dalam waktu 24 jam.</li>
                  <li>Nilai penukaran: <strong>1 Badge = 1 Arcade Point</strong>.</li>
                </ul>
              </div>

              <div className="card" style={{ gridColumn: 'span 6', padding: '32px' }}>
                <h3 className="card-title text-green" style={{ fontSize: '1.25rem', marginBottom: '16px' }}><Award size={20} /> 2. Skill Badges (2 Badges = 1 Poin)</h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '16px' }}>
                  Merupakan lencana yang didapat dengan menyelesaikan rangkaian lab terstruktur yang diakhiri dengan <strong>Challenge Lab</strong>.
                </p>
                <ul style={{ paddingLeft: '20px', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem', lineHeight: 1.6 }}>
                  <li>Challenge Lab menguji kemampuan mandiri Anda (tanpa ada instruksi langkah-langkah di dalam lab).</li>
                  <li>Kak Rajif akan memandu tips mengerjakan Challenge Lab ini lewat video panduan di grup.</li>
                  <li>Skill badge memiliki kredensial resmi yang bisa dipajang di LinkedIn.</li>
                  <li>Nilai penukaran: <strong>2 Badges = 1 Arcade Point</strong>.</li>
                </ul>
              </div>
            </div>

            {/* Date Validation Banner */}
            <div className="card" style={{ marginTop: '24px', padding: '24px', border: '1px solid rgba(245, 158, 11, 0.2)', background: 'rgba(245, 158, 11, 0.03)' }}>
              <p style={{ color: 'var(--color-warning)', fontSize: '0.92rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <AlertTriangle size={16} /> Syarat Validitas Penyelesaian Lencana (Badge):
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', lineHeight: 1.6 }}>
                Lencana (baik Game Badge maupun Skill Badge) hanya akan dihitung masuk ke dalam akumulasi poin program jika diselesaikan <strong>pada atau setelah tanggal 13 Juli 2026 pukul 09:00 WIB</strong> hingga program pendaftaran resmi ditutup pada <strong>14 September 2026 pukul 23:59 WIB</strong>. Lencana yang diselesaikan sebelum tanggal pembukaan tidak akan dihitung oleh sistem otomatis Google Cloud.
              </p>
            </div>

            {/* Video Tutorial Section */}
            <div className="card" style={{ display: 'block', padding: '40px', marginTop: '40px' }}>
              <h3 className="card-title text-blue" style={{ justifyContent: 'center', marginBottom: '16px' }}><Volume2 size={22} /> Panduan Klaim Kredit & Gambaran Pengerjaan Lab</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidt: '700px', margin: '0 auto 24px auto', lineHeight: 1.6, textAlign: 'center' }}>
                Sebelum mulai belajar, tonton video singkat dari YouTube berikut untuk melihat cara melakukan klaim token/kredit gratis serta demo singkat pengerjaan lab di Google Cloud Skills Boost.
              </p>

              <div className="video-container" style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', maxWidth: '700px', margin: '0 auto 24px auto', boxShadow: 'var(--shadow-lg)' }}>
                <iframe 
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }} 
                  src="https://www.youtube.com/embed/3fjIsJTeWfk" 
                  title="Cara Klaim Kredit Google Cloud Skills Boost" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen>
                </iframe>
              </div>

              <div style={{ maxWidth: '700px', margin: '0 auto', background: 'rgba(0, 0, 0, 0.2)', border: '1px solid var(--border-color)', padding: '24px', borderRadius: 'var(--radius-sm)' }}>
                <h4 style={{ color: 'var(--text-main)', marginBottom: '12px', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}><Info size={16} /> Ringkasan Cara Pengerjaan Lab:</h4>
                <ol style={{ paddingLeft: '20px', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.88rem', lineHeight: 1.6 }}>
                  <li>
                    <strong>Login ke Akun Kalian:</strong> Masuk ke platform <a href="https://www.cloudskillsboost.google/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary-light)', textDecoration: 'underline' }}>Google Cloud Skills Boost</a>.
                    <div style={{ marginTop: '6px', paddingLeft: '15px', borderLeft: '2px solid var(--color-primary)', fontSize: '0.82rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span>• <em>Belum punya akun?</em> Silakan klik tombol <strong>Join</strong> di kanan atas. Untuk pendaftaran instan, disarankan memilih opsi <strong>Sign in with Google</strong>.</span>
                      <span>• <em>Notes Batas Usia:</em> Jika umur kalian belum 17 tahun, sesuaikan/tambahkan saja tahun lahir kalian saat mendaftar agar akun bisa sukses dibuat.</span>
                      <span>• <em>Pengaturan Profil Publik (Penting!):</em> Setelah masuk, buka menu Profil kalian (klik foto lingkaran di pojok kanan atas) &rarr; klik <strong>Profile</strong> &rarr; klik tombol <strong>Make Profile Public</strong> (atau <strong>Share Profile</strong> &rarr; <strong>Make Profile Public</strong>) agar lencana kalian tercatat.</span>
                    </div>
                  </li>
                  <li>
                    <strong>Klaim Kredit:</strong> Masukkan kode token gratis yang dibagikan Kak Rajif di menu promo/claim credit.
                    <div style={{ marginTop: '6px', paddingLeft: '15px', borderLeft: '2px solid var(--color-danger)', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                      <span>• <em>Notes Penting:</em> Cara klaim kredit ini baru akan kalian gunakan <strong>setelah kalian mendapatkan email konfirmasi pendaftaran program</strong> resmi nanti.</span>
                    </div>
                  </li>
                  <li><strong>Mulai Lab (Start Lab):</strong> Buka lab yang ditargetkan, lalu klik tombol <strong>"Start Lab"</strong> untuk membuat kredensial Google Cloud Console sementara.</li>
                  <li><strong>Masuk ke Google Cloud Console:</strong> Gunakan username & password sementara yang disediakan di sisi kiri layar (jangan gunakan akun Gmail pribadi kalian).</li>
                  <li><strong>Selesaikan Instruksi:</strong> Ikuti petunjuk praktikum di instruksi lab secara perlahan dan pastikan untuk menekan tombol <strong>"Check my progress"</strong> untuk menyimpan kemajuan kalian hingga meraih skor 100/100.</li>
                  <li><strong>Akhiri Lab:</strong> Klik <strong>"End Lab"</strong> setelah selesai, and pastikan lencana atau status lab berubah menjadi centang hijau/selesai.</li>
                </ol>
              </div>

              {/* Rekomendasi Video Tutorial */}
              <div className="card" style={{ padding: '30px', marginTop: '30px', border: '1px solid var(--border-color)', background: 'rgba(0, 0, 0, 0.1)' }}>
                <h4 style={{ color: 'var(--text-main)', marginBottom: '16px', fontSize: '1.05rem', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}><Laptop size={18} /> Rekomendasi Video Tutorial Pengerjaan Lab Populer</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', textAlign: 'center', marginBottom: '20px', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.5 }}>
                  Berikut adalah beberapa video panduan pengerjaan lab dasar Google Cloud Skills Boost dari komunitas yang bisa kalian tonton agar memiliki gambaran saat menyelesaikan tantangan:
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', maxWidth: '700px', margin: '0 auto' }}>
                  {/* Lab Video 1 */}
                  <a href="https://www.youtube.com/watch?v=NQPJlZkenrY" target="_blank" rel="noopener noreferrer" style={{ display: 'block', textDecoration: 'none', borderRadius: 'var(--radius-sm)', overflow: 'hidden', border: '1px solid var(--border-color)', transition: 'transform 0.3s ease, box-shadow 0.3s ease', background: 'rgba(255,255,255,0.01)' }} className="video-card-hover">
                    <div style={{ backgroundImage: "linear-gradient(135deg, rgba(66, 133, 244, 0.15), rgba(244, 180, 0, 0.15)), url('https://img.youtube.com/vi/NQPJlZkenrY/hqdefault.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', height: '160px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(9, 13, 22, 0.45)', zIndex: 1 }}></div>
                      <div style={{ width: '48px', height: '48px', background: 'var(--color-danger)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2, boxShadow: '0 0 15px rgba(239, 68, 68, 0.5)' }}>
                        <ArrowRight size={18} style={{ color: '#ffffff' }} />
                      </div>
                    </div>
                    <div style={{ padding: '12px' }}>
                      <h5 style={{ color: '#ffffff', fontSize: '0.85rem', margin: '0 0 4px 0', fontWeight: 600, lineHieght: 1.3 }}>Build Infrastructure with Terraform on Google Cloud: Challenge Lab #GSP345</h5>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', margin: 0, lineHeight: 1.4 }}>Kurang lebih ini gambaran cara menyelesaikan Challenge Lab menggunakan Terraform.</p>
                    </div>
                  </a>

                  {/* Lab Video 2 */}
                  <a href="https://www.youtube.com/watch?v=M-VF9yVx8LU" target="_blank" rel="noopener noreferrer" style={{ display: 'block', textDecoration: 'none', borderRadius: 'var(--radius-sm)', overflow: 'hidden', border: '1px solid var(--border-color)', transition: 'transform 0.3s ease, box-shadow 0.3s ease', background: 'rgba(255,255,255,0.01)' }} className="video-card-hover">
                    <div style={{ backgroundImage: "linear-gradient(135deg, rgba(66, 133, 244, 0.15), rgba(244, 180, 0, 0.15)), url('https://img.youtube.com/vi/M-VF9yVx8LU/hqdefault.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', height: '160px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(9, 13, 22, 0.45)', zIndex: 1 }}></div>
                      <div style={{ width: '48px', height: '48px', background: 'var(--color-danger)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2, boxShadow: '0 0 15px rgba(239, 68, 68, 0.5)' }}>
                        <ArrowRight size={18} style={{ color: '#ffffff' }} />
                      </div>
                    </div>
                    <div style={{ padding: '12px' }}>
                      <h5 style={{ color: '#ffffff', fontSize: '0.85rem', margin: '0 0 4px 0', fontWeight: 600, lineHeight: 1.3 }}>Get Started with Security Command Center #GSP1124</h5>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', margin: 0, lineHeight: 1.4 }}>Kurang lebih ini gambaran cara mengaktifkan dan mengonfigurasi Security Command Center.</p>
                    </div>
                  </a>
                </div>
              </div>

            </div>
          </div>
        )}

        {activeTab === 'qna' && (
          <div style={{ padding: '40px 0' }}>
            <div className="section-header text-center">
              <span className="hero-tag"><HelpCircle size={14} /> FAQ Portal</span>
              <h1 className="hero-title" style={{ fontSize: '2.5rem', marginTop: '10px' }}>Pertanyaan Sering Diajukan</h1>
              <p className="section-subtitle">Temukan jawaban instan atas kendala umum pendaftaran and pengerjaan lab cloud.</p>
            </div>

            <div className="faq-search-box">
              <Search size={18} className="text-muted" />
              <input 
                type="text" 
                placeholder="Cari pertanyaan... (contoh: 'gratis', 'token', 'swag')" 
                value={faqSearch} 
                onChange={(e) => setFaqSearch(e.target.value)}
              />
            </div>

            <div className="accordion-wrapper">
              {faqData
                .filter(faq => {
                  const q = faq.q.toLowerCase();
                  const a = faq.a.toLowerCase();
                  const k = faq.k.toLowerCase();
                  const search = faqSearch.toLowerCase();
                  return q.includes(search) || a.includes(search) || k.includes(search);
                })
                .map((faq, index) => (
                  <div key={index} className={`acc-card ${openFaqIndex === index ? 'open' : ''}`}>
                    <div className="acc-trigger" onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}>
                      <h4>{faq.q}</h4>
                      <span className="acc-arrow"><Plus size={16} /></span>
                    </div>
                    <div className="acc-body" style={{ maxHeight: openFaqIndex === index ? '300px' : '0' }}>
                      <div className="acc-body-content">
                        {faq.a}
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        )}

        {activeTab === 'komunitas' && (
          <div style={{ padding: '40px 0' }}>
            <div className="section-header text-center">
              <span className="hero-tag"><Users size={14} /> Networking Hub</span>
              <h1 className="hero-title" style={{ fontSize: '2.5rem', marginTop: '10px' }}>Komunitas & Hubungan Sosial</h1>
              <p className="section-subtitle">Bergabung dengan grup bimbingan WA and tambahkan jejaring sosial sesama peserta.</p>
            </div>

            <div className="dashboard-grid">
              
              {/* WhatsApp card */}
              <div className="card" style={{ gridColumn: 'span 12', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '20px', padding: '28px 36px', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(5, 150, 105, 0.03) 100%)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                <div style={{ flex: '1', minWidth: '280px' }}>
                  <h3 className="card-title" style={{ fontSize: '1.4rem', margin: 0, color: 'var(--color-success)' }}><Users size={24} className="text-green" /> Hub Diskusi WhatsApp</h3>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6, marginTop: '8px', marginBottom: 0 }}>
                    Diskusi eror modul lab, tukar lencana, and info Swag Drop akan dibagikan berkala di grup WA Kak Rajif. Masuk ke grup bimbingan sekarang:
                  </p>
                </div>
                <div>
                  <a href={CONFIG.WA_LINK} target="_blank" rel="noopener noreferrer" className="btn btn-success" style={{ padding: '14px 28px', fontSize: '1rem' }}>
                    Gabung Grup WhatsApp
                  </a>
                </div>
              </div>

              {/* Social Mutuals */}
              <div className="card" style={{ gridColumn: 'span 12' }}>
                <h3 className="card-title" style={{ fontSize: '1.4rem', marginBottom: '24px' }}><Share2 size={24} className="text-blue" /> Mutualan Sosial Media</h3>
                <div className="mutuals-layout">
                  
                  <div className="mutuals-tabs-row">
                    <button className={`tab-btn ${activeMutualTab === 'instagram' ? 'active' : ''}`} onClick={() => setActiveMutualTab('instagram')}><Instagram size={14} /> Instagram</button>
                    <button className={`tab-btn ${activeMutualTab === 'linkedin' ? 'active' : ''}`} onClick={() => setActiveMutualTab('linkedin')}><Linkedin size={14} /> LinkedIn</button>
                    <button className={`tab-btn ${activeMutualTab === 'github' ? 'active' : ''}`} onClick={() => setActiveMutualTab('github')}><Github size={14} /> GitHub</button>
                  </div>

                  <div className="faq-search-box" style={{ marginBottom: '12px' }}>
                    <Search size={16} />
                    <input 
                      type="text" 
                      placeholder="Cari nama peserta..." 
                      value={mutualsSearch}
                      onChange={(e) => setMutualsSearch(e.target.value)}
                    />
                  </div>

                  <div className="mutual-cards-grid">
                    {submittedMutuals
                      .filter(user => user.platform === activeMutualTab && user.username.toLowerCase().includes(mutualsSearch.toLowerCase()))
                      .map((user, idx) => (
                        <div key={idx} className="mutual-user-card">
                          <div className="user-info">
                            <div className="user-avatar-icon">
                              {activeMutualTab === 'instagram' && <Instagram size={12} />}
                              {activeMutualTab === 'linkedin' && <Linkedin size={12} />}
                              {activeMutualTab === 'github' && <Github size={12} />}
                            </div>
                            <div className="user-details">
                              <h5>{user.username}</h5>
                              <span>{user.role}</span>
                            </div>
                          </div>
                          <a href={user.link} target="_blank" rel="noopener noreferrer" className="user-follow-link"><Plus size={12} /></a>
                        </div>
                      ))
                    }
                  </div>

                  {/* Submission Form */}
                  <div className="submit-profile-form">
                    <h5 style={{ fontSize: '0.85rem', marginBottom: '12px' }}>Tambah Tautan Profilmu:</h5>
                    <form onSubmit={handleMutualSubmit} className="form-row">
                      <div className="input-group">
                        <select value={newMutual.platform} onChange={(e) => setNewMutual(prev => ({ ...prev, platform: e.target.value }))}>
                          <option value="instagram">Instagram</option>
                          <option value="linkedin">LinkedIn</option>
                          <option value="github">GitHub</option>
                        </select>
                      </div>
                      <div className="input-group">
                        <input 
                          type="text" 
                          placeholder="Username" 
                          value={newMutual.username} 
                          onChange={(e) => setNewMutual(prev => ({ ...prev, username: e.target.value }))}
                          required 
                        />
                      </div>
                      <div className="input-group">
                        <input 
                          type="url" 
                          placeholder="Link tautan profil" 
                          value={newMutual.link} 
                          onChange={(e) => setNewMutual(prev => ({ ...prev, link: e.target.value }))}
                          required 
                        />
                      </div>
                      <button type="submit" className="btn btn-primary" style={{ padding: '10px 18px' }}><Send size={14} /></button>
                    </form>
                    {mutualSuccess && (
                      <div className="copy-status-tip" style={{ color: 'var(--color-success)', marginTop: '8px' }}>
                        Tautan profilmu berhasil didaftarkan! Akan segera ditinjau admin.
                      </div>
                    )}
                  </div>

                </div>
              </div>

            </div>
          </div>
        )}

        {activeTab === 'skills' && (
          <div style={{ padding: '40px 0' }}>
            <div className="section-header text-center">
              <span className="hero-tag"><Laptop size={14} /> Panduan Platform</span>
              <h1 className="hero-title" style={{ fontSize: '2.5rem', marginTop: '10px' }}>Panduan Pendaftaran <span className="text-blue">Skills Google</span></h1>
              <p className="section-subtitle">Pelajari tata cara mendaftarkan profil Google Cloud Skills Boost dan mengatasi kendala teknis.</p>
            </div>

            <div className="dashboard-grid">
              <div className="card guide-container-card" style={{ gridColumn: 'span 12' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                  <div className="guide-highlight-box guide-highlight-danger">
                    <h4 className="guide-highlight-title" style={{ color: 'var(--color-danger)' }}>⚠️ Ketentuan Umur Minimum</h4>
                    <p className="guide-text">
                      Saat meregistrasikan akun di portal Skills Boost, pastikan pengaturan tahun lahirmu dikonfigurasikan agar umurmu <strong>di atas 17 tahun</strong>. Jika data umur dideteksi di bawah 17 tahun, sistem Google akan otomatis menolak pembuatan akun baru demi mematuhi regulasi privasi anak.
                    </p>
                  </div>

                  <div className="guide-highlight-box guide-highlight-warning">
                    <h4 className="guide-highlight-title" style={{ color: 'var(--color-warning)' }}>🤖 Mengatasi Masalah Captcha Gagal</h4>
                    <p className="guide-text" style={{ marginBottom: '12px' }}>
                      Banyak peserta menemui kendala di mana verifikasi captcha terus-menerus gagal atau tombol daftar membeku. Berikut langkah alternatif penyelesaiannya:
                    </p>
                    <ul className="guide-list">
                      <li><strong>Beralih Jaringan Internet:</strong> Beralihlah dari Wi-Fi ke data seluler (atau sebaliknya) untuk mereset reputasi IP koneksimu.</li>
                      <li><strong>Mode Incognito:</strong> Buka jendela penyamaran browser untuk menghindari cookie/cache lama yang rusak.</li>
                      <li><strong>Gunakan HP:</strong> Seringkali pengisian captcha melalui browser handphone memiliki tingkat keberhasilan lebih tinggi.</li>
                    </ul>
                  </div>

                  <div className="guide-highlight-box guide-highlight-success">
                    <h4 className="guide-highlight-title" style={{ color: 'var(--color-success)' }}>📝 Prosedur Pembuatan Profil</h4>
                    <ol className="guide-list">
                      <li>Kunjungi halaman resmi Google Cloud Skills Boost di <a href="https://www.cloudskillsboost.google/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary-light)', textDecoration: 'underline' }}>skills.google</a>.</li>
                      <li>Pilih menu <strong>"Join"</strong> di bagian kanan atas layar.</li>
                      <li>Pilihlah metode pendaftaran instan <strong>"Sign in with Google"</strong> agar sinkronisasi email lebih aman.</li>
                      <li>Atur tahun lahir agar terbaca di atas 17 tahun.</li>
                      <li>Setelah berhasil login, masuk ke <strong>Profile</strong> &rarr; klik tombol <strong>Share Profile</strong> &rarr; klik <strong>Make Profile Public</strong>. Ini wajib dilakukan agar lencana dapat diverifikasi oleh admin. Silahkan klik <a href="https://drive.google.com/file/d/1x9MZkZ3Pv456832fVidcLAlgtYVMWtw-/view?usp=sharing" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary-light)', textDecoration: 'underline', fontWeight: 600 }}>panduan</a> untuk panduan visual lengkap.</li>
                    </ol>
                  </div>
                </div>
              </div>

              <div className="card text-center" style={{ gridColumn: 'span 12', maxWidth: '900px', margin: '0 auto' }}>
                <h3 className="card-title" style={{ justifyContent: 'center' }}><CheckCircle size={18} className="text-green" /> Contoh Profil Terverifikasi</h3>
                <div style={{ marginTop: '16px', borderRadius: 'var(--radius-sm)', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                  <img 
                    src="/google_skill.png" 
                    alt="Contoh Google Skill Public Profile" 
                    style={{ width: '100%', height: 'auto', display: 'block' }} 
                  />
                </div>
                <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '16px', lineHeight: 1.45 }}>
                  Pastikan status lencana dan URL profilmu diatur menjadi <strong>Public</strong> seperti contoh visual di atas agar poinmu sah dihitung di leaderboard bimbingan.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'gear' && (
          <div style={{ padding: '40px 0' }}>
            <div className="section-header text-center">
              <span className="hero-tag"><Laptop size={14} /> Developer Program</span>
              <h1 className="hero-title" style={{ fontSize: '2.5rem', marginTop: '10px' }}>Panduan Pendaftaran <span className="text-green">Google GEAR</span></h1>
              <p className="section-subtitle">Pelajari petunjuk registrasi Google Developer Program (GEAR) dan tata cara pengisian profilnya.</p>
            </div>

            <div className="dashboard-grid">
              <div className="card guide-container-card" style={{ gridColumn: 'span 12' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                  <div className="guide-highlight-box guide-highlight-primary">
                    <h4 className="guide-highlight-title" style={{ color: 'var(--color-primary)' }}>🏢 Mengisi Kolom Institusi / Komunitas</h4>
                    <p className="guide-text" style={{ marginBottom: '12px' }}>
                      Banyak pendaftar bingung mengisi kolom <strong>Institusi</strong> atau <strong>Komunitas</strong> di form pendaftaran program developer Google. Silakan isi sesuai statusmu saat ini:
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <p className="guide-text">• <strong>Sekolah (SD/SMP/SMA):</strong> Isilah kolom institusi dengan <strong>Nama Sekolah Lengkap</strong> (contoh: SMAN 8 Jakarta).</p>
                      <p className="guide-text">• <strong>Mahasiswa Kuliah:</strong> Isilah dengan <strong>Nama Kampus/Universitas</strong> (contoh: Universitas Indonesia).</p>
                      <p className="guide-text">• <strong>Sudah Bekerja / Lainnya:</strong> Isilah dengan <strong>Nama Perusahaan</strong> atau nama <strong>Pendidikan Terakhir</strong> kalian.</p>
                    </div>
                  </div>

                  <div className="guide-highlight-box guide-highlight-success">
                    <h4 className="guide-highlight-title" style={{ color: 'var(--color-success)' }}>📝 Alur Pendaftaran GEAR</h4>
                    <ol className="guide-list">
                      <li>Buka halaman pendaftaran Google GEAR di <a href="https://developers.google.com/program/gear" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary-light)', textDecoration: 'underline' }}>developers.google.com/program/gear</a>.</li>
                      <li>Klik tombol hijau <strong>"Join Google Developer Program"</strong>.</li>
                      <li>Lakukan login menggunakan akun Google/Gmail kalian.</li>
                      <li>Lengkapi form isian data diri, isi kolom institusi sesuai panduan di atas.</li>
                      <li>Setujui syarat pendaftaran, klik submit, and simpan tangkapan layar dasbor suksesmu.</li>
                    </ol>
                  </div>
                </div>
              </div>

              <div className="card text-center" style={{ gridColumn: 'span 12', maxWidth: '900px', margin: '0 auto' }}>
                <h3 className="card-title" style={{ justifyContent: 'center' }}><CheckCircle size={18} className="text-green" /> Contoh Dasbor Sukses</h3>
                <div style={{ marginTop: '16px', borderRadius: 'var(--radius-sm)', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                  <img 
                    src="/Gear.png" 
                    alt="Contoh Google GEAR Dashboard" 
                    style={{ width: '100%', height: 'auto', display: 'block' }} 
                  />
                </div>
                <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '16px', lineHeight: 1.45 }}>
                  Visual di atas merepresentasikan tampilan lencana dasbor Google Developer Program setelah pendaftaran GEAR kamu sukses disetujui.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Anonymous Feedback Section */}
      </main>

      {/* Floating Chatbot assistant widget */}
      <div className="chat-container">
        <button className="chat-toggle" onClick={() => setChatOpen(!chatOpen)} aria-label="Toggle Chatbot">
          <MessageSquare size={20} />
        </button>

        {chatOpen && (
          <div className="chat-window">
            <div className="chat-header">
              <div className="chat-online-dot"></div>
              <div>
                <h4>ArcBot Asisten</h4>
                <span>Online - Fasil Rajif</span>
              </div>
            </div>

            <div className="chat-body">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`chat-msg ${msg.isBot ? 'bot' : 'user'}`} dangerouslySetInnerHTML={{ __html: msg.text }}></div>
              ))}
              {chatTyping && (
                <div className="chat-msg bot chat-typing">
                  <div className="dot-bounce"></div>
                  <div className="dot-bounce"></div>
                  <div className="dot-bounce"></div>
                </div>
              )}
              <div ref={chatEndRef} />

              <div className="chat-quickopts">
                <button className="chat-opt-btn" onClick={() => handleSendChat("apa itu arcade")}>🤔 Apa itu Arcade?</button>
                <button className="chat-opt-btn" onClick={() => handleSendChat("cara daftar")}>📝 Cara Daftar?</button>
                <button className="chat-opt-btn" onClick={() => handleSendChat("grup whatsapp")}>💬 Join WA</button>
                <button className="chat-opt-btn" onClick={() => handleSendChat("swag hadiah")}>🎁 Swag Hadiah</button>
              </div>
            </div>

            <div className="chat-footer">
              <input 
                type="text" 
                placeholder="Ketik pesan..." 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
              />
              <button onClick={() => handleSendChat()} aria-label="Kirim"><Send size={14} /></button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-content">
          <div className="footer-logo">
            <span className="g-blue">G</span><span className="g-red">o</span><span className="g-yellow">o</span><span
              className="g-blue">g</span><span className="g-green">l</span><span className="g-red">e</span> Arcade
          </div>
          <p className="footer-tagline">Portal Bimbingan oleh Fasilitator Muhammad Rajif Raditya</p>

          <div className="footer-socials">
            <a href="https://www.linkedin.com/in/rajifraditya" target="_blank" rel="noopener noreferrer" className="social-link"><Linkedin size={16} /></a>
            <a href="https://www.instagram.com/rajif_raditya/" target="_blank" rel="noopener noreferrer" className="social-link"><Instagram size={16} /></a>
            <a href="https://github.com/Chartzh/" target="_blank" rel="noopener noreferrer" className="social-link"><Github size={16} /></a>
          </div>

          <div className="footer-divider"></div>

          <p className="footer-legal">
            <strong>Disclaimer Hukum:</strong> Situs web ini dibangun secara independen oleh Muhammad Rajif Raditya untuk keperluan bimbingan belajar komunitas peserta program Google Cloud Arcade X Dicoding. Seluruh merek dagang, logo, materi pembelajaran, dan hak kekayaan intelektual terkait Google Cloud, Google Cloud Skills Boost, dan Dicoding adalah milik masing-masing entitas tersebut.
          </p>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '12px' }}>
            &copy; 2026 Muhammad Rajif Raditya. All Rights Reserved. Built with <Heart size={10} className="text-red" style={{ display: 'inline', fill: 'var(--color-danger)' }} /> for Indonesian Tech Community.
          </p>
        </div>
      </footer>
    </>
  );
}
