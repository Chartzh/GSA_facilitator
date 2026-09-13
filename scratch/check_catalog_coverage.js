import { CATALOG_SKILL_BADGES } from '../src/config/catalogData.ts';
import { SKILL_BADGES, EXTRA_BADGES_ALLOWED } from '../src/config/program.ts';

function checkCatalogCoverage() {
  console.log(`=== CHECKING 95 CATALOG SKILL BADGES COVERAGE IN PROGRAM.TS ===`);
  console.log(`Catalog Count: ${CATALOG_SKILL_BADGES.length}`);
  console.log(`Syllabus Count: ${SKILL_BADGES.length}`);
  console.log(`Extra Badges Allowed Count: ${EXTRA_BADGES_ALLOWED.length}`);

  const normalizeTitle = (t) => (t || '').toLowerCase().trim().replace(/[^a-z0-9]/g, '');

  const syllabusNorms = new Set(SKILL_BADGES.map(b => normalizeTitle(b.name)));

  const missingFromBoth = [];

  CATALOG_SKILL_BADGES.forEach((badge, idx) => {
    const catNorm = normalizeTitle(badge.name);
    const inSyllabus = syllabusNorms.has(catNorm) || Array.from(syllabusNorms).some(s => s.includes(catNorm) || catNorm.includes(s));

    const inExtra = EXTRA_BADGES_ALLOWED.some(extraName => {
      const eNorm = normalizeTitle(extraName);
      return catNorm === eNorm || catNorm.includes(eNorm) || eNorm.includes(catNorm);
    });

    if (!inSyllabus && !inExtra) {
      missingFromBoth.push({ index: idx + 1, name: badge.name });
    }
  });

  console.log(`\nMissing Badges Count: ${missingFromBoth.length}`);
  missingFromBoth.forEach(m => {
    console.log(`- #${m.index}: "${m.name}"`);
  });
}

checkCatalogCoverage();
