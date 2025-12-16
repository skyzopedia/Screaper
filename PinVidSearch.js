/* 

 Name: Pinterest Video Search
 Author: Skyzopedia
 Contact: https://t.me/Xskycode
 Time: 17-12-2025
 
*/

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const cheerio = require("cheerio");

async function pinterestSearchVideo(query) {
  if (!query) throw new Error("Query wajib diisi");

  const url = `https://id.pinterest.com/search/videos/?q=${encodeURIComponent(
    query
  )}&rs=content_type_filter`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Linux; Android 15) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0 Mobile Safari/537.36",
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
      "Accept-Language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7"
    }
  });

  const html = await res.text();
  if (!html || html.length < 1000) {
    throw new Error("HTML kosong / terblokir");
  }

  const $ = cheerio.load(html);

  const pins = new Set();
  $("[data-test-pin-id]").each((_, el) => {
    const id = $(el).attr("data-test-pin-id");
    if (id && /^\d+$/.test(id)) {
      pins.add(`https://id.pinterest.com/pin/${id}/`);
    }
  });

  if (pins.size === 0) {
    throw new Error("Pin ID tidak ditemukan");
  }

  return [...pins];
}

/* =========================
   CONTOH PAKAI
========================= */
(async () => {
  try {
    const result = await pinterestSearchVideo("Naruto");
    console.log(result);
  } catch (e) {
    console.error("ERROR:", e.message);
  }
})();
