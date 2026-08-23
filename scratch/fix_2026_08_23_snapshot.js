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

  // Find participants missing in 2026-08-23
  const { data: pAll } = await supabase.from('participants').select('*');
  const { data: s23 } = await supabase.from('snapshots').select('participant_id').eq('snapshot_date', '2026-08-23');

  const existingSet = new Set(s23.map(s => s.participant_id));
  const missingParticipants = pAll.filter(p => !existingSet.has(p.id));

  console.log(`Total missing participants in 2026-08-23 snapshot: ${missingParticipants.length}`);

  // Fetch 2026-08-16 snapshot data as fallback for missing participants
  const { data: s16 } = await supabase.from('snapshots').select('*').eq('snapshot_date', '2026-08-16');
  const s16Map = new Map(s16.map(s => [s.participant_id, s]));

  const fillPayload = missingParticipants.map(p => {
    const prev = s16Map.get(p.id) || { points: 0, bonus_points: 0, milestone: null, games: 0, skill_badges: 0 };
    return {
      participant_id: p.id,
      snapshot_date: '2026-08-23',
      points: prev.points,
      bonus_points: prev.bonus_points,
      milestone: prev.milestone,
      games: prev.games,
      skill_badges: prev.skill_badges
    };
  });

  if (fillPayload.length > 0) {
    const { error } = await supabase.from('snapshots').upsert(fillPayload, { onConflict: 'participant_id,snapshot_date' });
    if (error) {
      console.error('Fill error:', error);
    } else {
      console.log(`Successfully filled ${fillPayload.length} missing participant snapshots for 2026-08-23!`);
    }
  }

  // Also rescrape Neisya Syafina live to ensure her snapshot for 2026-08-23 is 100% accurate
  const neisyaP = pAll.find(p => p.nama.includes('Neisya'));
  if (neisyaP) {
    console.log('Rescraping Neisya Syafina live...');
    const scrapeModule = await import('../api/_scrape.js');
    const response = await fetch(neisyaP.profile_url, {
      headers: {
        'Accept-Language': 'en-US,en;q=0.9',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 (GCAF-Tracker/2026)',
        'accept': 'text/html,application/xhtml+xml'
      }
    });
    const html = await response.text();
    const parsed = scrapeModule.parseProfileHtml(html, neisyaP.profile_url);

    const totalBadges = parsed.validSyllabusBadges.length + parsed.validExtraBadges.length;
    const gamesCount = parsed.validGames.length;
    const points = gamesCount + (totalBadges * 0.5);
    const bonus = parsed.milestoneBonus;

    await supabase.from('snapshots').upsert([{
      participant_id: neisyaP.id,
      snapshot_date: '2026-08-23',
      points,
      bonus_points: bonus,
      milestone: parsed.currentTier?.label || 'Ultimate Milestone',
      games: gamesCount,
      skill_badges: totalBadges
    }], { onConflict: 'participant_id,snapshot_date' });

    console.log(`Neisya updated for 2026-08-23: Games=${gamesCount}, Badges=${totalBadges}, Points=${points + bonus}`);
  }
});
