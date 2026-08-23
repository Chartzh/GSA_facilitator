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
  console.log('Fetching Top 10 for default date...');
  const resDefault = await db.getTop10();
  console.log('DEFAULT DATE RESULT:', JSON.stringify(resDefault, null, 2));

  if (resDefault.availableDates) {
    for (const d of resDefault.availableDates) {
      console.log(`\n--- FETCHING FOR DATE: ${d} ---`);
      const resD = await db.getTop10(d);
      console.log(JSON.stringify(resD.top10, null, 2));
    }
  }
});
