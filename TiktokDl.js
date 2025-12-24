/* 

 Name: Tiktok Downloader (Slide Foto Support)
 Author: Skyzopedia
 Contact: https://t.me/Xskycode
 Time: 24-12-2025
 
*/

const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));
const { URLSearchParams } = require('url');
const cheerio = require('cheerio');

function randomTT(length = 8) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let res = '';
  for (let i = 0; i < length; i++) {
    res += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return res;
}

function randomIP() {
  return Array.from({ length: 4 }, () => Math.floor(Math.random() * 256)).join('.');
}

async function sssTikDownload(tiktokUrl) {
  const tt = randomTT(8);
  const ip = randomIP();

  const data = new URLSearchParams();
  data.append('id', tiktokUrl);
  data.append('locale', 'id');
  data.append('tt', tt);
  data.append('debug', `ab=1&loc=ID&ip=${ip}`);

  const options = {
    method: 'POST',
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Linux; Android 15) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143 Mobile Safari/537.36',
      'Content-Type': 'application/x-www-form-urlencoded',
      origin: 'https://ssstik.io',
      referer: 'https://ssstik.io/id-1',
      'x-requested-with': 'mark.via.gp'
    },
    body: data
  };

  const res = await fetch('https://ssstik.io/abc?url=dl', options);
  const html = await res.text();
  const $ = cheerio.load(html);
  const author =
    $('#avatarAndTextUsual h2').first().text().trim() ||
    $('#avatar_and_text h2').first().text().trim();

  const caption =
    $('#avatarAndTextUsual p.maintext').first().text().trim() ||
    $('#avatar_and_text p.maintext').first().text().trim();
  const video = $('a.without_watermark').attr('href');
  const slides = [];
  $('#mainpicture .splide__slide a.download_link.slide').each((i, el) => {
    const url = $(el).attr('href');
    if (url) slides.push(url);
  });

  if (video) {
    return {
      type: 'video',
      author,
      caption,
      download: video
    };
  }

  if (slides.length > 0) {
    return {
      type: 'slides',
      author,
      caption,
      total: slides.length,
      slides
    };
  }

  throw new Error('Gagal mengambil video atau foto slide');
}

// Contoh Pemakaian 
(async () => {
  try {
    const result = await sssTikDownload('https://vt.tiktok.com/ZSP3JdC8N/');
    console.log(result);
  } catch (err) {
    console.error('Error:', err.message);
  }
})();
