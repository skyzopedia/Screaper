/* 

 Name: Convert Image To Url
 Author: Skyzopedia
 Contact: https://t.me/Xskycode
 Time: 19-12-2025
 
*/

const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

async function uploadImageToUrl(imagePath) {
  const data = new FormData();
  const buffer = fs.readFileSync(imagePath);
  data.append('file', buffer, {
    filename: path.basename(imagePath),
    contentType: 'image/jpeg'
  });

  const options = {
    method: 'POST',
    headers: {
      ...data.getHeaders(),
      'User-Agent':
        'Mozilla/5.0 (Linux; Android 15; 23124RA7EO Build/AQ3A.240829.003) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.7444.174 Mobile Safari/537.36',
      'Accept-Encoding': 'gzip, deflate, br, zstd',
      'sec-ch-ua-platform': '"Android"',
      'sec-ch-ua':
        '"Chromium";v="142", "Android WebView";v="142", "Not_A Brand";v="99"',
      'sec-ch-ua-mobile': '?1',
      origin: 'https://www.image2url.com',
      'x-requested-with': 'mark.via.gp',
      'sec-fetch-site': 'same-origin',
      'sec-fetch-mode': 'cors',
      'sec-fetch-dest': 'empty',
      referer: 'https://www.image2url.com/',
      'accept-language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
      priority: 'u=1, i'
    },
    body: data
  };

  try {
    const res = await fetch('https://www.image2url.com/api/upload', options);
    const text = await res.json();
    return text;
  } catch (err) {
    throw err;
  }
}

// Contoh Penggunaan
(async () => {
  const imgPath = './p.jpg';
  try {
    const result = await uploadImageToUrl(imgPath);
    console.log(result);
  } catch (e) {
    console.error('Upload error:', e.message);
  }
})();
