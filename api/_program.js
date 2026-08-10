// ============================================================
// GOOGLE SKILLS ARCADE FACILITATOR 2026 - INDONESIA (SERVERLESS ENGINE)
// Single source of truth for serverless API endpoints.
// ============================================================

export const PROGRAM = {
  name: 'Google Skills Arcade Facilitator 2026',
  facilitatorCode: 'GCAF26-ID-UAQ-MFC',
  startDate: '2026-07-13T00:00:00+07:00',
  endDate:   '2026-09-14T23:59:59+07:00',
  timezone:  'Asia/Jakarta',
}

export const POINTS = {
  perGame: 1,
  skillBadgesPerPoint: 2,
}

export const MILESTONES = [
  { key: 'M1',       label: 'Milestone 1',       games: 6,  badges: 14, bonus: 7 },
  { key: 'M2',       label: 'Milestone 2',       games: 8,  badges: 28, bonus: 18 },
  { key: 'M3',       label: 'Milestone 3',       games: 10, badges: 42, bonus: 29 },
  { key: 'ULTIMATE', label: 'Ultimate Milestone', games: 12, badges: 56, bonus: 40 },
]

export const TIERS = [
  { key: 'TROOPER',  label: 'Arcade Trooper',  minPoints: 50  },
  { key: 'RANGER',   label: 'Arcade Ranger',   minPoints: 75  },
  { key: 'CHAMPION', label: 'Arcade Champion', minPoints: 95  },
  { key: 'LEGEND',   label: 'Arcade Legend',   minPoints: 120 },
]

export const ARCADE_GAMES = [
  // --- 2026-07 ---
  { id: 7313, name: 'Arcade Base Camp (Juli)', accessCode: '1q-basecamp-07511', url: 'https://www.skills.google/games/7313', month: '2026-07', points: 1, match: (t) => t.includes('base camp') && (t.includes('july') || t.includes('juli') || (!t.includes('august') && !t.includes('agustus'))) },
  { id: 7314, name: 'Arcade Adventure (Juli)', accessCode: '1q-lowcode-92316', url: 'https://www.skills.google/games/7314', month: '2026-07', points: 1, match: (t) => t.includes('adventure') && (t.includes('low code') || t.includes('july') || t.includes('juli')) },
  { id: 7315, name: 'Arcade Voyage (Juli)', accessCode: '1q-bucket-58231', url: 'https://www.skills.google/games/7315', month: '2026-07', points: 1, match: (t) => t.includes('voyage') && (t.includes('cloud storage') || t.includes('governance') || t.includes('july') || t.includes('juli')) },
  { id: 7316, name: 'Arcade Trail (Juli)', accessCode: '1q-workspace-31069', url: 'https://www.skills.google/games/7316', month: '2026-07', points: 1, match: (t) => t.includes('trail') && (t.includes('workspace') || t.includes('july') || t.includes('juli')) },
  { id: 7317, name: 'Arcade Simulator: Data Mesh Architect (Juli)', accessCode: '1q-datamesh-16451', url: 'https://www.skills.google/games/7317', month: '2026-07', points: 1, match: (t) => (t.includes('simulator') && t.includes('data mesh')) || t.includes('data mesh architect') },
  { id: 7318, name: 'Safe Spaces (Juli)', accessCode: '1q-security-19110', url: 'https://www.skills.google/games/7318', month: '2026-07', points: 1, match: (t) => t.includes('safe spaces') },
  // --- 2026-08 ---
  { id: 7394, name: 'Arcade Base Camp (Agustus)', accessCode: '1q-basecamp-10219', url: 'https://www.skills.google/games/7394', month: '2026-08', points: 1, match: (t) => t.includes('base camp') && (t.includes('august') || t.includes('agustus')) },
  { id: 7395, name: 'Arcade Adventure (Agustus)', accessCode: '1q-datamgt-92372', url: 'https://www.skills.google/games/7395', month: '2026-08', points: 1, match: (t) => t.includes('adventure') && (t.includes('data vault') || t.includes('data management') || t.includes('august') || t.includes('agustus')) },
  { id: 7396, name: 'Arcade Trail (Agustus)', accessCode: '1q-delivery-31058', url: 'https://www.skills.google/games/7396', month: '2026-08', points: 1, match: (t) => t.includes('trail') && (t.includes('cloud delivery') || t.includes('delivery') || t.includes('august') || t.includes('agustus')) },
  { id: 7397, name: 'Arcade Simulator (Agustus)', accessCode: '1q-network-51470', url: 'https://www.skills.google/games/7397', month: '2026-08', points: 1, match: (t) => t.includes('simulator') && (t.includes('network security') || t.includes('networking') || t.includes('august') || t.includes('agustus')) },
  { id: 7398, name: 'Arcade Voyage (Agustus)', accessCode: '1q-sheets-29185', url: 'https://www.skills.google/games/7398', month: '2026-08', points: 1, match: (t) => t.includes('voyage') && (t.includes('sheets') || t.includes('august') || t.includes('agustus')) },
  { id: 7399, name: 'Arcade Special Game (Agustus)', accessCode: '1q-schema-27083', url: 'https://www.skills.google/games/7399', month: '2026-08', points: 1, match: (t) => t.includes('spans and plans') || t.includes('special game') || (t.includes('special') && t.includes('arcade')) },
]

