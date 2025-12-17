/* 

 Name: Bstation Video Downloader
 Author: Skyzopedia
 Contact: https://t.me/Xskycode
 Time: 17-12-2025
 
*/

const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));
const { URLSearchParams } = require('url');

async function BstationDl(url) {
  const welcomeURL =
    'https://www.tubeninja.net/id/welcome?url=' + encodeURIComponent(url);
  const getPage = await fetch(welcomeURL, {
    headers: {
      'User-Agent': 'Mozilla/5.0',
      Accept: 'text/html',
    },
  });

  const html = await getPage.text();
  const csrfMatch = html.match(/csrfmiddlewaretoken'\s*:\s*'([^']+)'/);
  if (!csrfMatch) throw new Error('CSRF HTML tidak ditemukan');
  const csrfHTML = csrfMatch[1];
  const cookies = getPage.headers.raw()['set-cookie'] || [];
  const csrfCookie = cookies
    .find((c) => c.startsWith('csrftoken='))
    ?.match(/csrftoken=([^;]+)/)?.[1];
  if (!csrfCookie) throw new Error('Cookie csrftoken tidak ditemukan');
  const form = new URLSearchParams();
  form.append('url', url);
  form.append('csrfmiddlewaretoken', csrfHTML);
  const post = await fetch('https://www.tubeninja.net/get', {
    method: 'POST',
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Linux; Android 15; Mobile Safari)',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'X-Requested-With': 'XMLHttpRequest',
      Origin: 'https://www.tubeninja.net',
      Referer: welcomeURL,
      Cookie: `csrftoken=${csrfCookie}`,
    },
    body: form.toString(),
  });

  const resultHTML = await post.text();
  const data = {
    title: null,
    thumbnail: null,
    mp4: [],
    mp3: [],
  };

  const titleMatch = resultHTML.match(/<h1[^>]*>([^<]+)<\/h1>/);
  if (titleMatch) data.title = titleMatch[1].trim();

  const thumbMatch = resultHTML.match(
    /<img src="([^"]+)" class="img-fluid img-rounded thumbnail"/
  );
  if (thumbMatch) data.thumbnail = thumbMatch[1];

  const mp4Regex =
    /<a[^>]+href="([^"]+)"[^>]*download[^>]*>[\s\S]*?\.mp4[\s\S]*?<small>([^<]+)<\/small>/gi;

  let m;
  while ((m = mp4Regex.exec(resultHTML)) !== null) {
    data.mp4.push({
      url: m[1].replace(/&amp;/g, '&'),
      size: m[2].trim(),
    });
  }

  const mp3Regex = /<a[^>]+href="([^"]+)"[^>]*>[\s\S]*?\.mp3/gi;
  while ((m = mp3Regex.exec(resultHTML)) !== null) {
    data.mp3.push({
      url: m[1],
    });
  }

  return data;
}

// Contoh Penggunaan
(async () => {
  try {
    const res = await BstationDl('https://www.bilibili.tv/id/video/2002659646');
    console.log(JSON.stringify(res, null, 2));
  } catch (e) {
    console.error(e);
  }
})();
