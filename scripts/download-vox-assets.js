const https = require("https");
const fs = require("fs");
const path = require("path");

function download(urlPath, dest) {
  return new Promise((resolve) => {
    const fullUrl = "https://www.avivashishta.com" + urlPath;
    https.get(fullUrl, (res) => {
      if (res.statusCode !== 200) {
        console.log(`Failed ${urlPath}: status ${res.statusCode}`);
        return resolve(false);
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on("finish", () => {
        file.close();
        console.log(`Downloaded ${path.basename(dest)} (${fs.statSync(dest).size} bytes)`);
        resolve(true);
      });
    }).on("error", (err) => {
      console.error(`Error downloading ${urlPath}:`, err.message);
      resolve(false);
    });
  });
}

async function run() {
  const assets = [
    "/vox/tape-1.webp",
    "/vox/tape-2.webp",
    "/vox/tape-3.webp",
    "/vox/pin.webp",
    "/vox/map.webp",
    "/vox/paper.webp",
    "/vox/highlighter.webp",
    "/vox/circle.webp",
    "/vox/arrow.webp",
    "/vox/torn.webp",
  ];

  const destDir = "d:\\portfolio\\public\\vox";
  for (const a of assets) {
    const targetFile = path.join(destDir, path.basename(a));
    await download(a, targetFile);
  }
  console.log("Assets sync finished!");
}

run();
