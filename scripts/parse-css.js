const fs = require("fs");

const css = fs.readFileSync("d:\\portfolio\\scratch_ref.css", "utf8");

// Search for key classes and properties: highlight, circle, tape, pin, torn, camera, paper, font
const queries = ["highlighter", "circle", "tape", "pin", "torn", "stage", "cam", "--p", "--t", "paper", "font-family"];

for (const q of queries) {
  let idx = 0;
  console.log(`=== Query: ${q} ===`);
  let count = 0;
  while ((idx = css.indexOf(q, idx)) !== -1 && count < 3) {
    const start = Math.max(0, idx - 50);
    const end = Math.min(css.length, idx + 150);
    console.log(css.substring(start, end).replace(/\n/g, " "));
    idx += q.length;
    count++;
  }
}
