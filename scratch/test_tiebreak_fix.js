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
  const targetDate = '2026-08-23';

  const { data } = await supabase
    .from('snapshots')
    .select('participant_id, points, bonus_points, milestone, games, skill_badges, snapshot_date, participants(nama)')
    .eq('snapshot_date', targetDate);

  const { data: allHistory } = await supabase
    .from('snapshots')
    .select('participant_id, points, bonus_points, snapshot_date')
    .order('snapshot_date', { ascending: true });

  data.forEach(p => {
    const tot = (Number(p.points) || 0) + (Number(p.bonus_points) || 0);
    let earliestDate = p.snapshot_date || '2026-08-23';

    if (allHistory) {
      for (const h of allHistory) {
        if (h.participant_id === p.participant_id) {
          const hScore = (Number(h.points) || 0) + (Number(h.bonus_points) || 0);
          if (hScore >= tot) {
            earliestDate = h.snapshot_date;
            break;
          }
        }
      }
    }
    p.earliestTime = new Date(earliestDate).getTime();
    p.earliestDateStr = earliestDate;
  });

  const sorted = [...data].sort((a, b) => {
    const totalA = (Number(a.points) || 0) + (Number(a.bonus_points) || 0);
    const totalB = (Number(b.points) || 0) + (Number(b.bonus_points) || 0);
    if (totalB !== totalA) return totalB - totalA;

    // Tie-breaker: Earliest Achieved Timestamp ASC
    const timeA = Number(a.earliestTime) || 0;
    const timeB = Number(b.earliestTime) || 0;
    if (timeA !== timeB) return timeA - timeB;

    const bonusA = Number(a.bonus_points) || 0;
    const bonusB = Number(b.bonus_points) || 0;
    if (bonusB !== bonusA) return bonusB - bonusA;

    const badgesA = Number(a.skill_badges) || 0;
    const badgesB = Number(b.skill_badges) || 0;
    if (badgesB !== badgesA) return badgesB - badgesA;

    const gamesA = Number(a.games) || 0;
    const gamesB = Number(b.games) || 0;
    if (gamesB !== gamesA) return gamesB - gamesA;

    return String(a.participant_id || '').localeCompare(String(b.participant_id || ''));
  }).slice(0, 10);

  console.log('=== TEST TIEBREAK FIX RESULT ===');
  sorted.forEach((r, idx) => {
    const name = r.participants?.nama || r.participants?.[0]?.nama || 'Peserta';
    const totalP = (Number(r.points)||0) + (Number(r.bonus_points)||0);
    console.log(`#${idx + 1}: ${name} | Total Poin: ${totalP} | Earliest Date Reached: ${r.earliestDateStr}`);
  });
});
