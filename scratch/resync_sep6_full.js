import fetch from 'node-fetch';
import { supabase, saveSnapshotChunk } from '../api/_db.js';
import { parseProfileHtml } from '../api/_scrape.js';

async function runFullResyncForSep6() {
  const snapshotDate = '2026-09-06';
  console.log(`=== STARTING FULL RESYNC FOR DATE: ${snapshotDate} ===`);

  // 1. Fetch all participants from DB
  const { data: participants, error } = await supabase
    .from('participants')
    .select('id, nama, profile_url')
    .order('id', { ascending: true });

  if (error || !participants) {
    console.error('Failed to fetch participants:', error);
    return;
  }

  console.log(`Total participants to scrape: ${participants.length}`);

  const results = [];
  const CONCURRENCY = 15;
  let completed = 0;
  let succeeded = 0;
  let failed = 0;

  for (let i = 0; i < participants.length; i += CONCURRENCY) {
    const chunk = participants.slice(i, i + CONCURRENCY);
    const chunkPromises = chunk.map(async (p) => {
      try {
        const res = await fetch(p.profile_url, {
          headers: {
            'Accept-Language': 'en-US,en;q=0.9',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
          }
        });
        if (!res.ok) {
          return { participantId: p.id, nama: p.nama, profileUrl: p.profile_url, success: false, error: `HTTP ${res.status}` };
        }
        const html = await res.text();
        const scraped = parseProfileHtml(html, p.profile_url);

        return {
          participantId: p.id,
          nama: p.nama,
          profileUrl: p.profile_url,
          games: scraped.validGames.length,
          skillBadges: scraped.validSyllabusBadges.length + scraped.validExtraBadges.length,
          success: true
        };
      } catch (err) {
        return {
          participantId: p.id,
          nama: p.nama,
          profileUrl: p.profile_url,
          success: false,
          error: err?.message
        };
      }
    });

    const chunkResults = await Promise.all(chunkPromises);
    results.push(...chunkResults);

    const successfulInChunk = chunkResults.filter(r => r.success);
    succeeded += successfulInChunk.length;
    failed += chunkResults.length - successfulInChunk.length;
    completed += chunkResults.length;

    // Save batch to DB
    if (successfulInChunk.length > 0) {
      await saveSnapshotChunk(successfulInChunk, snapshotDate);
    }

    console.log(`Progress: ${completed}/${participants.length} | Succeeded: ${succeeded} | Failed: ${failed}`);
  }

  console.log(`\n=== RESYNC FOR ${snapshotDate} COMPLETED ===`);
  console.log(`Total Processed: ${completed}, Succeeded: ${succeeded}, Failed: ${failed}`);
}

runFullResyncForSep6().catch(console.error);
