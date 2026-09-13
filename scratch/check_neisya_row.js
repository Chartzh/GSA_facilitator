import { supabase } from '../api/_db.js';

async function checkNeisyaRow() {
  const { data: p } = await supabase
    .from('participants')
    .select('id, nama')
    .or('nama.ilike.%neisya%,profile_url.ilike.%c4464f5f-7706-4ce0-ba94-1880caf2d53e%');

  const pId = p[0].id;

  const { data: snap } = await supabase
    .from('snapshots')
    .select('*')
    .eq('participant_id', pId)
    .eq('snapshot_date', '2026-09-06');

  console.log('Neisya Snapshot row on 2026-09-06:', snap);
}

checkNeisyaRow().catch(console.error);
