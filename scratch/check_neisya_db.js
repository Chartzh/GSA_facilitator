import { supabase } from '../api/_db.js';

async function checkNeisyaInDb() {
  console.log('=== SEARCHING NEISYA IN SUPABASE ===');

  // Search participant by name or profile_url
  const { data: neisyaParticipants, error: pErr } = await supabase
    .from('participants')
    .select('id, nama, profile_url')
    .or('nama.ilike.%neisya%,profile_url.ilike.%c4464f5f-7706-4ce0-ba94-1880caf2d53e%');

  console.log('Neisya Participants in DB:', neisyaParticipants);

  if (neisyaParticipants && neisyaParticipants.length > 0) {
    for (const np of neisyaParticipants) {
      const { data: snaps } = await supabase
        .from('snapshots')
        .select('*')
        .eq('participant_id', np.id)
        .order('snapshot_date', { ascending: false });

      console.log(`\nSnapshots for Participant ID ${np.id} (${np.nama}):`);
      snaps.forEach(s => console.log(`- Date: ${s.snapshot_date} | BasePts: ${s.points} | BonusPts: ${s.bonus_points} | Total: ${s.points + s.bonus_points} (${s.games}G / ${s.skill_badges}S)`));
    }
  }
}

checkNeisyaInDb().catch(console.error);
