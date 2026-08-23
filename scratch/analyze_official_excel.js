import fs from 'fs';
import { load } from 'cheerio';

async function main() {
  const filePath = '/run/media/jeep/506C0AC66C0AA6B6/UIN Jakarta/Project Gabut/Google Cloud Arcade Facitilitator/Laporan_Progres_Fasil_Muhammad_Rajif_Raditya.xls';
  const html = fs.readFileSync(filePath, 'utf8');
  const $ = load(html);

  const participants = [];
  let headerFound = false;

  $('tr').each((i, tr) => {
    const cells = [];
    $(tr).find('th, td').each((j, td) => {
      cells.push($(td).text().trim());
    });

    if (cells[0] === 'NO' && cells[1] === 'NAMA PESERTA') {
      headerFound = true;
      return;
    }

    if (headerFound && cells.length >= 5 && !isNaN(parseInt(cells[0]))) {
      const no = parseInt(cells[0]);
      const nama = cells[1];
      const games = parseInt(cells[2]) || 0;
      const skillBadges = parseInt(cells[3]) || 0;
      const totalPoin = parseFloat(cells[4]) || 0.0;

      participants.push({ no, nama, games, skillBadges, totalPoin });
    }
  });

  console.log(`Successfully parsed ${participants.length} participants from official report.`);

  // Sort participants by totalPoin DESC, games DESC, skillBadges DESC
  const sorted = [...participants].sort((a, b) => {
    if (b.totalPoin !== a.totalPoin) return b.totalPoin - a.totalPoin;
    if (b.games !== a.games) return b.games - a.games;
    return b.skillBadges - a.skillBadges;
  });

  console.log('\n=== OFFICIAL REPORT TOP 20 PARTICIPANTS ===');
  sorted.slice(0, 20).forEach((p, idx) => {
    console.log(`#${idx + 1}: ${p.nama} | Games: ${p.games} | Skill Badges: ${p.skillBadges} | TOTAL POIN: ${p.totalPoin}`);
  });
}

main().catch(console.error);
