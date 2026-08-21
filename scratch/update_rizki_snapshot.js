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

  // Re-scrape Rizki Fais Mubarok
  const url = 'https://www.skills.google/public_profiles/ca5219c8-bba6-49b2-af1d-fa1b1e993da4';
  const response = await fetch(url, {
    headers: {
      'Accept-Language': 'en-US,en;q=0.9',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 (GCAF-Tracker/2026)',
      'accept': 'text/html,application/xhtml+xml'
    }
  });
  const html = await response.text();
  const scrapeModule = await import('../api/_scrape.js');
  const parsed = scrapeModule.parseProfileHtml(html, url);

  const totalBadges = parsed.validSyllabusBadges.length + parsed.validExtraBadges.length;
  const gamesCount = parsed.validGames.length;
  const points = gamesCount + (totalBadges * 0.5);
  const bonus = parsed.milestoneBonus;

  console.log(`Updating Rizki Fais Mubarok: Games=${gamesCount}, Badges=${totalBadges}, BasePoints=${points}, Bonus=${bonus}, Total=${points + bonus}`);

  const { error } = await supabase
    .from('snapshots')
    .update({
      points: points,
      bonus_points: bonus,
      games: gamesCount,
      skill_badges: totalBadges,
      milestone: parsed.currentTier?.label || 'Ultimate Milestone'
    })
    .eq('participant_id', 12)
    .eq('snapshot_date', '2026-08-16');

  if (error) {
    console.error('Update error:', error);
  } else {
    console.log('Successfully updated Rizki Fais Mubarok snapshot in Supabase!');
  }
});
