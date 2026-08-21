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

  console.log('--- TEST QUERY 1: snapshots targetDate ---');
  const q1 = await supabase
    .from('snapshots')
    .select('points, bonus_points, milestone, games, skill_badges, participant_id, snapshot_date, participants(nama)')
    .eq('snapshot_date', '2026-08-16');
  console.log('Query 1 error:', q1.error);
  console.log('Query 1 count:', q1.data?.length);

  console.log('--- TEST QUERY 2: allHistory ---');
  const q2 = await supabase
    .from('snapshots')
    .select('participant_id, points, bonus_points, snapshot_date')
    .order('snapshot_date', { ascending: true });
  console.log('Query 2 error:', q2.error);
  console.log('Query 2 count:', q2.data?.length);
});