export const ARCHIVED_GAME_IDS = []

export const SKILL_BADGES = [
  // --- Beginner (17 badge) ---
  { id: 1586, name: 'Membuat Aplikasi Gemini Enterprise Pertama Anda', nameEn: 'Create Your First Gemini Enterprise Application', url: 'https://www.skills.google/paths/3546/course_templates/1586', tier: 'beginner', labs: 1, credits: 0 },
  { id: 1426, name: 'Mengembangkan Prototipe Berteknologi AI di Google AI Studio', nameEn: 'Develop AI-Powered Prototypes in Google AI Studio', url: 'https://www.skills.google/course_templates/1426', tier: 'beginner', labs: 4, credits: 0 },
  { id: 754, name: 'Dasar-Dasar Google Cloud Compute', nameEn: 'The Basics of Google Cloud Compute', url: 'https://www.skills.google/course_templates/754', tier: 'beginner', labs: 4, credits: 4 },
  { id: 728, name: 'Mengimplementasikan Alur Kerja Olahpesan dan Otomatisasi Berbasis Peristiwa', nameEn: 'Implement Event-Driven Messaging and Automation Workflows', url: 'https://www.skills.google/course_templates/728', tier: 'beginner', labs: 3, credits: 2 },
  { id: 725, name: 'Menerapkan Solusi Cloud Storage dan Perlindungan Data', nameEn: 'Implement Cloud Storage and Data Protection Solutions', url: 'https://www.skills.google/course_templates/725', tier: 'beginner', labs: 4, credits: 4 },
  { id: 705, name: 'Membuat Data Lake Streaming di Cloud Storage', nameEn: 'Create a Streaming Data Lake on Cloud Storage', url: 'https://www.skills.google/course_templates/705', tier: 'beginner', labs: 4, credits: 3 },
  { id: 671, name: 'Men-deploy dan Mengelola Aplikasi di Google App Engine', nameEn: 'Deploy and Manage Applications on Google App Engine', url: 'https://www.skills.google/course_templates/671', tier: 'beginner', labs: 4, credits: 4 },
  { id: 700, name: 'Implement Speech and Language Solutions with Pre-trained APIs', nameEn: 'Implement Speech and Language Solutions with Pre-trained APIs', url: 'https://www.skills.google/course_templates/700', tier: 'beginner', labs: 4, credits: 4 },
  { id: 756, name: 'Menggunakan Google Cloud Speech API', nameEn: 'Using the Google Cloud Speech API', url: 'https://www.skills.google/course_templates/756', tier: 'beginner', labs: 4, credits: 4 },
  { id: 634, name: 'Menganalisis Ucapan dan Bahasa dengan Google API', nameEn: 'Analyze Speech and Language with Google APIs', url: 'https://www.skills.google/course_templates/634', tier: 'beginner', labs: 4, credits: 8 },
  { id: 658, name: 'Menyimpan, Memproses, dan Mengelola Data di Google Cloud - Console', nameEn: 'Store, Process, and Manage Data on Google Cloud - Console', url: 'https://www.skills.google/course_templates/658', tier: 'beginner', labs: 4, credits: 3 },
  { id: 659, name: 'Menyimpan, Memproses, dan Mengelola Data di Google Cloud - Command Line', nameEn: 'Store, Process, and Manage Data on Google Cloud - Command Line', url: 'https://www.skills.google/course_templates/659', tier: 'beginner', labs: 4, credits: 3 },
  { id: 629, name: 'Memigrasikan Data MySQL ke Cloud SQL Menggunakan Database Migration Service', nameEn: 'Migrate MySQL Data to Cloud SQL Using Database Migration Service', url: 'https://www.skills.google/course_templates/629', tier: 'beginner', labs: 5, credits: 5 },
  { id: 750, name: 'Mulai Menggunakan Sensitive Data Protection', nameEn: 'Implement Sensitive Data Protection on Google Cloud', url: 'https://www.skills.google/course_templates/750', tier: 'beginner', labs: 4, credits: 4 },
  { id: 633, name: 'Menganalisis Gambar dengan Cloud Vision API', nameEn: 'Analyze Images with the Cloud Vision API', url: 'https://www.skills.google/course_templates/633', tier: 'beginner', labs: 4, credits: 12 },
  { id: 727, name: 'Membangun Aplikasi Berbasis Peristiwa dengan Eventarc', nameEn: 'Build Event-Driven Applications with Eventarc', url: 'https://www.skills.google/course_templates/727', tier: 'beginner', labs: 4, credits: 3 },
  { id: 702, name: 'Mengonfigurasi Akun Layanan dan Peran IAM untuk Google Cloud', nameEn: 'Configure Service Accounts and IAM Roles for Google Cloud', url: 'https://www.skills.google/course_templates/702', tier: 'beginner', labs: 4, credits: 4 },
  // --- Intermediate (17 badge) ---
  { id: 1596, name: 'Merekayasa Agen AI dengan Agent Development Kit (ADK)', nameEn: 'Engineer AI Agents with Agent Development Kit (ADK)', url: 'https://www.skills.google/course_templates/1596', tier: 'intermediate', labs: 1, credits: 5 },
  { id: 1076, name: 'Membangun Aplikasi AI yang Bermanfaat dengan Gemini dan Imagen', nameEn: 'Build Real World AI Applications with Gemini and Imagen', url: 'https://www.skills.google/course_templates/1076', tier: 'intermediate', labs: 4, credits: 0 },
  { id: 1459, name: 'Membangun Aplikasi Cloud Cerdas dengan Vibe Coding dan MCP', nameEn: 'Build a Smart Cloud Application with Vibe Coding and MCP', url: 'https://www.skills.google/course_templates/1459', tier: 'intermediate', labs: 4, credits: 4 },
  { id: 676, name: 'Mengimplementasikan Alur Kerja Kolaborasi dan Produktivitas Cloud', nameEn: 'Implement Cloud Collaboration and Productivity Workflows', url: 'https://www.skills.google/course_templates/676', tier: 'intermediate', labs: 7, credits: 0 },
  { id: 632, name: 'Menganalisis Data BigQuery di Spreadsheet yang Terhubung', nameEn: 'Analyze BigQuery Data in Connected Sheets', url: 'https://www.skills.google/course_templates/632', tier: 'intermediate', labs: 4, credits: 0 },
  { id: 752, name: 'Men-streaming Analytics ke BigQuery', nameEn: 'Streaming Analytics into BigQuery', url: 'https://www.skills.google/course_templates/752', tier: 'intermediate', labs: 4, credits: 2 },
  { id: 704, name: 'Membuat Data Lake Aman di Cloud Storage', nameEn: 'Create a Secure Data Lake on Cloud Storage', url: 'https://www.skills.google/course_templates/704', tier: 'intermediate', labs: 4, credits: 4 },
  { id: 751, name: 'Mengamankan Data Lakehouse', nameEn: 'Secure Lakehouse Data', url: 'https://www.skills.google/course_templates/751', tier: 'intermediate', labs: 4, credits: 4 },
  { id: 753, name: 'Memperkaya Metadata dan Penemuan Data Lakehouse', nameEn: 'Enrich Metadata and Discovery of Lakehouse Data', url: 'https://www.skills.google/course_templates/753', tier: 'intermediate', labs: 4, credits: 3 },
  { id: 653, name: 'Memantau dan Mengelola Resource Google Cloud', nameEn: 'Monitor and Manage Google Cloud Resources', url: 'https://www.skills.google/course_templates/653', tier: 'intermediate', labs: 4, credits: 4 },
  { id: 749, name: 'Memantau dan Membuat Log dengan Google Cloud Observability', nameEn: 'Monitor and Log with Google Cloud Observability', url: 'https://www.skills.google/course_templates/749', tier: 'intermediate', labs: 5, credits: 9 },
  { id: 641, name: 'Menyiapkan Jaringan Google Cloud', nameEn: 'Set Up a Google Cloud Network', url: 'https://www.skills.google/course_templates/641', tier: 'intermediate', labs: 4, credits: 8 },
  { id: 737, name: 'Mengintegrasikan Data BigQuery dan Google Workspace Menggunakan Apps Script', nameEn: 'Integrate BigQuery Data and Google Workspace using Apps Script', url: 'https://www.skills.google/course_templates/737', tier: 'intermediate', labs: 4, credits: 2 },
  { id: 627, name: 'Rekayasa Data untuk Pembuatan Model Prediktif dengan BigQuery ML', nameEn: 'Engineer Data for Predictive Modeling with BigQuery ML', url: 'https://www.skills.google/course_templates/627', tier: 'intermediate', labs: 4, credits: 15 },
  { id: 716, name: 'Mengimplementasikan Alur Kerja DevOps di Google Cloud', nameEn: 'Implement DevOps Workflows in Google Cloud', url: 'https://www.skills.google/course_templates/716', tier: 'intermediate', labs: 4, credits: 16 },
  { id: 626, name: 'Membuat Model ML dengan BigQuery ML', nameEn: 'Create ML Models with BigQuery ML', url: 'https://www.skills.google/course_templates/626', tier: 'intermediate', labs: 5, credits: 11 },
  { id: 638, name: 'Membangun Situs di Google Cloud', nameEn: 'Build a Website on Google Cloud', url: 'https://www.skills.google/course_templates/638', tier: 'intermediate', labs: 5, credits: 13 },
  // --- Advanced (17 badge) ---
  { id: 959, name: 'Mempelajari AI Generatif di Agent Platform', nameEn: 'Explore Generative AI in Agent Platform', url: 'https://www.skills.google/course_templates/959', tier: 'advanced', labs: 4, credits: 16 },
  { id: 648, name: 'Mengimplementasikan Cloud Load Balancing untuk Compute Engine', nameEn: 'Implementing Cloud Load Balancing for Compute Engine', url: 'https://www.skills.google/course_templates/648', tier: 'advanced', labs: 4, credits: 4 },
  { id: 976, name: 'Desain Perintah dalam Agent Platform', nameEn: 'Prompt Design in Agent Platform', url: 'https://www.skills.google/course_templates/976', tier: 'advanced', labs: 4, credits: 4 },
  { id: 981, name: 'Menginspeksi Dokumen Multimedia dengan Multimodalitas Gemini dan RAG Multimodal', nameEn: 'Inspect Rich Documents with Gemini Multimodality and Multimodal RAG', url: 'https://www.skills.google/course_templates/981', tier: 'advanced', labs: 4, credits: 20 },
  { id: 978, name: 'Mengembangkan Aplikasi GenAI dengan Gemini dan Streamlit', nameEn: 'Develop Gen AI Apps with Gemini and Streamlit', url: 'https://www.skills.google/course_templates/978', tier: 'advanced', labs: 5, credits: 20 },
  { id: 637, name: 'Menyiapkan Lingkungan Pengembangan Aplikasi di Google Cloud', nameEn: 'Set Up an App Dev Environment on Google Cloud', url: 'https://www.skills.google/course_templates/637', tier: 'advanced', labs: 10, credits: 8 },
  { id: 625, name: 'Mengembangkan Jaringan Google Cloud Anda', nameEn: 'Develop Your Google Cloud Network', url: 'https://www.skills.google/course_templates/625', tier: 'advanced', labs: 6, credits: 18 },
  { id: 654, name: 'Membangun Jaringan Google Cloud yang Aman', nameEn: 'Build a Secure Google Cloud Network', url: 'https://www.skills.google/course_templates/654', tier: 'advanced', labs: 6, credits: 30 },
  { id: 663, name: 'Men-deploy Aplikasi Kubernetes di Google Cloud', nameEn: 'Deploy Kubernetes Applications on Google Cloud', url: 'https://www.skills.google/course_templates/663', tier: 'advanced', labs: 4, credits: 12 },
  { id: 623, name: 'Mendapatkan Insight dari Data BigQuery', nameEn: 'Derive Insights from BigQuery Data', url: 'https://www.skills.google/course_templates/623', tier: 'advanced', labs: 7, credits: 6 },
  { id: 639, name: 'Membangun Objek LookML di Looker', nameEn: 'Build LookML Objects in Looker', url: 'https://www.skills.google/course_templates/639', tier: 'advanced', labs: 5, credits: 0 },
  { id: 651, name: 'Mengelola Model Data di Looker', nameEn: 'Manage Data Models in Looker', url: 'https://www.skills.google/course_templates/651', tier: 'advanced', labs: 6, credits: 0 },
  { id: 628, name: 'Menyiapkan Data untuk Dasbor dan Laporan Looker', nameEn: 'Prepare Data for Looker Dashboards and Reports', url: 'https://www.skills.google/course_templates/628', tier: 'advanced', labs: 5, credits: 0 },
  { id: 649, name: 'Mengembangkan Aplikasi Serverless dengan Firebase', nameEn: 'Develop Serverless Apps with Firebase', url: 'https://www.skills.google/course_templates/649', tier: 'advanced', labs: 4, credits: 16 },
  { id: 640, name: 'Arsitektur Cloud: Merancang, Mengimplementasikan, dan Mengelola', nameEn: 'Cloud Architecture: Design, Implement, and Manage', url: 'https://www.skills.google/course_templates/640', tier: 'advanced', labs: 6, credits: 32 },
  { id: 1558, name: 'Build Global and Regional Load Balancing Solutions', nameEn: 'Build Global and Regional Load Balancing Solutions', url: 'https://www.skills.google/course_templates/1558', tier: 'advanced', labs: 4, credits: 20 },
  { id: 1453, name: 'Google DeepMind: Train A Small Language Model', nameEn: 'Google DeepMind: Train A Small Language Model', url: 'https://www.skills.google/course_templates/1453', tier: 'advanced', labs: 1, credits: 5 },
]

export const EXTRA_BADGES_ALLOWED = true
export const EXTRA_BADGES_MAX = 999

export const GEAR_BADGES = [
  { name: 'Create Your First Gemini Enterprise Application', inSyllabus: true,  id: 1586 },
  { name: 'Engineer AI Agents with Agent Development Kit (ADK)', inSyllabus: true, id: 1596 },
  { name: 'Deploy Multi-Agent Architectures', inSyllabus: false, id: null },
  { name: 'Orchestrate Multi-agent Workflows with Gemini Enterprise', inSyllabus: false, id: null },
]

export const BONUS_MILESTONE_POINTS = 10

export const TOTALS = {
  skillBadges: 51,
  totalLabs: 221,
  totalCredits: 378,
  gamesAvailable: 12,
  gamesNeededForUltimate: 12,
}
