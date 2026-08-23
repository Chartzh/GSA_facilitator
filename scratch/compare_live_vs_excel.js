import fs from 'fs';
import { load } from 'cheerio';
import { parseProfileHtml } from '../api/_scrape.js';

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

async function main() {
  const excelPath = '/run/media/jeep/506C0AC66C0AA6B6/UIN Jakarta/Project Gabut/Google Cloud Arcade Facitilitator/Laporan_Progres_Fasil_Muhammad_Rajif_Raditya.xls';
  const htmlExcel = fs.readFileSync(excelPath, 'utf8');
  const $excel = load(htmlExcel);

  const excelMap = new Map();
  let headerFound = false;

  $excel('tr').each((i, tr) => {
    const cells = [];
    $excel(tr).find('th, td').each((j, td) => cells.push($excel(td).text().trim()));
    if (cells[0] === 'NO' && cells[1] === 'NAMA PESERTA') {
      headerFound = true;
      return;
    }
    if (headerFound && cells.length >= 5 && !isNaN(parseInt(cells[0]))) {
      excelMap.set(cells[1], {
        games: parseInt(cells[2]) || 0,
        skillBadges: parseInt(cells[3]) || 0,
        totalPoin: parseFloat(cells[4]) || 0.0
      });
    }
  });

  // Test profiles to compare
  const targets = [
    { name: 'Rizki Fais Mubarok', url: 'https://www.skills.google/public_profiles/ca5219c8-bba6-49b2-af1d-fa1b1e993da4', excelName: 'Rizki Fais Mubarok' },
    { name: 'Jooe Pella', url: 'https://www.skills.google/public_profiles/1fcf5233-8a16-4e8b-ac88-e09a64908981', excelName: 'Jooe Pella' },
    { name: 'Wildan Alghifari', url: 'https://www.skills.google/public_profiles/e80a907c-d02d-4646-b199-1197c380068f', excelName: 'Wildan Alghifari' },
    { name: 'Neisya Syafina', url: 'https://www.skills.google/public_profiles/c4464f5f-7706-4ce0-ba94-1880caf2d53e', excelName: 'Neisya Syafina' },
    { name: 'Gusti Raden Pamungkas Yudapradja', url: 'https://www.skills.google/public_profiles/8b0451cf-e1cf-4d92-bfec-179fb7563148', excelName: 'Gusti Raden Pamungkas Yudapradja' }
  ];

  console.log('=== COMPARISON: LIVE SCRAPER vs OFFICIAL GOOGLE EXCEL REPORT ===\n');

  for (const t of targets) {
    const excelData = excelMap.get(t.excelName) || { games: 'N/A', skillBadges: 'N/A', totalPoin: 'N/A' };
    
    try {
      const res = await fetch(t.url, {
        headers: {
          'Accept-Language': 'en-US,en;q=0.9',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 (GCAF-Tracker/2026)',
          'accept': 'text/html,application/xhtml+xml'
        }
      });
      const html = await res.text();
      const parsed = parseProfileHtml(html, t.url);
      const liveBadges = parsed.validSyllabusBadges.length + parsed.validExtraBadges.length;

      console.log(`👤 ${t.name}`);
      console.log(`   Official Excel : Games = ${excelData.games}, Skill Badges = ${excelData.skillBadges}, Total Poin = ${excelData.totalPoin}`);
      console.log(`   Live Scraper   : Games = ${parsed.validGames.length}, Skill Badges = ${liveBadges}, Total Poin = ${parsed.totalPointsWithBonus}`);
      console.log(`   Diff (Badges)  : Live (${liveBadges}) vs Excel (${excelData.skillBadges}) → Delta = ${liveBadges - excelData.skillBadges}\n`);
    } catch (err) {
      console.log(`❌ Error fetching ${t.name}: ${err.message}`);
    }
  }
}

main().catch(console.error);
