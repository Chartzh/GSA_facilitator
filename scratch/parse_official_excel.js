import fs from 'fs';
import { load } from 'cheerio';

async function main() {
  const filePath = '/run/media/jeep/506C0AC66C0AA6B6/UIN Jakarta/Project Gabut/Google Cloud Arcade Facitilitator/Laporan_Progres_Fasil_Muhammad_Rajif_Raditya.xls';
  const html = fs.readFileSync(filePath, 'utf8');
  const $ = load(html);

  console.log('--- PARSING OFFICIAL EXCEL REPORT ---');
  const rows = [];
  $('tr').each((i, tr) => {
    const row = [];
    $(tr).find('th, td').each((j, td) => {
      row.push($(td).text().trim());
    });
    if (row.length > 0) {
      rows.push(row);
    }
  });

  console.log(`Total table rows found: ${rows.length}`);
  rows.slice(0, 15).forEach((r, idx) => {
    console.log(`Row ${idx}:`, r);
  });
}

main().catch(console.error);
