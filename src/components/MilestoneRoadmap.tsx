import React from 'react'
import { CheckCircle2, Lock, Trophy, Award, Sparkles, Target } from 'lucide-react'

interface MilestoneRoadmapProps {
  gamesCount: number
  skillsCount: number
  totalPoints?: number
}

export default function MilestoneRoadmap({ gamesCount, skillsCount }: MilestoneRoadmapProps) {
  const milestones = [
    {
      id: 'm1',
      title: 'Milestone 1',
      bonusText: '+7 Bonus · Total 20 pt',
      targetGames: 6,
      targetSkills: 14,
      accentColor: 'var(--neon-cyan)',
      bgAlpha: 'rgba(0, 240, 255, 0.08)',
      borderColor: 'var(--neon-cyan)'
    },
    {
      id: 'm2',
      title: 'Milestone 2',
      bonusText: '+18 Bonus · Total 40 pt',
      targetGames: 8,
      targetSkills: 28,
      accentColor: 'var(--neon-yellow)',
      bgAlpha: 'rgba(255, 235, 59, 0.08)',
      borderColor: 'var(--neon-yellow)'
    },
    {
      id: 'm3',
      title: 'Milestone 3',
      bonusText: '+29 Bonus · Total 60 pt',
      targetGames: 10,
      targetSkills: 42,
      accentColor: 'var(--neon-magenta)',
      bgAlpha: 'rgba(255, 0, 128, 0.08)',
      borderColor: 'var(--neon-magenta)'
    },
    {
      id: 'm4',
      title: 'Ultimate Milestone',
      bonusText: '+40 Bonus · Total 80 pt',
      targetGames: 12,
      targetSkills: 56,
      accentColor: 'var(--state-done)',
      bgAlpha: 'rgba(0, 255, 157, 0.08)',
      borderColor: 'var(--state-done)'
    }
  ]

  return (
    <div
      style={{
        padding: '24px',
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        marginTop: '24px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
      }}
    >
      {/* Section Title Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--border)',
          paddingBottom: '14px',
          marginBottom: '20px',
          flexWrap: 'wrap',
          gap: '10px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Trophy size={20} style={{ color: 'var(--neon-yellow)' }} />
          <span style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            MILESTONE ROADMAP
          </span>
        </div>

        <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
          PROGRES REALTIME
        </div>
      </div>

      {/* 4 Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '16px'
        }}
      >
        {milestones.map((m) => {
          const isCompleted = gamesCount >= m.targetGames && skillsCount >= m.targetSkills
          const gamePct = Math.min(100, Math.round((gamesCount / m.targetGames) * 100))
          const skillPct = Math.min(100, Math.round((skillsCount / m.targetSkills) * 100))

          return (
            <div
              key={m.id}
              style={{
                position: 'relative',
                padding: '16px',
                background: isCompleted ? m.bgAlpha : 'rgba(15, 15, 26, 0.6)',
                border: `1.5px solid ${isCompleted ? m.borderColor : 'var(--border)'}`,
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                transition: 'all 0.25s ease',
                boxShadow: isCompleted ? `0 0 16px ${m.bgAlpha}` : 'none'
              }}
            >
              {/* Card Header: Icon + Title */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: isCompleted ? m.borderColor : 'rgba(255, 255, 255, 0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: isCompleted ? '#000' : 'var(--text-muted)',
                      flexShrink: 0
                    }}
                  >
                    {isCompleted ? <CheckCircle2 size={18} strokeWidth={2.5} /> : <Target size={16} />}
                  </div>
                  <span
                    style={{
                      fontSize: '0.88rem',
                      fontWeight: 800,
                      color: isCompleted ? m.accentColor : 'var(--text-primary)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em'
                    }}
                  >
                    {m.title}
                  </span>
                </div>

                {isCompleted && (
                  <span
                    style={{
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: '4px',
                      background: m.borderColor,
                      color: '#000',
                      textTransform: 'uppercase'
                    }}
                  >
                    SELESAI ✓
                  </span>
                )}
              </div>

              {/* Bonus Badge Tag */}
              <div
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border)',
                  padding: '5px 10px',
                  borderRadius: '6px',
                  width: 'fit-content',
                  fontFamily: 'var(--font-mono)'
                }}
              >
                {m.bonusText}
              </div>

              {/* Games Progress Bar */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                  <span>ARCADE GAMES</span>
                  <span style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                    {Math.min(m.targetGames, gamesCount)} / {m.targetGames}
                  </span>
                </div>
                <div
                  style={{
                    width: '100%',
                    height: '8px',
                    background: 'rgba(255, 255, 255, 0.06)',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    border: '1px solid var(--border)'
                  }}
                >
                  <div
                    style={{
                      width: `${gamePct}%`,
                      height: '100%',
                      background: 'linear-gradient(90deg, var(--neon-cyan), var(--neon-yellow))',
                      borderRadius: '4px',
                      transition: 'width 0.6s ease'
                    }}
                  />
                </div>
              </div>

              {/* Skills Progress Bar */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                  <span>SKILL BADGES</span>
                  <span style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                    {Math.min(m.targetSkills, skillsCount)} / {m.targetSkills}
                  </span>
                </div>
                <div
                  style={{
                    width: '100%',
                    height: '8px',
                    background: 'rgba(255, 255, 255, 0.06)',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    border: '1px solid var(--border)'
                  }}
                >
                  <div
                    style={{
                      width: `${skillPct}%`,
                      height: '100%',
                      background: 'linear-gradient(90deg, var(--neon-magenta), var(--state-done))',
                      borderRadius: '4px',
                      transition: 'width 0.6s ease'
                    }}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
