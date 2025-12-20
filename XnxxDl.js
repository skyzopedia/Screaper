/* 

 Name: Xnxx Video Downloader
 Author: Skyzopedia
 Contact: https://t.me/Xskycode
 Time: 21-12-2025
 
*/

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const { URLSearchParams } = require('url');

function extractSkey(videoUrl) {
  const match = videoUrl.match(/video-([a-zA-Z0-9]+)/) || videoUrl.match(/\/([a-zA-Z0-9]{6,})\//);
  return match ? match[1] : null;
}

async function xnxxInfo(videoUrl) {
  if (!videoUrl) throw new Error('URL kosong');
  const skey = extractSkey(videoUrl);
  if (!skey) throw new Error('Gagal mengambil skey dari URL');
  const data = new URLSearchParams();
  data.append('surl', videoUrl);
  data.append('skey', skey);
  const options = {
    method: 'POST',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Linux; Android 15)',
      'Accept': 'application/json, text/javascript, */*; q=0.01',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'origin': 'https://www.downloadxnxxvideo.com',
      'referer': 'https://www.downloadxnxxvideo.com/',
      'x-requested-with': 'mark.via.gp'
    },
    body: data
  };
  const res = await fetch('https://video.google-files.info/makeuri.php', options);
  const json = await res.json();
  if (json.err !== 0) throw new Error('API error');
  let cdn = null;
  if (Array.isArray(json.formats)) {
    const mp4s = json.formats.filter(f => f.url && f.ext === 'mp4' && f.protocol === 'https');
    cdn = mp4s.find(f => f.format_id === 'high')?.url || mp4s[0]?.url || null;
  }
  return {
    title: json.fulltitle || json.title || null,
    thumbnail: json.thumbnail || null,
    original: json.original_url || json.webpage_url || videoUrl,
    download: cdn
  };
}


// Contoh Penggunaan
xnxxInfo("https://www.xnxx.com/video-133e5bda/porn_version_ankha_cowgirl_and_deep_blowjob").then(r => console.log(r)).catch(err => console.log(err))
