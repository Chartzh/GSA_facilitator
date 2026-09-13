import { supabase } from '../api/_db.js';

async function checkSupabaseState() {
  console.log('=== CHECKING SUPABASE DB STATE ===');
  
  // 1. Check snapshots dates & counts
  const { data: snapshots, error: snapErr } = await supabase
    .from('snapshots')
    .select('snapshot_date, participant_id')
    .order('snapshot_date', { ascending: false });

  if (snapErr) {
    console.error('Error fetching snapshots:', snapErr);
    return;
  }

  const countsMap = new Map();
  snapshots.forEach(s => {
    countsMap.set(s.snapshot_date, (countsMap.get(s.snapshot_date) || 0) + 1);
  });

  console.log('Snapshot dates and counts:');
  countsMap.forEach((count, dateStr) => {
    console.log(`- Date: ${dateStr} | Count: ${count} rows`);
  });

  // 2. Check participants count
  const { count: participantCount } = await supabase
    .from('participants')
    .select('*', { count: 'exact', head: true });

  console.log(`\nTotal Participants in DB: ${participantCount}`);

  // 3. Query 2026-09-06 rows if any
  const { data: sep6Data } = await supabase
    .from('snapshots')
    .select('participant_id, points, bonus_points, games, skill_badges, snapshot_date, participants(nama, profile_url)')
    .eq('snapshot_date', '2026-09-06');

  console.log(`\nRows for 2026-09-06 in DB: ${sep6Data ? sep6Data.length : 0}`);
  if (sep6Data && sep6Data.length > 0) {
    console.log('Sample rows for 2026-09-06:');
    sep6Data.slice(0, 10).forEach(r => {
      const name = r.participants?.nama || 'Unknown';
      console.log(`- ${name}: ${r.points + r.bonus_points} pts (${r.games}G / ${r.skill_badges}S)`);
    });
  }

  // 4. Query 2026-08-30 top 10 in DB
  const { data: aug30Data } = await supabase
    .from('snapshots')
    .select('participant_id, points, bonus_points, games, skill_badges, snapshot_date, participants(nama, profile_url)')
    .eq('snapshot_date', '2026-08-30');

  console.log(`\nRows for 2026-08-30 in DB: ${aug30Data ? aug30Data.length : 0}`);
}

checkSupabaseState().catch(console.error);
