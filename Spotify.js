/* 

 Name: Spotify Search & Downloader
 Author: Skyzopedia
 Contact: https://t.me/Xskycode
 Time: 18-12-2025
 
*/

const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const headers = {
  'User-Agent':
    'Mozilla/5.0 (Linux; Android 15; 23124RA7EO Build/AQ3A.240829.003) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.7444.174 Mobile Safari/537.36',
  Accept: 'application/json, text/plain, */*',
  'accept-language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
  Referer: 'https://spotdown.org/',
};

async function spotdownSearchAndDownload(query) {
  const searchRes = await fetch(
    `https://spotdown.org/api/song-details?url=${encodeURIComponent(query)}`,
    { headers }
  );
  const searchJson = await searchRes.json();
  if (!searchJson.songs || !searchJson.songs.length) {
    throw new Error('Lagu tidak ditemukan');
  }
  const firstSong = searchJson.songs[0];

  return {
    search: {
      title: firstSong.title,
      artist: firstSong.artist,
      duration: firstSong.duration,
      thumbnail: firstSong.thumbnail,
      spotify_url: firstSong.url,
    },
    download: `https://spotdown.org/api/check-direct-download?url=${encodeURIComponent(firstSong.url)}`,
  };
}

// contoh pemakaian query
spotdownSearchAndDownload('Hujan Turun')
  .then(result => console.log(JSON.stringify(result, null, 2)))
  .catch(err => console.error('Error:', err.message));
  
// contoh pemakaian url
spotdownSearchAndDownload('https://open.spotify.com/track/6mCfB1pIBtCScivv7YnEBE')
  .then(result => console.log(JSON.stringify(result, null, 2)))
  .catch(err => console.error('Error:', err.message))
