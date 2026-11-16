const https = require("https");
const fs = require("fs");

function fetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      // follow redirect if needed
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(fetch(res.headers.location));
      }
      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => resolve({ status: res.statusCode, headers: res.headers, body }));
    }).on("error", reject);
  });
}

async function run() {
  try {
    const res = await fetch("https://www.avivashishta.com/lab/explained");
    console.log("Status:", res.status);
    fs.writeFileSync("d:\\portfolio\\scratch_ref.html", res.body);
    console.log("Saved scratch_ref.html, length:", res.body.length);
  } catch (err) {
    console.error("Fetch error:", err.message);
  }
}

run();
