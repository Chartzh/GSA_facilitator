import fs from 'fs';

if (fs.existsSync('.env.local')) {
  const envText = fs.readFileSync('.env.local', 'utf8');
  envText.split('\n').forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      let val = match[2].trim();
      if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
      process.env[key] = val;
    }
  });
}

import('../api/_db.js').then(async (db) => {
  const supabase = db.supabase;
  const snapshotDate = '2026-08-30';

  console.log(`=== SYNCING EXACT BY PROFILE URL FOR DATE: ${snapshotDate} ===`);

  const { data: participants } = await supabase.from('participants').select('id, nama, profile_url');
  const { data: prevSnapshots } = await supabase.from('snapshots').select('*').eq('snapshot_date', '2026-08-23');

  const prevMap = new Map();
  if (prevSnapshots) {
    prevSnapshots.forEach(s => prevMap.set(s.participant_id, s));
  }

  const getUuid = (url) => {
    const m = (url || '').match(/public_profiles\/([a-f0-9-]+)/i);
    return m ? m[1].toLowerCase() : (url || '').toLowerCase().trim();
  };

  const referenceTop10 = [
    { rank: 1, name: 'Neisya Syafina', url: 'https://www.skills.google/public_profiles/c4464f5f-7706-4ce0-ba94-1880caf2d53e', points: 59.5, bonus: 40, games: 13, skillBadges: 93, milestone: 'Ultimate Milestone' },
    { rank: 2, name: 'Wildan Alghifari', url: 'https://www.skills.google/public_profiles/e80a907c-d02d-4646-b199-1197c380068f', points: 59.5, bonus: 40, games: 13, skillBadges: 93, milestone: 'Ultimate Milestone' },
    { rank: 3, name: 'Zaimah Fira Azzahra', url: 'https://www.skills.google/public_profiles/1e437336-1d43-4434-b227-6d8399ec700d', points: 59.0, bonus: 40, games: 13, skillBadges: 92, milestone: 'Ultimate Milestone' },
    { rank: 4, name: 'Jooe Pella', url: 'https://www.skills.google/public_profiles/1fcf5233-8a16-4e8b-ac88-e09a64908981', points: 59.0, bonus: 40, games: 13, skillBadges: 92, milestone: 'Ultimate Milestone' },
    { rank: 5, name: 'Rizki Fais Mubarok', url: 'https://www.skills.google/public_profiles/ca5219c8-bba6-49b2-af1d-fa1b1e993da4', points: 59.0, bonus: 40, games: 13, skillBadges: 92, milestone: 'Ultimate Milestone' },
    { rank: 6, name: 'Nabi Lah', url: 'https://www.skills.google/public_profiles/9cd8ea6a-5303-49af-bccc-337c0c491767', points: 58.5, bonus: 40, games: 12, skillBadges: 93, milestone: 'Ultimate Milestone' },
    { rank: 7, name: 'Vicky F.S', url: 'https://www.skills.google/public_profiles/0e70865f-3977-4889-8f16-b91a84a19c5b', points: 56.0, bonus: 40, games: 13, skillBadges: 86, milestone: 'Ultimate Milestone' },
    { rank: 8, name: 'Gusti Raden Pamungkas Yudapradja', url: 'https://www.skills.google/public_profiles/d682d7db-b7d9-4288-a306-79b0fb857132', points: 56.0, bonus: 40, games: 13, skillBadges: 86, milestone: 'Ultimate Milestone' },
    { rank: 9, name: 'Abdulloh Fajar Bin Ilham', url: 'https://www.skills.google/public_profiles/bd8b7032-a5e7-43ac-a92a-2cfb0e1aa91c', points: 53.0, bonus: 40, games: 13, skillBadges: 80, milestone: 'Ultimate Milestone' },
    { rank: 10, name: 'Nouval Aiman', url: 'https://www.skills.google/public_profiles/064ee134-5e9b-45a6-8336-bc8f15e6259a', points: 50.5, bonus: 40, games: 13, skillBadges: 75, milestone: 'Ultimate Milestone' }
  ];

  const refUuidMap = new Map();
  referenceTop10.forEach(r => refUuidMap.set(getUuid(r.url), r));

  const payload = [];

  for (const p of participants) {
    const uuid = getUuid(p.profile_url);
    const refMatch = refUuidMap.get(uuid);

    if (refMatch) {
      payload.push({
        participant_id: p.id,
        snapshot_date: snapshotDate,
        points: refMatch.points,
        bonus_points: refMatch.bonus,
        milestone: refMatch.milestone,
        games: refMatch.games,
        skill_badges: refMatch.skillBadges
      });
    } else {
      const prev = prevMap.get(p.id);
      if (prev) {
        payload.push({
          participant_id: p.id,
          snapshot_date: snapshotDate,
          points: prev.points,
          bonus_points: prev.bonus_points,
          milestone: prev.milestone,
          games: prev.games,
          skill_badges: prev.skill_badges
        });
      } else {
        payload.push({
          participant_id: p.id,
          snapshot_date: snapshotDate,
          points: 0,
          bonus_points: 0,
          milestone: null,
          games: 0,
          skill_badges: 0
        });
      }
    }
  }

  console.log(`Upserting ${payload.length} snapshot rows for date ${snapshotDate}...`);

  for (let i = 0; i < payload.length; i += 50) {
    const chunk = payload.slice(i, i + 50);
    const { error } = await supabase
      .from('snapshots')
      .upsert(chunk, { onConflict: 'participant_id,snapshot_date' });

    if (error) console.error(`Upsert chunk ${i} error:`, error);
  }

  console.log('✅ Exact snapshot upsert complete!');
});
