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

  const { data: neisyaP } = await supabase.from('participants').select('id, nama').ilike('nama', '%Neisya%');
  const { data: wildanP } = await supabase.from('participants').select('id, nama').ilike('nama', '%Wildan%');

  console.log('Neisya ID:', neisyaP[0]?.id);
  console.log('Wildan ID:', wildanP[0]?.id);

  const nId = neisyaP[0]?.id;
  const wId = wildanP[0]?.id;

  const { data: nHistory } = await supabase.from('snapshots').select('*').eq('participant_id', nId).order('snapshot_date', { ascending: true });
  const { data: wHistory } = await supabase.from('snapshots').select('*').eq('participant_id', wId).order('snapshot_date', { ascending: true });

  console.log('\n--- NEISYA SNAPSHOT HISTORY ---');
  nHistory.forEach(r => console.log(`Date: ${r.snapshot_date} | Base: ${r.points} | Bonus: ${r.bonus_points} | Total: ${(Number(r.points)||0)+(Number(r.bonus_points)||0)} | Badges: ${r.skill_badges}`));

  console.log('\n--- WILDAN SNAPSHOT HISTORY ---');
  wHistory.forEach(r => console.log(`Date: ${r.snapshot_date} | Base: ${r.points} | Bonus: ${r.bonus_points} | Total: ${(Number(r.points)||0)+(Number(r.bonus_points)||0)} | Badges: ${r.skill_badges}`));
});
