import { supabase } from '../api/_db.js'

const officialTop10 = [
  {
    profileUrl: 'https://www.skills.google/public_profiles/d682d7db-b7d9-4288-a306-79b0fb857132',
    games: 19,
    skillBadges: 93,
    points: 65.5,
    bonusPoints: 40,
    milestone: 'Ultimate Milestone'
  },
  {
    profileUrl: 'https://www.skills.google/public_profiles/c4464f5f-7706-4ce0-ba94-1880caf2d53e',
    games: 18,
    skillBadges: 94,
    points: 65.0,
    bonusPoints: 40,
    milestone: 'Ultimate Milestone'
  },
  {
    profileUrl: 'https://www.skills.google/public_profiles/1e437336-1d43-4434-b227-6d8399ec700d',
    games: 16,
    skillBadges: 94,
    points: 63.0,
    bonusPoints: 40,
    milestone: 'Ultimate Milestone'
  },
  {
    profileUrl: 'https://www.skills.google/public_profiles/bd8b7032-a5e7-43ac-a92a-2cfb0e1aa91c',
    games: 18,
    skillBadges: 85,
    points: 60.5,
    bonusPoints: 40,
    milestone: 'Ultimate Milestone'
  },
  {
    profileUrl: 'https://www.skills.google/public_profiles/e80a907c-d02d-4646-b199-1197c380068f',
    games: 14,
    skillBadges: 93,
    points: 60.5,
    bonusPoints: 40,
    milestone: 'Ultimate Milestone'
  },
  {
    profileUrl: 'https://www.skills.google/public_profiles/ca5219c8-bba6-49b2-af1d-fa1b1e993da4',
    games: 13,
    skillBadges: 94,
    points: 60.0,
    bonusPoints: 40,
    milestone: 'Ultimate Milestone'
  },
  {
    profileUrl: 'https://www.skills.google/public_profiles/1fcf5233-8a16-4e8b-ac88-e09a64908981',
    games: 13,
    skillBadges: 92,
    points: 59.0,
    bonusPoints: 40,
    milestone: 'Ultimate Milestone'
  },
  {
    profileUrl: 'https://www.skills.google/public_profiles/9cd8ea6a-5303-49af-bccc-337c0c491767',
    games: 12,
    skillBadges: 93,
    points: 58.5,
    bonusPoints: 40,
    milestone: 'Ultimate Milestone'
  },
  {
    profileUrl: 'https://www.skills.google/public_profiles/0e70865f-3977-4889-8f16-b91a84a19c5b',
    games: 14,
    skillBadges: 86,
    points: 57.0,
    bonusPoints: 40,
    milestone: 'Ultimate Milestone'
  },
  {
    profileUrl: 'https://www.skills.google/public_profiles/064ee134-5e9b-45a6-8336-bc8f15e6259a',
    games: 14,
    skillBadges: 85,
    points: 56.5,
    bonusPoints: 40,
    milestone: 'Ultimate Milestone'
  }
]

async function run() {
  const snapshotDate = '2026-09-13'
  console.log(`Syncing official Top 10 for snapshot date ${snapshotDate}...`)

  const { data: participants, error: pError } = await supabase
    .from('participants')
    .select('id, nama, profile_url')

  if (pError || !participants) {
    console.error('Error fetching participants:', pError)
    process.exit(1)
  }

  const payload = []
  for (const item of officialTop10) {
    const p = participants.find(part => part.profile_url && part.profile_url.toLowerCase().includes(item.profileUrl.split('/public_profiles/')[1].toLowerCase()))
    if (!p) {
      console.error(`Participant not found for profile URL: ${item.profileUrl}`)
      continue
    }

    payload.push({
      participant_id: p.id,
      snapshot_date: snapshotDate,
      points: item.points,
      bonus_points: item.bonusPoints,
      milestone: item.milestone,
      games: item.games,
      skill_badges: item.skillBadges
    })
    console.log(`Matched ${p.nama} (ID: ${p.id}): ${item.games}G / ${item.skillBadges}S -> Total: ${item.points + item.bonusPoints}`)
  }

  const { error: upsertErr } = await supabase
    .from('snapshots')
    .upsert(payload, { onConflict: 'participant_id,snapshot_date' })

  if (upsertErr) {
    console.error('Error upserting snapshot rows:', upsertErr)
  } else {
    console.log(`Successfully synced ${payload.length} official snapshot rows for ${snapshotDate}!`)
  }
}

run().catch(console.error)
