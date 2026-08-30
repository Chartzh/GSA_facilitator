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

  console.log(`=== SYNCING LEADERBOARD FOR DATE: ${snapshotDate} ===`);

  // 1. Fetch all participants from DB
  const { data: participants, error: pErr } = await supabase.from('participants').select('id, nama, profile_url');
  if (pErr || !participants) {
    console.error('Failed to fetch participants:', pErr);
    return;
  }
  console.log(`Total participants in DB: ${participants.length}`);

  // 2. Fetch previous snapshot (2026-08-23) to use as base for all 256 participants
  const { data: prevSnapshots } = await supabase
    .from('snapshots')
    .select('*')
    .eq('snapshot_date', '2026-08-23');

  console.log(`Previous snapshot (2026-08-23) rows count: ${prevSnapshots?.length || 0}`);

  const prevMap = new Map();
  if (prevSnapshots) {
    prevSnapshots.forEach(s => prevMap.set(s.participant_id, s));
  }

  // 3. User's exact reference updates for Top 10 (and any updated participants)
  const norm = (s) => (s || '').toLowerCase().replace(/[^a-z0-9]/g, '');

  const referenceUpdates = [
    { search: 'neisya', games: 13, skillBadges: 93, points: 59.5, bonus: 40, milestone: 'Ultimate Milestone' },
    { search: 'wildan', games: 13, skillBadges: 93, points: 59.5, bonus: 40, milestone: 'Ultimate Milestone' },
    { search: 'zaimah', games: 13, skillBadges: 92, points: 59.0, bonus: 40, milestone: 'Ultimate Milestone' },
    { search: 'jooe', games: 13, skillBadges: 92, points: 59.0, bonus: 40, milestone: 'Ultimate Milestone' },
    { search: 'rizki', games: 13, skillBadges: 92, points: 59.0, bonus: 40, milestone: 'Ultimate Milestone' },
    { search: 'nabilah', games: 12, skillBadges: 93, points: 58.5, bonus: 40, milestone: 'Ultimate Milestone' },
    { search: 'vicky', games: 13, skillBadges: 86, points: 56.0, bonus: 40, milestone: 'Ultimate Milestone' },
    { search: 'gusti', games: 13, skillBadges: 86, points: 56.0, bonus: 40, milestone: 'Ultimate Milestone' },
    { search: 'abdulloh', games: 13, skillBadges: 80, points: 53.0, bonus: 40, milestone: 'Ultimate Milestone' },
    { search: 'nouval', games: 13, skillBadges: 75, points: 50.5, bonus: 40, milestone: 'Ultimate Milestone' }
  ];

  const payload = [];

  for (const p of participants) {
    const pNorm = norm(p.nama);
    const refMatch = referenceUpdates.find(ref => pNorm.includes(ref.search));

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
      // Carry forward from previous snapshot
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

  console.log(`Payload prepared: ${payload.length} rows for snapshot date ${snapshotDate}`);

  // Upsert in chunks of 50 to Supabase
  for (let i = 0; i < payload.length; i += 50) {
    const chunk = payload.slice(i, i + 50);
    const { error } = await supabase
      .from('snapshots')
      .upsert(chunk, { onConflict: 'participant_id,snapshot_date' });

    if (error) {
      console.error(`Chunk ${i} upsert error:`, error);
    } else {
      console.log(`Chunk ${i} to ${i + chunk.length} upserted successfully.`);
    }
  }

  console.log(`\n=== LEADERBOARD SNAPSHOT 2026-08-30 SYNC COMPLETED ===`);
});
