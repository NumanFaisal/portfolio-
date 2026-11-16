const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "public", "vox");
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// 1. paper.svg / webp data
const paperSvg = `<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <filter id="noise">
    <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/>
  </filter>
  <rect width="100%" height="100%" fill="#F1EEE8"/>
  <rect width="100%" height="100%" filter="url(#noise)" opacity="0.08"/>
</svg>`;
fs.writeFileSync(path.join(dir, "paper.webp"), paperSvg);

// 2. highlighter mask (rough wide brush stroke)
const highlighterSvg = `<svg viewBox="0 0 400 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M2,32 C50,15 150,10 395,20 C398,35 380,48 350,52 C200,55 50,50 4,45 Z" fill="#000"/>
</svg>`;
fs.writeFileSync(path.join(dir, "highlighter.webp"), highlighterSvg);

// 3. circle mask (rough hand-drawn circle)
const circleSvg = `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <circle cx="100" cy="100" r="78" fill="none" stroke="#000" stroke-width="18" stroke-linecap="round" stroke-dasharray="480 30"/>
</svg>`;
fs.writeFileSync(path.join(dir, "circle.webp"), circleSvg);

// 4. arrow mask
const arrowSvg = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <path d="M10,50 Q45,25 80,45 M65,30 L85,47 L65,65" fill="none" stroke="#000" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
fs.writeFileSync(path.join(dir, "arrow.webp"), arrowSvg);

// 5. torn mask (torn paper edge at bottom)
const tornSvg = `<svg viewBox="0 0 1000 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M0,0 L1000,0 L1000,20 Q950,45 900,25 T800,35 T700,15 T600,40 T500,20 T400,35 T300,18 T200,38 T100,22 L0,35 Z" fill="#000"/>
</svg>`;
fs.writeFileSync(path.join(dir, "torn.webp"), tornSvg);

// 6. tape-1, tape-2, tape-3
for (let i = 1; i <= 3; i++) {
  const rot = (i - 2) * 3;
  const tapeSvg = `<svg viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="116" height="36" rx="2" fill="#E5DFC8" fill-opacity="0.75" stroke="#C5BEA5" stroke-width="1" transform="rotate(${rot} 60 20)"/>
  </svg>`;
  fs.writeFileSync(path.join(dir, `tape-${i}.webp`), tapeSvg);
}

// 7. pin.webp
const pinSvg = `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
  <circle cx="30" cy="24" r="14" fill="#D93829" stroke="#A52317" stroke-width="2"/>
  <circle cx="26" cy="20" r="4" fill="#FFF" opacity="0.6"/>
  <polygon points="30,38 30,56 32,38" fill="#888"/>
</svg>`;
fs.writeFileSync(path.join(dir, "pin.webp"), pinSvg);

// 8. map.webp
const mapSvg = `<svg viewBox="0 0 500 400" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#EBE5D8" stroke="#D3CABE" stroke-width="8"/>
  <g stroke="#D3CABE" stroke-width="1" stroke-dasharray="4 4">
    <line x1="0" y1="100" x2="500" y2="100"/>
    <line x1="0" y1="200" x2="500" y2="200"/>
    <line x1="0" y1="300" x2="500" y2="300"/>
    <line x1="125" y1="0" x2="125" y2="400"/>
    <line x1="250" y1="0" x2="250" y2="400"/>
    <line x1="375" y1="0" x2="375" y2="400"/>
  </g>
  <path d="M160,80 Q220,50 280,80 T340,160 T290,260 T250,340 T220,290 T180,220 T150,150 Z" fill="#DDD5C3" stroke="#B8AC96" stroke-width="3"/>
  <text x="250" y="210" font-family="Space Grotesk, sans-serif" font-size="24" font-weight="bold" fill="#8C8069" letter-spacing="6" text-anchor="middle">INDIA</text>
  <circle cx="290" cy="200" r="6" fill="#D93829" stroke="#FFF" stroke-width="2"/>
  <text x="305" y="205" font-family="sans-serif" font-size="14" font-weight="bold" fill="#111">Jamshedpur</text>
</svg>`;
fs.writeFileSync(path.join(dir, "map.webp"), mapSvg);

// 9. cutout.webp
const cutoutSvg = `<svg viewBox="0 0 300 360" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="halftone" width="8" height="8" patternUnits="userSpaceOnUse">
      <circle cx="4" cy="4" r="2.5" fill="#111"/>
    </pattern>
  </defs>
  <path d="M60,350 C50,280 90,220 100,190 C80,180 70,140 75,100 C80,40 140,20 180,30 C220,40 235,90 230,130 C225,160 215,185 200,195 C210,225 245,280 240,350 Z" fill="#E5DFC8" stroke="#111" stroke-width="4" stroke-linejoin="round"/>
  <path d="M60,350 C50,280 90,220 100,190 C80,180 70,140 75,100 C80,40 140,20 180,30 C220,40 235,90 230,130 C225,160 215,185 200,195 C210,225 245,280 240,350 Z" fill="url(#halftone)" opacity="0.55"/>
  <text x="150" y="150" font-family="Space Grotesk, sans-serif" font-size="42" font-weight="900" fill="#111" text-anchor="middle">NF</text>
</svg>`;
fs.writeFileSync(path.join(dir, "cutout.webp"), cutoutSvg);

console.log("All public/vox assets generated successfully!");
