/* 

 Name: Convert Image To Ghibli Style
 Author: Skyzopedia
 Contact: https://t.me/Xskycode
 Time: 16-12-2025
 
*/


const fs = require('fs');

async function transformLocalImageToGhibli(filePath) {
  try {
    // Baca file gambar menjadi buffer
    const buffer = fs.readFileSync(filePath);
    const base64Image = buffer.toString('base64');

    const data = JSON.stringify({
      image: base64Image,
      prompt: "Transform this image into beautiful Studio Ghibli anime art style with soft colors, dreamy atmosphere, and hand-painted aesthetic",
      model: "gpt-image-1",
      n: 1,
      size: "1024x1024",
      quality: "low"
    });

    const options = {
      method: 'POST',
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Content-Type': 'application/json'
      },
      body: data
    };

    const response = await fetch('https://ghibli-proxy.netlify.app/.netlify/functions/ghibli-proxy', options);
    const result = await response.json();
    if (!result.success || !result.data || !result.data.length) {
      throw new Error("Response tidak valid");
    }
    
    // Ambil hasil Base64 dan simpan sebagai PNG
    const transformedBase64 = result.data[0].b64_json;
    fs.writeFileSync('ghibli_image.png', Buffer.from(transformedBase64, 'base64'));

    console.log("✅ Gambar berhasil disimpan: ghibli_image.png");

  } catch (err) {
    console.error("❌ Error:", err.message);
  }
}

// Contoh pemakaian
return transformLocalImageToGhibli("./input.png");
