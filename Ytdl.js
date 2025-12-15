/* 

 Name: YouTube Downloader
 Author: Skyzopedia
 Contact: https://t.me/Xskycode
 Time: 16-12-2025
 
*/

async function Ytdl(url) {
const data = JSON.stringify({
  "url": url
});

const options = {
  method: 'POST',
  headers: {
    'User-Agent': 'Mozilla/5.0 (Linux; Android 15; 23124RA7EO Build/AQ3A.240829.003) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.7444.174 Mobile Safari/537.36',
    'Accept': 'application/json, text/plain, */*',
    'Accept-Encoding': 'gzip, deflate, br, zstd',
    'Content-Type': 'application/json',
    'sec-ch-ua-platform': '"Android"',
    'sec-ch-ua': '"Chromium";v="142", "Android WebView";v="142", "Not_A Brand";v="99"',
    'sec-ch-ua-mobile': '?1',
    'origin': 'https://www.clipto.com',
    'x-requested-with': 'mark.via.gp',
    'sec-fetch-site': 'same-origin',
    'sec-fetch-mode': 'cors',
    'sec-fetch-dest': 'empty',
    'referer': 'https://www.clipto.com/id/media-downloader/youtube-downloader',
    'accept-language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
    'priority': 'u=1, i',
    'Cookie': 'NEXT_LOCALE=id'
  },
  body: data
};

return fetch('https://www.clipto.com/api/youtube', options)
  .then(response => response.json())
  .then(result => result)
  .catch(error => error);
}

// Contoh Penggunaan
return Ytdl("https://youtu.be/gN3q_yLjT_I?si=gbyKu3IecdbUXHxF")
