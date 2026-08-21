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
  const targetDate = '2026-08-16';

  const { data, error } = await supabase
    .from('snapshots')
    .select('participant_id, points, bonus_points, milestone, games, skill_badges, snapshot_date, participants(nama)')
    .eq('snapshot_date', targetDate);

  console.log('Query 1 error:', error);
  console.log('Query 1 data count:', data?.length);

  const { data: allHistory, error: hErr } = await supabase
    .from('snapshots')
    .select('participant_id, points, bonus_points, snapshot_date')
    .order('snapshot_date', { ascending: true });

  console.log('History error:', hErr);
  console.log('History count:', allHistory?.length);

  const earliestMap = new Map();
  if (allHistory) {
    allHistory.forEach(h => {
      const pid = h.participant_id;
      if (!pid) return;
      const score = (Number(h.points) || 0) + (Number(h.bonus_points) || 0);
      const timestamp = new Date(h.snapshot_date).getTime();
      if (!earliestMap.has(pid)) {
        earliestMap.set(pid, new Map());
      }
      const pScores = earliestMap.get(pid);
      if (!pScores.has(score) || timestamp < pScores.get(score)) {
        pScores.set(score, timestamp);
      }
    });
  }

  if (data) {
    data.forEach(p => {
      const tot = (Number(p.points) || 0) + (Number(p.bonus_points) || 0);
      const pMap = earliestMap.get(p.participant_id);
      p.earliestTime = pMap?.get(tot) || new Date(p.snapshot_date || '2026-08-21').getTime();
    });

    const sorted = [...data].sort((a, b) => {
      const totalA = (Number(a.points) || 0) + (Number(a.bonus_points) || 0);
      const totalB = (Number(b.points) || 0) + (Number(b.bonus_points) || 0);
      if (totalB !== totalA) return totalB - totalA;

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

    console.log('--- LEADERBOARD TOP 10 (SUCCESS) ---');
    sorted.forEach((r, idx) => {
      console.log(`#${idx + 1}: ${r.participants?.nama || r.participants?.[0]?.nama} - ${r.points} + ${r.bonus_points} = ${(Number(r.points)||0) + (Number(r.bonus_points)||0)} (Earliest: ${r.earliestTime})`);
    });
  }
}).catch(console.error);
