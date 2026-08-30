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

  const { data: wildans } = await supabase.from('participants').select('*').ilike('nama', '%wildan%');
  console.log('--- WILDAN PARTICIPANTS IN DB ---');
  console.log(JSON.stringify(wildans, null, 2));

  // Also check all 256 participants for duplicate profile_urls or duplicate names
  const { data: allP } = await supabase.from('participants').select('*');
  const urlCount = new Map();
  allP.forEach(p => {
    const normUrl = p.profile_url ? p.profile_url.toLowerCase().trim() : '';
    if (!urlCount.has(normUrl)) urlCount.set(normUrl, []);
    urlCount.get(normUrl).push(p);
  });

  console.log('\n--- DUPLICATE PROFILE URLS IN PARTICIPANTS TABLE ---');
  for (const [url, list] of urlCount.entries()) {
    if (list.length > 1) {
      console.log(`URL: ${url}`);
      console.log(JSON.stringify(list, null, 2));
    }
  }
});
