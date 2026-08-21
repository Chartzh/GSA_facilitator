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

async function test() {
  const res = await fetch('https://www.skills.google/public_profiles/e80a907c-d02d-4646-b199-1197c380068f', {
    headers: {
      'Accept-Language': 'en-US,en;q=0.9',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
  });
  const html = await res.text();

  const { parseProfileHtml } = await import('../api/_scrape.js');
  const parsed = parseProfileHtml(html, 'https://www.skills.google/public_profiles/e80a907c-d02d-4646-b199-1197c380068f');

  console.log('--- WILDHAN EXCLUDED ITEMS COUNT:', parsed.excludedItems.length);
  parsed.excludedItems.forEach((ex, i) => {
    console.log(`${i+1}. "${ex.title}"`);
  });
}

test().catch(console.error);
