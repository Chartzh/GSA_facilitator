import React from 'react'

interface StudyTopic {
  title: string
  icon: string
  description: string
  links: { name: string; url: string }[]
}

const STUDY_TOPICS: StudyTopic[] = [
  {
    title: 'Generative AI & Gemini Enterprise',
    icon: '🤖',
    description: 'Dokumentasi resmi arsitektur AI Agent, Agent Development Kit (ADK), Gemini API, dan Multimodal RAG.',
    links: [
      { name: 'Konsep Utama Google Agent Development Kit (ADK)', url: 'https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/overview' },
      { name: 'Panduan Prompt Design di Vertex AI Studio', url: 'https://cloud.google.com/vertex-ai/generative-ai/docs/learn/prompts/introduction-prompt-design' },
      { name: 'Multimodal RAG & Embeddings Guide', url: 'https://cloud.google.com/vertex-ai/generative-ai/docs/rag-overview' },
      { name: 'Gemini Enterprise & Streamlit Integration', url: 'https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/gemini' },
    ]
  },
  {
    title: 'BigQuery & Data Analytics',
    icon: '📊',
    description: 'Panduan konsep BigQuery ML, Connected Sheets, Streaming Analytics, dan Data Lakehouse.',
    links: [
      { name: 'Pengenalan BigQuery ML & Model Prediktif', url: 'https://cloud.google.com/bigquery/docs/bqml-introduction' },
      { name: 'Konsep Streaming Data ke BigQuery via Pub/Sub', url: 'https://cloud.google.com/bigquery/docs/streaming-data-into-bigquery' },
      { name: 'Arsitektur Data Lakehouse Aman di Google Cloud', url: 'https://cloud.google.com/architecture/dataplex-lakehouse-architecture' },
      { name: 'Panduan Connected Sheets untuk BigQuery', url: 'https://cloud.google.com/bigquery/docs/connected-sheets' },
    ]
  },
  {
    title: 'Looker & Data Visualization',
    icon: '📈',
    description: 'Konsep dasar LookML modeling, pembuatan objek analytics, dan pengolahan data dasbor.',
    links: [
      { name: 'Dokumentasi Resmi Bahasa LookML', url: 'https://cloud.google.com/looker/docs/what-is-lookml' },
      { name: 'Manajemen Data Model & Hubungan antar LookML Objects', url: 'https://cloud.google.com/looker/docs/how-lookml-works' },
      { name: 'Best Practices Desain Dasbor & Laporan Looker', url: 'https://cloud.google.com/looker/docs/creating-visualizations' },
    ]
  },
  {
    title: 'Cloud Networking & Security',
    icon: '🌐',
    description: 'Prinsip arsitektur VPC, Cloud Load Balancing, IAM Service Accounts, dan Sensitive Data Protection.',
    links: [
      { name: 'Konsep Dasar Google Cloud VPC & Subnets', url: 'https://cloud.google.com/vpc/docs/concepts-overview' },
      { name: 'Arsitektur Cloud Load Balancing (Regional & Global)', url: 'https://cloud.google.com/load-balancing/docs/load-balancing-overview' },
      { name: 'IAM Best Practices & Service Account Roles', url: 'https://cloud.google.com/iam/docs/using-service-accounts' },
      { name: 'Sensitive Data Protection (Cloud DLP) Overview', url: 'https://cloud.google.com/sensitive-data-protection/docs/overview' },
    ]
  },
  {
    title: 'Kubernetes & Serverless Application',
    icon: '⚡',
    description: 'Dasar-dasar Google Kubernetes Engine (GKE), App Engine, Cloud Run Functions, dan Firebase Serverless.',
    links: [
      { name: 'GKE Deployment Basics & Pod Architecture', url: 'https://cloud.google.com/kubernetes-engine/docs/concepts/kubernetes-engine-overview' },
      { name: 'Cloud Run Functions & Eventarc Event-Driven Architecture', url: 'https://cloud.google.com/functions/docs/concepts/overview' },
      { name: 'Firebase Serverless Web Development Guide', url: 'https://firebase.google.com/docs/web/setup' },
    ]
  }
]

export default function BahanBelajar() {
  return (
    <div className="bento-card col-span-12" id="bahan-belajar">
      <div className="card-header-flex">
        <div>
          <h2 className="card-title-arcade">
            <span>📚</span> BAHAN BELAJAR & REFERENSI KONSEP RESMI
          </h2>
          <p style={{ margin: '4px 0 0 0' }}>
            Kumpulan dokumentasi teknis dan panduan arsitektur resmi dari Google Cloud untuk memperdalam pemahaman konsep Anda.
          </p>
        </div>

        <span className="badge-tag badge-tag-done">OFFICIAL DOCS ONLY</span>
      </div>

      <div className="bento-grid" style={{ margin: '20px 0 0 0', gap: '20px' }}>
        {STUDY_TOPICS.map((topic, idx) => (
          <div key={idx} className="bento-card col-span-6" style={{ background: 'rgba(10, 10, 18, 0.6)', border: '1px solid var(--border)' }}>
            <h3 style={{ fontSize: '1.05rem', color: 'var(--neon-cyan)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>{topic.icon}</span> {topic.title}
            </h3>
            <p style={{ fontSize: '0.85rem', marginBottom: '14px' }}>
              {topic.description}
            </p>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {topic.links.map((link, linkIdx) => (
                <li key={linkIdx}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: '0.84rem',
                      color: 'var(--text-primary)',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'var(--transition)'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--neon-cyan)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                  >
                    <span style={{ color: 'var(--neon-yellow)' }}>›</span> {link.name} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
