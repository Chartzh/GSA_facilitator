import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('Tutorial Lab - Google Cloud Arcade X Dicoding.html', 'utf8');
console.log('HTML size:', html.length, 'bytes');

const $ = cheerio.load(html);

console.log('--- ALL IFRAMES AND LINKS ---');
console.log('Iframe count:', $('iframe').length);
console.log('Anchor count:', $('a').length);
console.log('Button count:', $('button').length);

const links = [];
$('a').each((i, el) => {
  const href = $(el).attr('href');
  if (href) links.push(href);
});

console.log('Sample links:', links.slice(0, 30));
