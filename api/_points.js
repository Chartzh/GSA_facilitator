import { POINTS, MILESTONES, TIERS, BONUS_MILESTONE_POINTS } from './_program.js'

export const POINTS_PER_GAME = POINTS.perGame
export const BADGES_PER_POINT = POINTS.skillBadgesPerPoint
export { MILESTONES }

export function basePoints(gamesCount, skillBadgesCount) {
  const g = Math.max(0, Number(gamesCount) || 0)
  const b = Math.min(93, Math.max(0, Number(skillBadgesCount) || 0))
  return (g * POINTS_PER_GAME) + (b / BADGES_PER_POINT)
}

export function currentMilestone(gamesCount, skillBadgesCount) {
  const g = Math.max(0, Number(gamesCount) || 0)
  const b = Math.min(93, Math.max(0, Number(skillBadgesCount) || 0))
  let result = null

  for (const m of MILESTONES) {
    if (g >= m.games && b >= m.badges) {
      result = m
    }
  }
  return result
}

export function milestoneBonus(gamesCount, skillBadgesCount) {
  const m = currentMilestone(gamesCount, skillBadgesCount)
  return m ? m.bonus : 0
}

export function totalPoints(gamesCount, skillBadgesCount) {
  return basePoints(gamesCount, skillBadgesCount) + milestoneBonus(gamesCount, skillBadgesCount)
}

export function formatPoints(num) {
  const n = Number(num) || 0
  return Number.isInteger(n) ? n.toString() : n.toFixed(1)
}

export function assertHalfStep(points, label) {
  if (Math.round(points * 2) !== points * 2) {
    throw new Error(`[POINTS-INVALID] ${label || 'Poin'} harus berupa kelipatan 0.5: ${points}`)
  }
  return points
}

export function assertInt(num, label) {
  if (!Number.isInteger(num)) {
    throw new Error(`[INT-INVALID] ${label || 'Nilai'} harus integer: ${num}`)
  }
  return num
}
