export const POINTS_PER_GAME = 1
export const BADGES_PER_POINT = 2

export type MilestoneDef = {
  name: string
  label: string
  games: number
  badges: number
  bonus: number
}

// Milestone definitions ordered highest to lowest
export const MILESTONES: readonly MilestoneDef[] = [
  { name: 'Ultimate',    label: 'Ultimate Milestone', games: 12, badges: 56, bonus: 40 },
  { name: 'Milestone 3', label: 'Milestone 3',          games: 10, badges: 42, bonus: 29 },
  { name: 'Milestone 2', label: 'Milestone 2',          games: 8,  badges: 28, bonus: 18 },
  { name: 'Milestone 1', label: 'Milestone 1',          games: 6,  badges: 14, bonus: 7  },
] as const

/**
 * Poin dasar. Boleh berakhiran .5 dan itu memang benar.
 * Dihitung lewat bilangan bulat (halves) dulu supaya tidak ada galat pembulatan float.
 */
export function basePoints(games: number, skillBadges: number): number {
  const g = Math.max(0, Math.floor(Number(games) || 0))
  const b = Math.min(95, Math.max(0, Math.floor(Number(skillBadges) || 0)))
  const halves = g * POINTS_PER_GAME * 2 + b   // selalu bilangan bulat
  return halves / 2                            // hasil: bilangan bulat atau .5
}

/** Milestone tertinggi yang dicapai, atau null. */
export function currentMilestone(games: number, skillBadges: number): MilestoneDef | null {
  const g = Math.max(0, Math.floor(Number(games) || 0))
  const b = Math.min(95, Math.max(0, Math.floor(Number(skillBadges) || 0)))
  return MILESTONES.find(m => g >= m.games && b >= m.badges) ?? null
}

/** Bonus milestone. TIDAK menumpuk — hanya yang tertinggi. */
export function milestoneBonus(games: number, skillBadges: number): number {
  return currentMilestone(games, skillBadges)?.bonus ?? 0
}

/** Poin total = dasar + bonus. Ini angka utama yang dilihat peserta. */
export function totalPoints(games: number, skillBadges: number): number {
  return basePoints(games, skillBadges) + milestoneBonus(games, skillBadges)
}

/** Format tampilan: 58 tetap "58", 58.5 jadi "58,5". Jangan pernah "58.0". */
export function formatPoints(value: number): string {
  const val = Number(value) || 0
  if (Number.isInteger(val)) {
    return String(val)
  }
  return val.toFixed(1).replace('.', ',')
}

/** Validasi nilai kelipatan 0,5 untuk pengaman sebelum insert database */
export function assertHalfStep(name: string, value: number): number {
  if (typeof value !== 'number' || !Number.isFinite(value) || (value * 2) % 1 !== 0) {
    throw new Error(`${name} harus kelipatan 0,5, dapat: ${value}`)
  }
  return value
}

/** Validasi nilai bilangan bulat untuk pengaman sebelum insert database */
export function assertInt(name: string, value: number): number {
  if (!Number.isInteger(value)) {
    throw new Error(`${name} harus bilangan bulat, dapat: ${value}`)
  }
  return value
}
