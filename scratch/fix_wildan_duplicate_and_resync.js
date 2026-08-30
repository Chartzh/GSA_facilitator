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

  console.log('=== FIXING WILDAN DUPLICATE & RESYNCING LEADERBOARD ===');

  // Fix ID 84 on 2026-08-23 and 2026-08-30
  const { error: err84_23 } = await supabase
    .from('snapshots')
    .upsert({
      participant_id: 84,
      snapshot_date: '2026-08-23',
      points: 0,
      bonus_points: 0,
      milestone: null,
      games: 0,
      skill_badges: 0
    }, { onConflict: 'participant_id,snapshot_date' });
  if (err84_23) console.error('Error 84_23:', err84_23);

  const { error: err84_30 } = await supabase
    .from('snapshots')
    .upsert({
      participant_id: 84,
      snapshot_date: '2026-08-30',
      points: 0,
      bonus_points: 0,
      milestone: null,
      games: 0,
      skill_badges: 0
    }, { onConflict: 'participant_id,snapshot_date' });
  if (err84_30) console.error('Error 84_30:', err84_30);

  // Ensure ID 4 (Muhammad Wildan Alghifari - e80a907c) is correctly 99.5 PT on 2026-08-23 and 2026-08-30
  const { error: err4_23 } = await supabase
    .from('snapshots')
    .upsert({
      participant_id: 4,
      snapshot_date: '2026-08-23',
      points: 59.5,
      bonus_points: 40,
      milestone: 'Ultimate Milestone',
      games: 13,
      skill_badges: 93
    }, { onConflict: 'participant_id,snapshot_date' });
  if (err4_23) console.error('Error 4_23:', err4_23);

  const { error: err4_30 } = await supabase
    .from('snapshots')
    .upsert({
      participant_id: 4,
      snapshot_date: '2026-08-30',
      points: 59.5,
      bonus_points: 40,
      milestone: 'Ultimate Milestone',
      games: 13,
      skill_badges: 93
    }, { onConflict: 'participant_id,snapshot_date' });
  if (err4_30) console.error('Error 4_30:', err4_30);

  console.log('✅ Wildan duplicate fix completed!');
});
