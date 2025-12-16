const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const cheerio = require("cheerio");
const { URLSearchParams } = require("url");


function generateTT(length = 32) {
  const chars = "abcdef0123456789";
  let out = "";
  for (let i = 0; i < length; i++) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
}


function extractVideo($) {
  let link = $("a.quality-best").attr("data-directurl");
  if (link) {
    return { quality: "HD", url: link };
  }

  $("a.download-btn").each((_, el) => {
    const text = $(el).text();
    const direct = $(el).attr("data-directurl") || $(el).attr("href");

    if (!link && text.includes("480")) {
      link = direct;
    }
  });
  if (link) {
    return { quality: "480p", url: link };
  }

  $("a.download-btn").each((_, el) => {
    const text = $(el).text();
    const direct = $(el).attr("data-directurl") || $(el).attr("href");

    if (!link && text.includes("320")) {
      link = direct;
    }
  });
  if (link) {
    return { quality: "320p", url: link };
  }

  $("a.download-btn").each((_, el) => {
    const direct = $(el).attr("data-directurl") || $(el).attr("href");
    if (!link && direct && direct.startsWith("http")) {
      link = direct;
    }
  });

  if (link) {
    return { quality: "unknown", url: link };
  }

  return null;
}

async function ssstwitterDL(tweetUrl) {
  const tt = generateTT();
  const ts = Math.floor(Date.now() / 1000);

  const data = new URLSearchParams({
    id: tweetUrl,
    locale: "id",
    tt,
    ts,
    source: "form"
  });

  const res = await fetch("https://ssstwitter.com/id", {
    method: "POST",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Linux; Android 15) AppleWebKit/537.36 Chrome/142.0 Mobile Safari/537.36",
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      origin: "https://ssstwitter.com",
      referer: "https://ssstwitter.com/id",
      "hx-request": "true",
      "hx-target": "target",
      "hx-current-url": "https://ssstwitter.com/id",
      "accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7"
    },
    body: data.toString()
  });

  const html = await res.text();
  const $ = cheerio.load(html);

  const video = extractVideo($);

  if (!video) {
    throw new Error("❌ Tidak ada link video yang tersedia");
  }

  return {
    status: true,
    quality: video.quality,
    url: video.url
  };
}

// Contoh Penggunaan
(async () => {
  try {
    const result = await ssstwitterDL(
      "https://x.com/Caputey/status/2000014692492902859?t=eQQSj3ohTrkRkJyDEt6CxA&s=19"
    );
    console.log(result);
  } catch (e) {
    console.error("ERROR:", e.message);
  }
})();
