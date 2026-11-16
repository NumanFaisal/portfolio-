const fs = require("fs");

const html = fs.readFileSync("d:\\portfolio\\scratch_ref.html", "utf8");

// Extract CSS links
const cssRegex = /href="([^"]+\.css[^"]*)"/g;
let m;
const cssUrls = [];
while ((m = cssRegex.exec(html)) !== null) {
  cssUrls.push(m[1]);
}
console.log("CSS URLs found:", cssUrls);

// Search for image/asset references
const assetRegex = /["']([^"']+\.(?:webp|png|svg|jpg|jpeg|gif|woff2?))["']/gi;
const assets = new Set();
while ((m = assetRegex.exec(html)) !== null) {
  assets.add(m[1]);
}
console.log("Assets found in HTML:", Array.from(assets).filter(a => !a.includes("favicon") && !a.includes("chunk")));
