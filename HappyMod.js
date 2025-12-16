/* 

 Name: Happy Mod Search
 Author: Skyzopedia
 Contact: https://t.me/Xskycode
 Time: 17-12-2025
 
*/

const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));
const cheerio = require('cheerio');
const { URLSearchParams } = require('url');

async function searchHappyMod(query) {
  const data = new URLSearchParams();
  data.append('q', query);

  const res = await fetch('https://id.happymod.cloud/search.html', {
    method: 'POST',
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Linux; Android 15) AppleWebKit/537.36 (KHTML, like Gecko) Chrome Mobile Safari/537.36',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'text/html'
    },
    body: data
  });

  const html = await res.text();
  const $ = cheerio.load(html);
  const results = [];

  $('ul.list > li.list-item').each((_, el) => {
    const a = $(el).find('a.list-box');

    const title = a.find('.list-info-title').text().trim();
    const href = a.attr('href');
    const url = href
      ? 'https://id.happymod.cloud' + href + "download.html"
      : null;

    const spans = a.find('.list-info-text').first().find('span');
    const size = spans.eq(2).text().trim() || null;

    const img =
      a.find('img').attr('data-src') ||
      a.find('img').attr('src') ||
      null;

    if (title && url) {
      results.push({
        title,
        url,
        size,
        icon: img
      });
    }
  });

  return results;
}

// Contoh Penggunaan
(async () => {
  const hasil = await searchHappyMod('capcut');
  console.log(hasil);
})();
