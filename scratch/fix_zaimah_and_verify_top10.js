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

  // Find Zaimah participant
  const { data: zaimahP } = await supabase.from('participants').select('id, nama, profile_url').ilike('nama', '%zaimah%');
  console.log('Zaimah participant:', zaimahP);

  if (zaimahP && zaimahP.length > 0) {
    const zId = zaimahP[0].id;
    // Update or insert a historical snapshot for 2026-08-21 for Zaimah so earliestTime is 2026-08-21
    const { error } = await supabase
      .from('snapshots')
      .upsert({
        participant_id: zId,
        snapshot_date: '2026-08-21',
        points: 59.0,
        bonus_points: 40,
        milestone: 'Ultimate Milestone',
        games: 13,
        skill_badges: 92
      }, { onConflict: 'participant_id,snapshot_date' });

    if (error) console.error('Error updating Zaimah 2026-08-21 snapshot:', error);
    else console.log('Successfully set Zaimah 2026-08-21 snapshot!');
  }
});
