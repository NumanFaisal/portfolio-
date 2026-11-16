const fs = require("fs");

const svg = `<svg viewBox="0 0 1000 800" width="1000" height="800" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Parchment texture pattern -->
    <radialGradient id="vignette" cx="50%" cy="50%" r="65%">
      <stop offset="60%" stop-color="#EFE9DC" stop-opacity="1"/>
      <stop offset="100%" stop-color="#D7CEBA" stop-opacity="1"/>
    </radialGradient>
    <filter id="map-paper">
      <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0.9   0 0 0 0 0.88   0 0 0 0 0.82  0 0 0 0.15 0"/>
      <feBlend mode="multiply" in="SourceGraphic"/>
    </filter>
  </defs>

  <!-- Background antique parchment -->
  <rect width="1000" height="800" fill="url(#vignette)"/>
  
  <!-- Outer double vintage border -->
  <rect x="24" y="24" width="952" height="752" fill="none" stroke="#6B5E4B" stroke-width="4"/>
  <rect x="34" y="34" width="932" height="732" fill="none" stroke="#9A8970" stroke-width="1.5" stroke-dasharray="8 4"/>

  <!-- Subtle latitude & longitude grid -->
  <g stroke="#C7BCAB" stroke-width="1" stroke-dasharray="4 6" opacity="0.8">
    <line x1="40" y1="160" x2="960" y2="160"/>
    <line x1="40" y1="320" x2="960" y2="320"/>
    <line x1="40" y1="480" x2="960" y2="480"/>
    <line x1="40" y1="640" x2="960" y2="640"/>
    <line x1="200" y1="40" x2="200" y2="760"/>
    <line x1="380" y1="40" x2="380" y2="760"/>
    <line x1="560" y1="40" x2="560" y2="760"/>
    <line x1="740" y1="40" x2="740" y2="760"/>
  </g>

  <!-- Coordinate marks -->
  <text x="50" y="55" font-family="monospace" font-size="12" fill="#8C7E6A" font-weight="bold">LAT 22.8046° N  /  LON 86.2029° E</text>
  <text x="730" y="55" font-family="monospace" font-size="12" fill="#8C7E6A" font-weight="bold">SUB-CONTINENT MAP // ED. 2026</text>

  <!-- India Peninsula Outline (Detailed stylized polygonal boundary) -->
  <path d="
    M 380,110 
    Q 420,90 460,110 
    T 520,130 
    L 550,170 
    Q 620,190 680,210 
    T 740,240 
    L 710,270 
    L 660,280 
    Q 620,300 630,340 
    T 610,380 
    L 590,430 
    Q 560,490 530,560 
    T 490,660 
    L 470,720 
    Q 460,730 450,710 
    L 420,620 
    Q 380,530 350,460 
    T 330,390 
    L 310,360 
    Q 270,350 250,330 
    T 290,270 
    L 330,220 
    Q 350,160 380,110 Z
  " fill="#E2DAC8" stroke="#7A6D58" stroke-width="3" stroke-linejoin="round"/>

  <!-- Geographic water labels -->
  <text x="170" y="520" font-family="Georgia, serif" font-size="22" font-style="italic" fill="#A89B87" letter-spacing="4">ARABIAN SEA</text>
  <text x="680" y="540" font-family="Georgia, serif" font-size="22" font-style="italic" fill="#A89B87" letter-spacing="4">BAY OF BENGAL</text>
  <text x="390" y="760" font-family="Georgia, serif" font-size="18" font-style="italic" fill="#A89B87" letter-spacing="6">INDIAN OCEAN</text>

  <!-- Major region watermark -->
  <text x="460" y="370" font-family="Georgia, serif" font-size="44" font-weight="bold" fill="#C2B5A0" letter-spacing="12" text-anchor="middle" opacity="0.6">INDIA</text>

  <!-- Jamshedpur coordinates: roughly East India (lon 86.2° E, lat 22.8° N) -> (x: 585, y: 345) -->
  
  <!-- Target crosshairs radiating outward from Jamshedpur -->
  <g stroke="#EF3B2D" stroke-width="1.5" opacity="0.75" stroke-dasharray="5 3">
    <line x1="585" y1="40" x2="585" y2="760"/>
    <line x1="40" y1="345" x2="960" y2="345"/>
  </g>
  
  <!-- Concentric radar pulse rings around Jamshedpur -->
  <circle cx="585" cy="345" r="50" fill="none" stroke="#EF3B2D" stroke-width="1.5" opacity="0.4" stroke-dasharray="4 4"/>
  <circle cx="585" cy="345" r="26" fill="none" stroke="#EF3B2D" stroke-width="2" opacity="0.7"/>
  <circle cx="585" cy="345" r="8" fill="#EF3B2D" stroke="#FFFFFF" stroke-width="2.5"/>

  <!-- Callout Flag Card pointing directly to Jamshedpur -->
  <g transform="translate(615, 290)">
    <!-- Pointer stalk -->
    <path d="M -30,55 L 0,30 L 0,0 L 220,0 L 220,60 L 0,60 Z" fill="#111111" stroke="#EF3B2D" stroke-width="2"/>
    <text x="16" y="26" font-family="monospace" font-size="11" font-weight="bold" fill="#EF3B2D" letter-spacing="2">HOME BASE</text>
    <text x="16" y="48" font-family="system-ui, sans-serif" font-size="17" font-weight="900" fill="#FFFFFF" letter-spacing="0.5">JAMSHEDPUR</text>
    <!-- Jharkhand state tag -->
    <rect x="145" y="14" width="62" height="18" rx="2" fill="#EF3B2D"/>
    <text x="151" y="27" font-family="monospace" font-size="10" font-weight="bold" fill="#FFFFFF">JHARKHAND</text>
  </g>

  <!-- Route vectors from Jamshedpur to Global Markets (Gulf, Americas, Europe) -->
  <g stroke="#2F55FF" stroke-width="2" stroke-dasharray="6 4" opacity="0.8">
    <!-- To Gulf Region (West) -->
    <path d="M 585,345 Q 400,280 200,260" fill="none"/>
    <circle cx="200" cy="260" r="5" fill="#2F55FF"/>
    <text x="100" y="250" font-family="monospace" font-size="11" font-weight="bold" fill="#2F55FF">GULF MARKET (WIIMO)</text>
  </g>
</svg>`;

fs.writeFileSync("d:\\portfolio\\public\\vox\\map.svg", svg);
console.log("Custom detailed India map with Jamshedpur callout generated!");
