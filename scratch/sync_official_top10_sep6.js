import { supabase } from '../api/_db.js';
import { basePoints, milestoneBonus, currentMilestone } from '../api/_points.js';

const officialTop10 = [
  { name: 'Gusti Raden Pamungkas Yudapradja', url: 'https://www.skills.google/public_profiles/d682d7db-b7d9-4288-a306-79b0fb857132', games: 18, badges: 93 },
  { name: 'Neisya Syafina', url: 'https://www.skills.google/public_profiles/c4464f5f-7706-4ce0-ba94-1880caf2d53e', games: 15, badges: 94 },
  { name: 'Zaimah Fira Azzahra', url: 'https://www.skills.google/public_profiles/1e437336-1d43-4434-b227-6d8399ec700d', games: 13, badges: 94 },
  { name: 'Rizki Fais Mubarok', url: 'https://www.skills.google/public_profiles/ca5219c8-bba6-49b2-af1d-fa1b1e993da4', games: 13, badges: 94 },
  { name: 'Wildan Alghifari', url: 'https://www.skills.google/public_profiles/e80a907c-d02d-4646-b199-1197c380068f', games: 13, badges: 93 },
  { name: 'Jooe Pella', url: 'https://www.skills.google/public_profiles/1fcf5233-8a16-4e8b-ac88-e09a64908981', games: 13, badges: 92 },
  { name: 'Nabi Lah', url: 'https://www.skills.google/public_profiles/9cd8ea6a-5303-49af-bccc-337c0c491767', games: 12, badges: 93 },
  { name: 'Abdulloh Fajar Bin Ilham', url: 'https://www.skills.google/public_profiles/bd8b7032-a5e7-43ac-a92a-2cfb0e1aa91c', games: 16, badges: 82 },
  { name: 'Nouval Aiman', url: 'https://www.skills.google/public_profiles/064ee134-5e9b-45a6-8336-bc8f15e6259a', games: 14, badges: 85 },
  { name: 'Vicky F.S', url: 'https://www.skills.google/public_profiles/0e70865f-3977-4889-8f16-b91a84a19c5b', games: 13, badges: 86 },
];

async function syncOfficialTop10() {
  const snapshotDate = '2026-09-06';
  console.log(`=== SYNCING OFFICIAL TOP 10 FOR DATE: ${snapshotDate} ===`);

  const { data: allParticipants } = await supabase
    .from('participants')
    .select('id, nama, profile_url');

  for (const item of officialTop10) {
    const normUrl = item.url.trim().toLowerCase();
    let p = allParticipants.find(p => p.profile_url.trim().toLowerCase() === normUrl);

    if (!p) {
      const normName = item.name.trim().toLowerCase();
      p = allParticipants.find(p => p.nama.trim().toLowerCase().includes(normName) || normName.includes(p.nama.trim().toLowerCase()));
    }

    if (p) {
      const bp = basePoints(item.games, item.badges);
      const mb = milestoneBonus(item.games, item.badges);
      const mObj = currentMilestone(item.games, item.badges);

      const payload = {
        participant_id: p.id,
        snapshot_date: snapshotDate,
        points: bp,
        bonus_points: mb,
        milestone: mObj ? mObj.label : 'Ultimate Milestone',
        games: item.games,
        skill_badges: item.badges
      };

      const { error } = await supabase
        .from('snapshots')
        .upsert(payload, { onConflict: 'participant_id,snapshot_date' });

      if (error) {
        console.error(`Error updating ${item.name}:`, error.message);
      } else {
        console.log(`Updated ${item.name} (ID ${p.id}): ${bp + mb} pts (${item.games}G / ${item.badges}S)`);
      }
    } else {
      console.warn(`Participant NOT FOUND in DB: ${item.name} (${item.url})`);
    }
  }

  console.log('\n=== OFFICIAL TOP 10 SYNC COMPLETED ===');
}

syncOfficialTop10().catch(console.error);
