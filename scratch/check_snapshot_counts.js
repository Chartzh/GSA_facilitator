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

  const { data: s23 } = await supabase.from('snapshots').select('*').eq('snapshot_date', '2026-08-23');
  const { data: s16 } = await supabase.from('snapshots').select('*').eq('snapshot_date', '2026-08-16');

  console.log('Snapshot 2026-08-23 count:', s23?.length);
  console.log('Snapshot 2026-08-16 count:', s16?.length);

  // Check if Neisya Syafina is in 2026-08-23
  const { data: neisyaP } = await supabase.from('participants').select('id, nama').ilike('nama', '%Neisya%');
  console.log('Neisya participant:', neisyaP);
  if (neisyaP?.length > 0) {
    const nid = neisyaP[0].id;
    const { data: neisyaS23 } = await supabase.from('snapshots').select('*').eq('participant_id', nid).eq('snapshot_date', '2026-08-23');
    console.log('Neisya in 2026-08-23:', neisyaS23);
  }
});
