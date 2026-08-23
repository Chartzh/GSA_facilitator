import fs from 'fs';
import { load } from 'cheerio';

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
  const filePath = '/run/media/jeep/506C0AC66C0AA6B6/UIN Jakarta/Project Gabut/Google Cloud Arcade Facitilitator/Laporan_Progres_Fasil_Muhammad_Rajif_Raditya.xls';
  const html = fs.readFileSync(filePath, 'utf8');
  const $ = load(html);

  const excelRows = [];
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

      excelRows.push({ no, nama, games, skillBadges, totalPoin });
    }
  });

  console.log(`Parsed ${excelRows.length} participants from official report.`);

  // Get all existing participants from Supabase to match by name
  const { data: dbParticipants } = await supabase.from('participants').select('id, nama, profile_url');
  console.log(`DB has ${dbParticipants.length} participants.`);

  const norm = (s) => (s || '').toLowerCase().replace(/[^a-z0-9]/g, '');

  const dbMap = new Map();
  dbParticipants.forEach(p => {
    dbMap.set(norm(p.nama), p);
  });

  const snapshotPayload = [];
  let matchedCount = 0;
  let missingCount = 0;

  for (const r of excelRows) {
    const key = norm(r.nama);
    let match = dbMap.get(key);

    if (!match) {
      // Fuzzy matching by first 2 words
      const words = norm(r.nama).slice(0, 10);
      match = dbParticipants.find(p => norm(p.nama).slice(0, 10) === words);
    }

    if (match) {
      matchedCount++;
      // Calculate points
      const baseP = r.games + (r.skillBadges * 0.5);
      const bonusP = Math.max(0, r.totalPoin - baseP);

      let milestoneLabel = null;
      if (r.games >= 12 && r.skillBadges >= 56) milestoneLabel = 'Ultimate Milestone';
      else if (r.games >= 10 && r.skillBadges >= 42) milestoneLabel = 'Milestone 3';
      else if (r.games >= 8 && r.skillBadges >= 28) milestoneLabel = 'Milestone 2';
      else if (r.games >= 6 && r.skillBadges >= 14) milestoneLabel = 'Milestone 1';

      snapshotPayload.push({
        participant_id: match.id,
        snapshot_date: '2026-08-23',
        points: baseP,
        bonus_points: bonusP,
        milestone: milestoneLabel,
        games: r.games,
        skill_badges: r.skillBadges
      });
    } else {
      missingCount++;
      console.warn(`Unmatched participant: ${r.nama}`);
    }
  }

  console.log(`Matched: ${matchedCount}, Unmatched: ${missingCount}`);

  if (snapshotPayload.length > 0) {
    const { error } = await supabase
      .from('snapshots')
      .upsert(snapshotPayload, { onConflict: 'participant_id,snapshot_date' });

    if (error) {
      console.error('Supabase upsert error:', error);
    } else {
      console.log(`Successfully synced ${snapshotPayload.length} official participant snapshots for 2026-08-23!`);
    }
  }
});
