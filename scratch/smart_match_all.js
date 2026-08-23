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

  const { data: dbParticipants } = await supabase.from('participants').select('id, nama, profile_url');

  const norm = (s) => (s || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const words = (s) => norm(s).split(/[^a-z0-9]+/).filter(Boolean);

  const matchedPayload = [];
  const unmatchedExcel = [];
  const usedDbIds = new Set();

  for (const r of excelRows) {
    const rNorm = norm(r.nama);
    
    // 1. Exact norm match
    let match = dbParticipants.find(p => !usedDbIds.has(p.id) && norm(p.nama) === rNorm);

    // 2. Substring match
    if (!match) {
      match = dbParticipants.find(p => {
        if (usedDbIds.has(p.id)) return false;
        const pNorm = norm(p.nama);
        return (rNorm.length >= 4 && pNorm.length >= 4) && (rNorm.includes(pNorm) || pNorm.includes(rNorm));
      });
    }

    // 3. Word overlap match (at least 1 word >= 4 chars matching)
    if (!match) {
      const rWords = rNorm.split('');
      match = dbParticipants.find(p => {
        if (usedDbIds.has(p.id)) return false;
        const pNorm = norm(p.nama);
        // Compare tokens
        const rTokens = r.nama.toLowerCase().split(/\s+/).filter(t => t.length >= 3);
        const pTokens = p.nama.toLowerCase().split(/\s+/).filter(t => t.length >= 3);
        return rTokens.some(rt => pTokens.some(pt => pt.includes(rt) || rt.includes(pt)));
      });
    }

    if (match) {
      usedDbIds.add(match.id);
      const baseP = r.games + (r.skillBadges * 0.5);
      const bonusP = Math.max(0, r.totalPoin - baseP);

      let milestoneLabel = null;
      if (r.games >= 12 && r.skillBadges >= 56) milestoneLabel = 'Ultimate Milestone';
      else if (r.games >= 10 && r.skillBadges >= 42) milestoneLabel = 'Milestone 3';
      else if (r.games >= 8 && r.skillBadges >= 28) milestoneLabel = 'Milestone 2';
      else if (r.games >= 6 && r.skillBadges >= 14) milestoneLabel = 'Milestone 1';

      matchedPayload.push({
        participant_id: match.id,
        snapshot_date: '2026-08-23',
        points: baseP,
        bonus_points: bonusP,
        milestone: milestoneLabel,
        games: r.games,
        skill_badges: r.skillBadges
      });
    } else {
      unmatchedExcel.push(r);
    }
  }

  console.log(`Matched: ${matchedPayload.length} / ${excelRows.length} participants.`);
  console.log(`Unmatched count: ${unmatchedExcel.length}`);

  if (unmatchedExcel.length > 0) {
    console.log('Unmatched Excel samples:');
    unmatchedExcel.slice(0, 15).forEach(u => console.log(`- ${u.nama}`));
  }

  if (matchedPayload.length > 0) {
    const { error } = await supabase
      .from('snapshots')
      .upsert(matchedPayload, { onConflict: 'participant_id,snapshot_date' });

    if (error) {
      console.error('Supabase upsert error:', error);
    } else {
      console.log(`Successfully upserted ${matchedPayload.length} official participant snapshots for 2026-08-23!`);
    }
  }
});
