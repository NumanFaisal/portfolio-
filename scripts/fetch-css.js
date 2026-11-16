const https = require("https");
const fs = require("fs");

const cssUrls = [
  '/_next/static/immutable/chunks/42aa-2hvfmah1.css',
  '/_next/static/immutable/chunks/2t96hhkjykao2.css',
  '/_next/static/immutable/chunks/3mz7p1yo3zc-9.css'
];

async function fetchCss() {
  let combined = "";
  for (const u of cssUrls) {
    const res = await new Promise((resolve) => {
      https.get("https://www.avivashishta.com" + u, (r) => {
        let b = "";
        r.on("data", c => b += c);
        r.on("end", () => resolve(b));
      });
    });
    combined += "\n/* " + u + " */\n" + res;
  }
  fs.writeFileSync("d:\\portfolio\\scratch_ref.css", combined);
  console.log("Combined CSS saved, size:", combined.length);
}

fetchCss();
