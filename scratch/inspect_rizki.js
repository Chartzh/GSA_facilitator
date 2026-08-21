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

  // Search for Rizki Fais Mubarok in participants
  const { data: pData } = await supabase
    .from('participants')
    .select('*')
    .ilike('nama', '%Rizki Fais%');

  console.log('Participant Rizki Fais:', pData);

  if (pData && pData.length > 0) {
    const pid = pData[0].id;
    const { data: sData } = await supabase
      .from('snapshots')
      .select('*')
      .eq('participant_id', pid);
    console.log('Snapshots for Rizki Fais:', sData);

    const url = pData[0].profile_url;
    console.log('Scraping live profile for Rizki Fais:', url);

    const scrapeModule = await import('../src/utils/scraper.ts');
    const res = await scrapeModule.scrapePublicProfile(url);
    console.log('LIVE SCRAPE RESULT:', {
      profileName: res.profileName,
      validGames: res.validGames.length,
      validSyllabusBadges: res.validSyllabusBadges.length,
      validExtraBadges: res.validExtraBadges.length,
      totalSkillBadgesCount: res.totalSkillBadgesCount,
      pointsFromGames: res.pointsFromGames,
      pointsFromSkillBadges: res.pointsFromSkillBadges,
      milestoneBonus: res.milestoneBonus,
      gearBonus: res.gearBonus,
      totalPointsWithBonus: res.totalPointsWithBonus
    });
  }
});
