/* 

 Name: AI Image Generator
 Author: Skyzopedia
 Contact: https://t.me/Xskycode
 Time: 17-12-2025
 
*/

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const { URLSearchParams } = require('url');

async function flataiGenerateImage(prompt) {
  if (!prompt) throw new Error('Prompt wajib diisi');

  const page = await fetch('https://flatai.org/ai-image-generator-free-no-signup/', {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Linux; Android 15; 23124RA7EO Build/AQ3A.240829.003)',
      'Accept': 'text/html'
    }
  }).then(res => res.text());

  const nonceMatch = page.match(/ai_generate_image_nonce":"([a-f0-9]+)"/i);
  if (!nonceMatch) throw new Error('Nonce tidak ditemukan');

  const nonce = nonceMatch[1];

  const data = new URLSearchParams();
  data.append('action', 'ai_generate_image');
  data.append('nonce', nonce);
  data.append('prompt', prompt);
  data.append('aspect_ratio', '1:1');
  data.append('seed', Date.now().toString());
  data.append('style_model', 'flataipro');

  const res = await fetch('https://flatai.org/wp-admin/admin-ajax.php', {
    method: 'POST',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Linux; Android 15; 23124RA7EO Build/AQ3A.240829.003)',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'x-requested-with': 'XMLHttpRequest',
      'origin': 'https://flatai.org',
      'referer': 'https://flatai.org/ai-image-generator-free-no-signup/'
    },
    body: data.toString()
  });

  const json = await res.json();
  if (!json || json.success === false) throw new Error('Generate image gagal');

  return json;
}

// Contoh Penggunaan
flataiGenerateImage("Buatkan Saya logo S Keren Aesthetic").then(tes => console.log(tes))
