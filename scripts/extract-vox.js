const fs = require("fs");

const css = fs.readFileSync("d:\\portfolio\\scratch_ref.css", "utf8");

// Search for vox-module rules
const matches = css.match(/\.vox-module__bKOTVq__[a-zA-Z0-9_]+{[^}]+}/g) || [];
console.log(`Found ${matches.length} vox rules`);
fs.writeFileSync("d:\\portfolio\\scratch_vox_rules.txt", matches.join("\n"));
console.log("Sample rules:");
matches.slice(0, 15).forEach(m => console.log(m.substring(0, 120)));
