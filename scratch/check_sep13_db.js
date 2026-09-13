import { supabase, getTop10 } from '../api/_db.js';

async function checkSep13State() {
  console.log('=== CHECKING SUPABASE DB FOR 2026-09-13 ===');
  
  const { data: dateRows } = await supabase
    .from('snapshots')
    .select('snapshot_date')
    .order('snapshot_date', { ascending: false });

  const countsMap = new Map();
  dateRows?.forEach(r => {
    if (r.snapshot_date) {
      countsMap.set(r.snapshot_date, (countsMap.get(r.snapshot_date) || 0) + 1);
    }
  });

  console.log('Snapshot dates and counts:');
  countsMap.forEach((count, dateStr) => {
    console.log(`- Date: ${dateStr} | Count: ${count} rows`);
  });

  const res = await getTop10('2026-09-13');
  console.log('\n--- TOP 10 RETURNED FOR 2026-09-13 ---');
  console.log('Last Updated Used:', res.lastUpdated);
  res.top10.forEach(p => {
    console.log(`#${p.rank} ${p.name} | Total: ${p.totalPoints} (${p.games}G / ${p.badges}S)`);
  });
}

checkSep13State().catch(console.error);
