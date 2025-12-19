/* 

 Name: YouTube Channel Stalker
 Author: Skyzopedia
 Contact: https://t.me/Xskycode
 Time: 19-12-2025
 
*/

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

function generateQuotaUser(length = 40) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

async function getYoutubeChannelInfoByUsername(username) {
    try {
        const options = {
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Linux; Android 15; 23124RA7EO Build/AQ3A.240829.003) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.7444.174 Mobile Safari/537.36',
                'Accept': 'application/json, text/javascript, */*; q=0.01',
                'Accept-Encoding': 'gzip, deflate, br, zstd',
                'sec-ch-ua-platform': '"Android"',
                'sec-ch-ua': '"Chromium";v="142", "Android WebView";v="142", "Not_A Brand";v="99"',
                'sec-ch-ua-mobile': '?1',
                'origin': 'https://mattw.io',
                'x-requested-with': 'mark.via.gp',
                'sec-fetch-site': 'same-site',
                'sec-fetch-mode': 'cors',
                'sec-fetch-dest': 'empty',
                'referer': 'https://mattw.io/',
                'accept-language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
                'priority': 'u=1, i'
            }
        };
        const url = `https://www.youtube.com/@${username}`;
        const yt = await fetch(`https://ytapi.apps.mattw.io/v1/resolve_url?url=${encodeURIComponent(url)}`, options)
            .then(res => res.json());
        if (!yt.channelId) throw new Error('Channel ID not found');
        const quotaUser = generateQuotaUser();
        const options2 = { ...options };

        const channelInfo = await fetch(`https://ytapi.apps.mattw.io/v3/channels?key=foo1&quotaUser=${quotaUser}&part=id%2Csnippet%2Cstatistics%2CbrandingSettings%2CcontentDetails%2Clocalizations%2Cstatus%2CtopicDetails&id=${yt.channelId}&_=${Date.now()}`, options2)
            .then(res => res.json());

        return channelInfo.items

    } catch (err) {
        console.error('Error fetching channel info:', err);
        return null;
    }
}

// Contoh penggunaan
(async () => {
    const result = await getYoutubeChannelInfoByUsername('skyzopedia-0xf');
    console.log(result);
})();
