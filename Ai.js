/* 

 Name: AI Chat Deepsek Model
 Author: Skyzopedia
 Contact: https://t.me/Xskycode
 Time: 16-12-2025
 
*/


const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

async function sendToGPT(message) {
  try {
    const data = JSON.stringify({
      messages: [
        {
          content: message,
          role: "user"
        }
      ]
    });

    const options = {
      method: 'POST',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Linux; Android 15; 23124RA7EO Build/AQ3A.240829.003) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.7444.174 Mobile Safari/537.36',
        'Accept-Encoding': 'gzip, deflate, br, zstd',
        'Content-Type': 'application/json',
        'sec-ch-ua-platform': '"Android"',
        'sec-ch-ua': '"Chromium";v="142", "Android WebView";v="142", "Not_A Brand";v="99"',
        'sec-ch-ua-mobile': '?1',
        'Origin': 'https://deepseek.me',
        'X-Requested-With': 'mark.via.gp',
        'Sec-Fetch-Site': 'cross-site',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Dest': 'empty',
        'Referer': 'https://deepseek.me/',
        'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7'
      },
      body: data
    };

    const response = await fetch('https://wewordle.org/gptapi/v1/web/turbo', options);
    const result = await response.json();
    return result?.message?.content || "No Respons"

  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

// Contoh penggunaan
(async () => {
  const res = await sendToGPT("Haalo");
  console.log(res);
})();
