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

  const ids = [4, 54, 84, 123];
  const { data: snapshots } = await supabase.from('snapshots').select('*').in('participant_id', ids).order('snapshot_date');
  const { data: participants } = await supabase.from('participants').select('*').in('id', ids);

  const pMap = new Map();
  participants.forEach(p => pMap.set(p.id, p));

  console.log('--- ALL SNAPSHOTS FOR WILDAN PARTICIPANTS ---');
  snapshots.forEach(s => {
    const p = pMap.get(s.participant_id);
    console.log(`Date: ${s.snapshot_date} | ID: ${s.participant_id} | Name: ${p?.nama} | Points: ${s.points} | Bonus: ${s.bonus_points} | Total: ${s.points + s.bonus_points} | Games: ${s.games} | Badges: ${s.skill_badges}`);
  });
});
