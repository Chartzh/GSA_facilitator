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
  AlertTriangle
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
  REGISTRATION_LINK: "https://docs.google.com/forms/d/e/1FAIpQLSfvBy0GqZPZpzC3aa6TKB5q3CMV9124cbsX4Ytv95O_plxN5w/viewform?resourcekey=0-zGX30xoG2JuARKgKrOztow",
  TARGET_DATE: new Date("2026-07-13T09:00:00+07:00"),
  ANONYMOUS_FORM_URL: "https://docs.google.com/forms/d/e/1FAIpQLSdjykb5NiyW57GowHRhFOyuE9GvjwcVsF8smy7dGq77vGreIw/formResponse",
  ANONYMOUS_ENTRY_ID: "entry.1958733736",
  MUTUAL_FORM_URL: "https://docs.google.com/forms/d/e/1FAIpQLScrReJb1rJeHNA2AZFyHoTweVUlPS9AB8dl-RSYt0HJpflvxw/formResponse",
  MUTUAL_ENTRY_ID: "entry.1233135674"
};

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [theme, setTheme] = useState('dark');
  const [copied, setCopied] = useState(false);
  const [countdown, setCountdown] = useState({ days: '--', hours: '--', minutes: '--', seconds: '--' });
  const [isRegOpen, setIsRegOpen] = useState(false);

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

  // Points Calculator State
  const [calcGameBadges, setCalcGameBadges] = useState(6);
  const [calcSkillBadges, setCalcSkillBadges] = useState(14);
  const [calcResult, setCalcResult] = useState({ points: 30, tier: '', desc: '' });

  useEffect(() => {
    let games = Math.max(0, calcGameBadges);
    let skills = Math.max(0, calcSkillBadges);
    let points = games + Math.floor(skills / 2);
    let tier = "Belum Lolos Milestone";
    let desc = "Kumpulkan minimal 6 Game Badges & 14 Skill Badges untuk meraih Milestone 1 (Novice Tier - 30 Poin).";

    if (games >= 12 && skills >= 56) {
      points = 90;
      tier = "🏆 Ultimate Milestone (90 Poin)";
      desc = "Luar biasa! Kamu berhak menukarkan swag Tier Tertinggi (Ultimate) seperti Jaket Hoodie premium, Ransel eksklusif, dll.";
    } else if (games >= 10 && skills >= 42) {
      points = 70;
      tier = "🥇 Milestone 3 (70 Poin)";
      desc = "Hebat! Kamu berhak mengklaim swag Tier 3 (Champion Tier) seperti Hoodie, Deskmat besar Google, dll.";
    } else if (games >= 8 && skills >= 28) {
      points = 50;
      tier = "🥈 Milestone 2 (50 Poin)";
      desc = "Keren! Kamu masuk Milestone 2. Berhak mengklaim swag Tier 2 seperti Tumbler, Speaker Kapsul, dan Kaos.";
    } else if (games >= 6 && skills >= 14) {
      points = 30;
      tier = "🥉 Milestone 1 (30 Poin)";
      desc = "Selamat! Kamu lolos Milestone minimal kelayakan. Berhak mengklaim swag Tier 1 (Novice Tier) seperti Kaos Google Cloud.";
    } else {
      points = games + Math.floor(skills / 2);
      tier = "Belum Lolos Milestone";
      desc = `Butuh ${Math.max(0, 6 - games)} Game Badges dan ${Math.max(0, 14 - skills)} Skill Badges lagi untuk lolos Milestone 1.`;
    }

    setCalcResult({ points, tier, desc });
  }, [calcGameBadges, calcSkillBadges]);

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

  // Swag Gallery Modal state
  const [selectedSwag, setSelectedSwag] = useState(null);

  const swagData = [
    { id: 1, name: "Hoodie Premium", tier: "Champion Tier", icon: Laptop, color: "#a855f7", desc: "Hoodie hitam tebal premium dengan detail jahitan rapi dan print logo minimalis Google Cloud di bagian dada." },
    { id: 2, name: "Ergonomic Backpack", tier: "Champion Tier", icon: Backpack, color: "#3b82f6", desc: "Tas ransel laptop anti-air dengan desain minimalis, kompartemen aman, dan gantungan khusus aksesoris Google." },
    { id: 3, name: "Bluetooth Speaker", tier: "Milestone 2 Tier", icon: Volume2, color: "#10b981", desc: "Speaker nirkabel berbentuk kapsul portabel berkualitas suara jernih dengan logo branding warna-warni Google." },
    { id: 4, name: "Collapsible Tumbler", tier: "Milestone 1 Tier", icon: Gift, color: "#f59e0b", desc: "Botol minum ramah lingkungan yang dapat dilipat terbuat dari silikon premium bebas BPA." },
    { id: 5, name: "JuaraGCP T-Shirt", tier: "Novice Tier", icon: Heart, color: "#ef4444", desc: "Kaos katun premium berkualitas tinggi bertema JuaraGCP dengan cutting modern yang nyaman dipakai." },
    { id: 6, name: "Logo Bricks Set", tier: "Milestone 2 Tier", icon: Sparkles, color: "#06b6d4", desc: "Mainan bongkar pasang (Bricks Set) edisi khusus berdesain logo utama Google Cloud untuk pajangan meja belajar." }
  ];

  // Social Mutuals State
  const [mutualsSearch, setMutualsSearch] = useState('');
  const [activeMutualTab, setActiveMutualTab] = useState('instagram');
  const [submittedMutuals, setSubmittedMutuals] = useState([
    { platform: 'instagram', username: '@rajif_raditya', role: 'Fasilitator (Admin)', link: 'https://instagram.com' },
    { platform: 'instagram', username: '@ahmad_cloud', role: 'Peserta', link: '#' },
    { platform: 'instagram', username: '@siti_dev', role: 'Peserta', link: '#' },
    { platform: 'linkedin', username: 'Muhammad Rajif Raditya', role: 'Fasilitator (Admin)', link: 'https://linkedin.com' },
    { platform: 'linkedin', username: 'Budi Santoso', role: 'Peserta', link: '#' },
    { platform: 'github', username: 'rajif-raditya', role: 'Fasilitator (Admin)', link: 'https://github.com' },
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

  // Feedback Form State
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (!feedbackMsg.trim()) return;

    const formData = new URLSearchParams();
    formData.append(CONFIG.ANONYMOUS_ENTRY_ID, feedbackMsg);

    fetch(CONFIG.ANONYMOUS_FORM_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData.toString()
    }).catch(err => console.warn('Background submission error ignored'));

    setFeedbackSuccess(true);
    setFeedbackMsg('');
    setTimeout(() => setFeedbackSuccess(false), 5000);
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
        reply = `Swag premium seperti Jaket Hoodie, Ransel laptop, Speaker bluetooth, Collapsible Tumbler, dan Bricks Set bisa ditukarkan dengan poin hasil pengumpulan lencana praktikum lab. Cek tab **Galeri Swag** di atas untuk melihat preview!`;
      } else if (query.includes('poin') || query.includes('point') || query.includes('hitung') || query.includes('badge')) {
        reply = `Sistem poin resmi:<br>
        • <strong>1 Arcade Game Badge</strong> = 1 Poin.<br>
        • <strong>2 Skill Badges</strong> = 1 Poin.<br><br>
        Gunakan kalkulator poin di beranda untuk mensimulasikan pencapaian Milestone kamu!`;
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
      {/* Disclaimer bar */}
      <div className="disclaimer-bar" id="disclaimer-bar">
        <div className="container">
          <span className="badge red-badge" style={{ marginRight: '8px' }}>Info Fasilitator</span>
          Situs bimbingan mandiri oleh <strong>Muhammad Rajif Raditya</strong>. Website ini <strong>BUKAN</strong> portal resmi Google / Dicoding.
        </div>
      </div>

      {/* Header */}
      <header className="header" id="main-header">
        <div className="container nav-container">
          <div className="logo-link" id="logo-brand">
            <span className="g-blue">G</span><span className="g-red">o</span><span class="g-yellow">o</span><span
              className="g-blue">g</span><span className="g-green">l</span><span className="g-red">e</span>
            <span className="logo-arcade" id="logo-arcade-txt">Arcade</span>
          </div>

          <nav id="desktop-navigation">
            <ul className="nav-menu">
              <li><span className={`nav-item-link ${activeTab === 'home' ? 'active' : ''}`} onClick={() => setActiveTab('home')}>Home</span></li>
              <li><span className={`nav-item-link ${activeTab === 'tentang' ? 'active' : ''}`} onClick={() => setActiveTab('tentang')}>Tentang</span></li>
              <li><span className={`nav-item-link ${activeTab === 'cara' ? 'active' : ''}`} onClick={() => setActiveTab('cara')}>Cara Bermain</span></li>
              <li><span className={`nav-item-link ${activeTab === 'swag' ? 'active' : ''}`} onClick={() => setActiveTab('swag')}>Swag</span></li>
              <li><span className={`nav-item-link ${activeTab === 'qna' ? 'active' : ''}`} onClick={() => setActiveTab('qna')}>QnA</span></li>
              <li><span className={`nav-item-link ${activeTab === 'komunitas' ? 'active' : ''}`} onClick={() => setActiveTab('komunitas')}>Komunitas</span></li>
              <li><span className={`nav-item-link ${activeTab === 'skills' ? 'active' : ''}`} onClick={() => setActiveTab('skills')}>Panduan Skills</span></li>
              <li><span className={`nav-item-link ${activeTab === 'gear' ? 'active' : ''}`} onClick={() => setActiveTab('gear')}>Panduan GEAR</span></li>
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
                <div className="hero-tag">
                  <Sparkles size={14} /> Halo! Selamat Datang di Portal Kak Rajif
                </div>
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

            {/* In-page Point Calculator Card */}
            <div className="card" style={{ marginTop: '48px' }}>
              <div className="calc-widget">
                
                <div className="calc-sliders">
                  <h3 className="card-title"><Calculator size={20} className="text-blue" /> Kalkulator Target Poin Swag</h3>
                  <div className="slider-group">
                    <label className="slider-label">
                      Game Badges (Trivia / Bulanan) <span>{calcGameBadges} Lencana</span>
                    </label>
                    <div className="calc-input-row">
                      <button onClick={() => setCalcGameBadges(prev => Math.max(0, prev - 1))} aria-label="Kurang"><Minus size={14} /></button>
                      <input type="number" value={calcGameBadges} onChange={(e) => setCalcGameBadges(Math.max(0, parseInt(e.target.value) || 0))} aria-label="Game badges count" />
                      <button onClick={() => setCalcGameBadges(prev => prev + 1)} aria-label="Tambah"><Plus size={14} /></button>
                    </div>
                  </div>

                  <div className="slider-group">
                    <label className="slider-label">
                      Skill Badges (Challenge Labs) <span>{calcSkillBadges} Lencana</span>
                    </label>
                    <div className="calc-input-row">
                      <button onClick={() => setCalcSkillBadges(prev => Math.max(0, prev - 1))} aria-label="Kurang"><Minus size={14} /></button>
                      <input type="number" value={calcSkillBadges} onChange={(e) => setCalcSkillBadges(Math.max(0, parseInt(e.target.value) || 0))} aria-label="Skill badges count" />
                      <button onClick={() => setCalcSkillBadges(prev => prev + 1)} aria-label="Tambah"><Plus size={14} /></button>
                    </div>
                  </div>
                </div>

                <div className="calc-scorecard">
                  <span style={{ fontSize: '0.76rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700 }}>Total Estimasi Poin</span>
                  <div className="calc-points text-yellow">{calcResult.points}</div>
                  <div className="calc-tier-title text-blue">{calcResult.tier}</div>
                  <p className="calc-tier-desc">{calcResult.desc}</p>
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
            <div className="section-header text-center">
              <span className="hero-tag"><Laptop size={14} /> Panduan Pengerjaan</span>
              <h1 className="hero-title" style={{ fontSize: '2.5rem', marginTop: '10px' }}>Cara Memulai & Mengerjakan</h1>
              <p className="section-subtitle">Ikuti timeline pengerjaan praktikum di bawah ini agar pencapaianmu sah.</p>
            </div>

            <div className="guide-timeline">
              <div className="timeline-step">
                <div className="timeline-marker">
                  <div className="marker-num">1</div>
                  <div className="marker-line"></div>
                </div>
                <div className="timeline-content-card">
                  <h4>Daftarkan Akun & Public Profile</h4>
                  <p>Buat akun di platform Google Cloud Skills Boost. Buka profil and setel menjadi **Public Profile** agar lencana yang kamu peroleh bisa di-track fasilitator.</p>
                </div>
              </div>

              <div className="timeline-step">
                <div className="timeline-marker">
                  <div className="marker-num">2</div>
                  <div className="marker-line"></div>
                </div>
                <div className="timeline-content-card">
                  <h4>Klaim Token Promo Code</h4>
                  <p>Gunakan kode token promo kredit gratis yang Kak Rajif bagikan berkala di grup WA, masukkan di menu klaim kredit agar saldo Console-mu terisi.</p>
                </div>
              </div>

              <div className="timeline-step">
                <div className="timeline-marker">
                  <div className="marker-num">3</div>
                  <div className="marker-line"></div>
                </div>
                <div className="timeline-content-card">
                  <h4>Selesaikan Tantangan Lab (Skor 100)</h4>
                  <p>Buka instruksi lab, tekan **Start Lab**, masuk ke Google Console memakai detail akun sementara dari sistem, selesaikan tugas hingga skor 100/100, lalu klik **End Lab**.</p>
                </div>
              </div>

              <div className="timeline-step">
                <div className="timeline-marker">
                  <div className="marker-num">4</div>
                  <div className="marker-line"></div>
                </div>
                <div className="timeline-content-card">
                  <h4>Redeem Poin Swag Store</h4>
                  <p>Tukarkan total poin yang dikumpulkan dari lencana di Swag Store resmi Google Cloud di akhir periode musim bimbingan.</p>
                </div>
              </div>
            </div>

            {/* Video tutorial */}
            <div className="card" style={{ marginTop: '40px', textAlign: 'center' }}>
              <h3 className="card-title" style={{ justifyContent: 'center' }}><Volume2 size={20} className="text-blue" /> Video Demo Klaim Kredit & Lab</h3>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: '24px', maxWidth: '600px', margin: '0 auto 24px auto' }}>
                Tonton video unboxing kredit promo dan langkah pengerjaan lab di Google Cloud Console berikut untuk gambaran belajarmu.
              </p>
              <div className="video-container" style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: 'var(--radius-md)', maxWidth: '650px', margin: '0 auto' }}>
                <iframe 
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }} 
                  src="https://www.youtube.com/embed/3fjIsJTeWfk" 
                  title="Cara Klaim Kredit Google Cloud Skills Boost" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen>
                </iframe>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'swag' && (
          <div style={{ padding: '40px 0' }}>
            <div className="section-header text-center">
              <span className="hero-tag"><Gift size={14} /> Swag Shop Showcase</span>
              <h1 className="hero-title" style={{ fontSize: '2.5rem', marginTop: '10px' }}>Inspirasi Hadiah Swag</h1>
              <p className="section-subtitle">Daftar item merchandise premium dari musim terdahulu untuk memacumu belajar.</p>
            </div>

            <div className="glass" style={{ padding: '20px', borderLeft: '4px solid var(--color-warning)', background: 'rgba(245, 158, 11, 0.01)', marginBottom: '32px' }}>
              <div style={{ display: 'flex', gap: '10px', color: 'var(--text-main)', fontWeight: 700, fontSize: '0.9rem' }}>
                <AlertTriangle size={16} className="text-yellow" /> Syarat & Ketentuan Swag
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '6px', lineHeight: 1.5 }}>
                Seluruh item di bawah adalah hadiah dari **musim event sebelumnya**. Daftar swag resmi untuk musim kali ini belum di-reveal secara resmi oleh tim Google Cloud Global. Halaman ini akan diperbarui instan begitu informasi ter-update dirilis!
              </p>
            </div>

            <div className="swag-grid">
              {swagData.map(swag => {
                const IconComponent = swag.icon;
                return (
                  <div key={swag.id} className="swag-card" onClick={() => setSelectedSwag(swag)}>
                    <div className="swag-img-placeholder" style={{ background: `linear-gradient(135deg, ${swag.color}15, ${swag.color}05)` }}>
                      <IconComponent size={44} style={{ color: swag.color }} />
                      <span className="badge" style={{ background: `${swag.color}18`, color: swag.color, fontSize: '0.62rem' }}>{swag.tier}</span>
                    </div>
                    <div className="swag-details">
                      <h4>{swag.name}</h4>
                      <p>Klik untuk cek detail unboxing</p>
                    </div>
                  </div>
                );
              })}
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
              <div className="card" style={{ gridColumn: 'span 6' }}>
                <h3 className="card-title"><Users size={20} className="text-green" /> Hub Diskusi WhatsApp</h3>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '20px' }}>
                  Diskusi eror modul lab, tukar lencana, and info Swag Drop akan dibagikan berkala di grup WA Kak Rajif. Masuk ke grup bimbingan sekarang:
                </p>
                <a href={CONFIG.WA_LINK} target="_blank" className="btn btn-success">
                  Gabung Grup WhatsApp
                </a>
              </div>

              {/* Social Mutuals */}
              <div className="card" style={{ gridColumn: 'span 6' }}>
                <h3 className="card-title"><Share2 size={20} className="text-blue" /> Mutualan Sosial Media</h3>
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
                          <a href={user.link} target="_blank" className="user-follow-link"><Plus size={12} /></a>
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
              <div className="card" style={{ gridColumn: 'span 8' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div style={{ borderLeft: '4px solid var(--color-danger)', paddingLeft: '16px' }}>
                    <h4 style={{ color: 'var(--color-danger)', marginBottom: '8px' }}>⚠️ Ketentuan Umur Minimum</h4>
                    <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                      Saat meregistrasikan akun di portal Skills Boost, pastikan pengaturan tahun lahirmu dikonfigurasikan agar umurmu <strong>di atas 17 tahun</strong>. Jika data umur dideteksi di bawah 17 tahun, sistem Google akan otomatis menolak pembuatan akun baru demi mematuhi regulasi privasi anak.
                    </p>
                  </div>

                  <div style={{ borderLeft: '4px solid var(--color-warning)', paddingLeft: '16px' }}>
                    <h4 style={{ color: 'var(--color-warning)', marginBottom: '8px' }}>🤖 Mengatasi Masalah Captcha Gagal</h4>
                    <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '8px' }}>
                      Banyak peserta menemui kendala di mana verifikasi captcha terus-menerus gagal atau tombol daftar membeku. Berikut langkah alternatif penyelesaiannya:
                    </p>
                    <ul style={{ paddingLeft: '20px', fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                      <li><strong>Beralih Jaringan Internet:</strong> Beralihlah dari Wi-Fi ke data seluler (atau sebaliknya) untuk mereset reputasi IP koneksimu.</li>
                      <li><strong>Mode Incognito:</strong> Buka jendela penyamaran browser untuk menghindari cookie/cache lama yang rusak.</li>
                      <li><strong>Gunakan HP:</strong> Seringkali pengisian captcha melalui browser handphone memiliki tingkat keberhasilan lebih tinggi.</li>
                    </ul>
                  </div>

                  <div style={{ borderLeft: '4px solid var(--color-success)', paddingLeft: '16px' }}>
                    <h4 style={{ color: 'var(--color-success)', marginBottom: '8px' }}>📝 Prosedur Pembuatan Profil</h4>
                    <ol style={{ paddingLeft: '20px', fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                      <li>Kunjungi halaman resmi Google Cloud Skills Boost di <a href="https://www.cloudskillsboost.google/" target="_blank" style={{ color: 'var(--color-primary-light)', textDecoration: 'underline' }}>skills.google</a>.</li>
                      <li>Pilih menu <strong>"Join"</strong> di bagian kanan atas layar.</li>
                      <li>Pilihlah metode pendaftaran instan <strong>"Sign in with Google"</strong> agar sinkronisasi email lebih aman.</li>
                      <li>Atur tahun lahir agar terbaca di atas 17 tahun.</li>
                      <li>Setelah berhasil login, masuk ke <strong>Profile</strong> &rarr; klik tombol <strong>Share Profile</strong> &rarr; klik <strong>Make Profile Public</strong>. Ini wajib dilakukan agar lencana dapat diverifikasi oleh admin.</li>
                    </ol>
                  </div>
                </div>
              </div>

              <div className="card text-center" style={{ gridColumn: 'span 4' }}>
                <h3 className="card-title" style={{ justifyContent: 'center' }}><CheckCircle size={18} className="text-green" /> Simulasi Profil Terverifikasi</h3>
                <div style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: '20px', textAlign: 'left', marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div className="avatar" style={{ width: '32px', height: '32px' }}><Award size={14} /></div>
                    <div>
                      <h5 style={{ fontSize: '0.8rem', fontWeight: 700 }}>Rajif Peserta</h5>
                      <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>ID: 109848-GCSB</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    <span>Lencana Diperoleh:</span>
                    <strong style={{ color: 'var(--text-main)' }}>12 Badges</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    <span>Status Profil URL:</span>
                    <strong style={{ color: 'var(--color-success)' }}><Check size={12} style={{ display: 'inline' }} /> Valid & Public</strong>
                  </div>
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
              <div className="card" style={{ gridColumn: 'span 8' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div style={{ borderLeft: '4px solid var(--color-primary)', paddingLeft: '16px' }}>
                    <h4 style={{ color: 'var(--color-primary)', marginBottom: '8px' }}>🏢 Mengisi Kolom Institusi / Komunitas</h4>
                    <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '12px' }}>
                      Banyak pendaftar bingung mengisi kolom <strong>Institusi</strong> atau <strong>Komunitas</strong> di form pendaftaran program developer Google. Silakan isi sesuai statusmu saat ini:
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>• <strong>Sekolah (SD/SMP/SMA):</strong> Isilah kolom institusi dengan <strong>Nama Sekolah Lengkap</strong> (contoh: SMAN 8 Jakarta).</p>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>• <strong>Mahasiswa Kuliah:</strong> Isilah dengan <strong>Nama Kampus/Universitas</strong> (contoh: Universitas Indonesia).</p>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>• <strong>Sudah Bekerja / Lainnya:</strong> Isilah dengan <strong>Nama Perusahaan</strong> atau nama <strong>Pendidikan Terakhir</strong> kalian.</p>
                    </div>
                  </div>

                  <div style={{ borderLeft: '4px solid var(--color-success)', paddingLeft: '16px' }}>
                    <h4 style={{ color: 'var(--color-success)', marginBottom: '8px' }}>📝 Alur Pendaftaran GEAR</h4>
                    <ol style={{ paddingLeft: '20px', fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                      <li>Buka halaman pendaftaran Google GEAR di <a href="https://developers.google.com/program/gear" target="_blank" style={{ color: 'var(--color-primary-light)', textDecoration: 'underline' }}>developers.google.com/program/gear</a>.</li>
                      <li>Klik tombol hijau <strong>"Join Google Developer Program"</strong>.</li>
                      <li>Lakukan login menggunakan akun Google/Gmail kalian.</li>
                      <li>Lengkapi form isian data diri, isi kolom institusi sesuai panduan di atas.</li>
                      <li>Setujui syarat pendaftaran, klik submit, and simpan tangkapan layar dasbor suksesmu.</li>
                    </ol>
                  </div>
                </div>
              </div>

              <div className="card text-center" style={{ gridColumn: 'span 4' }}>
                <h3 className="card-title" style={{ justifyContent: 'center' }}><CheckCircle size={18} className="text-green" /> Dasbor Pendaftaran Sukses</h3>
                <div style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: '20px', textAlign: 'left', marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div className="avatar" style={{ width: '32px', height: '32px', background: 'var(--grad-green)' }}><CheckCircle size={14} /></div>
                    <div>
                      <h5 style={{ fontSize: '0.8rem', fontWeight: 700 }}>Google Developers</h5>
                      <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>GEAR Member Account</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    <span>Developer Level:</span>
                    <strong style={{ color: 'var(--text-main)' }}>Member</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    <span>GEAR Badge status:</span>
                    <strong style={{ color: 'var(--color-success)' }}><Check size={12} style={{ display: 'inline' }} /> Activated</strong>
                  </div>
                </div>
                <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '16px', lineHeight: 1.45 }}>
                  Visual di atas merepresentasikan tampilan lencana dasbor Google Developer Program setelah pendaftaran GEAR kamu sukses disetujui.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Anonymous Feedback Section */}
        <section className="card" style={{ marginTop: '64px', maxWidth: '650px', marginLeft: 'auto', marginRight: 'auto', textAlign: 'center' }}>
          <h3 className="card-title" style={{ justifyContent: 'center' }}><MessageSquare size={18} className="text-blue" /> Masukan & Saran Anonim</h3>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '20px', lineHeight: 1.5 }}>
            Ada keluhan, kritik, atau usulan fitur untuk website bimbingan ini? Kirim masukanmu di bawah secara anonim (identitas dijamin aman).
          </p>
          <form onSubmit={handleFeedbackSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left' }}>
            <div className="input-group">
              <textarea 
                rows="3" 
                placeholder="Tulis kritik, saran, atau ide fitur di sini..." 
                value={feedbackMsg}
                onChange={(e) => setFeedbackMsg(e.target.value)}
                required
                style={{ 
                  width: '100%', 
                  padding: '12px', 
                  background: 'rgba(0,0,0,0.2)', 
                  border: '1px solid var(--border-color)', 
                  borderRadius: '6px', 
                  color: 'var(--text-main)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.85rem',
                  outline: 'none',
                  resize: 'vertical'
                }}
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ padding: '12px' }}>Kirim Masukan Anonim</button>
          </form>
          {feedbackSuccess && (
            <div className="copy-status-tip" style={{ color: 'var(--color-success)', marginTop: '10px' }}>
              Masukan anonim berhasil terkirim! Terima kasih.
            </div>
          )}
        </section>

      </main>

      {/* Swag Inspect Modal Lightbox */}
      {selectedSwag && (
        <div className="modal-overlay" onClick={() => setSelectedSwag(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedSwag(null)} aria-label="Close modal"><Plus style={{ transform: 'rotate(45deg)' }} size={16} /></button>
            <div className="modal-img-area">
              <div style={{ textAlign: 'center' }}>
                {React.createElement(selectedSwag.icon, { size: 64, style: { color: selectedSwag.color, filter: 'drop-shadow(0 0 15px rgba(99,102,241,0.3))' } })}
                <span className="badge" style={{ background: `${selectedSwag.color}15`, color: selectedSwag.color, display: 'block', width: 'fit-content', margin: '12px auto 0 auto' }}>{selectedSwag.tier}</span>
              </div>
            </div>
            <div className="modal-caption">
              <h3>{selectedSwag.name}</h3>
              <p>{selectedSwag.desc}</p>
            </div>
          </div>
        </div>
      )}

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
            <a href="https://linkedin.com" target="_blank" className="social-link"><Linkedin size={16} /></a>
            <a href="https://instagram.com" target="_blank" className="social-link"><Instagram size={16} /></a>
            <a href="https://github.com" target="_blank" className="social-link"><Github size={16} /></a>
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
