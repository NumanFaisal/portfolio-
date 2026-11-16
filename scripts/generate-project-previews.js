const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "..", "public", "images", "projects");
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const projects = [
  {
    id: "wiimo",
    title: "Wiimo",
    tagline: "AI Voice Ordering Agent",
    accent: "#EF3B2D",
    sub: "Live in Gulf Restaurants · Production POS Integration",
    mock: [
      "Customer: 'Two shawarmas with garlic sauce, one diet coke'",
      "Wiimo: 'Added 2x Shawarma (Extra Garlic), 1x Diet Coke. Anything else?'",
      "STATUS: POS WEBHOOK 200 OK · LATENCY 340ms"
    ]
  },
  {
    id: "lexai",
    title: "LexAI",
    tagline: "Legal Document Intelligence",
    accent: "#2F55FF",
    sub: "RAG Pipeline · Clause Extraction · Risk Flags",
    mock: [
      "CONTRACT_REVIEW_SUMMARY.PDF",
      "Flag 1: Indemnity Clause §4.2 (High Risk)",
      "Plain English: You are personally liable for third-party delays."
    ]
  },
  {
    id: "dumbdsa",
    title: "DumbDSA",
    tagline: "Interactive Algorithm Visualizer",
    accent: "#FFC81A",
    sub: "Step-by-step Execution Engine · D3 Data Structures",
    mock: [
      "Binary Search Tree: insert(42) → rebalancing AVL node",
      "Time Complexity: O(log n) · Space: O(1)",
      "Breakpoint at line 14: ptr = ptr.right"
    ]
  },
  {
    id: "shilpsetu",
    title: "ShilpSetu",
    tagline: "Artisan Marketplace Platform",
    accent: "#10B981",
    sub: "Hackathon Winner · WhatsApp Ordering · Cloudinary",
    mock: [
      "Artisan Storefront: Terracotta Pottery & Handmade Textiles",
      "Order Notification dispatched via WhatsApp Business API",
      "Zero-friction onboarding in Hindi & English"
    ]
  },
  {
    id: "fuelroute",
    title: "FuelRoute",
    tagline: "CNG & EV Route Planner",
    accent: "#8B5CF6",
    sub: "Live Station Availability · Waypoint Optimization",
    mock: [
      "Route: Delhi → Agra · 230 km",
      "Stop 1: EV Fast Charger (120kW, 2 bays free)",
      "Stop 2: CNG Station (Zero queue reported 10m ago)"
    ]
  }
];

for (const p of projects) {
  const svg = `<svg width="800" height="480" viewBox="0 0 800 480" xmlns="http://www.w3.org/2000/svg">
    <rect width="800" height="480" fill="#18181F"/>
    <!-- Grid overlay -->
    <defs>
      <pattern id="grid-${p.id}" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#262630" stroke-width="1"/>
      </pattern>
    </defs>
    <rect width="800" height="480" fill="url(#grid-${p.id})"/>
    
    <!-- Window header bar -->
    <rect x="24" y="24" width="752" height="432" rx="10" fill="#20202A" stroke="#333342" stroke-width="1.5"/>
    <rect x="24" y="24" width="752" height="44" rx="10" fill="#14141C"/>
    <circle cx="48" cy="46" r="6" fill="#EF4444"/>
    <circle cx="68" cy="46" r="6" fill="#F59E0B"/>
    <circle cx="88" cy="46" r="6" fill="#10B981"/>
    
    <!-- Title / Sub -->
    <text x="120" y="50" font-family="system-ui, sans-serif" font-size="13" font-weight="600" fill="#A1A1AA">${p.title.toUpperCase()} // PRODUCTION PREVIEW</text>
    
    <!-- Accent indicator -->
    <rect x="52" y="96" width="6" height="48" rx="3" fill="${p.accent}"/>
    <text x="70" y="118" font-family="system-ui, sans-serif" font-size="26" font-weight="800" fill="#FFFFFF">${p.title}</text>
    <text x="70" y="140" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#A1A1AA">${p.tagline} — ${p.sub}</text>
    
    <!-- Code / Preview terminal box -->
    <rect x="52" y="170" width="696" height="250" rx="8" fill="#0D0D12" stroke="#2B2B38" stroke-width="1"/>
    <text x="76" y="210" font-family="ui-monospace, monospace" font-size="14" font-weight="600" fill="${p.accent}">$ ${p.mock[0]}</text>
    <text x="76" y="250" font-family="ui-monospace, monospace" font-size="14" fill="#E4E4E7">&gt; ${p.mock[1]}</text>
    <text x="76" y="290" font-family="ui-monospace, monospace" font-size="13" fill="#10B981">✓ ${p.mock[2]}</text>
    <text x="76" y="340" font-family="ui-monospace, monospace" font-size="12" fill="#71717A">// Architecture validated with Zod &amp; deployed live</text>
  </svg>`;

  fs.writeFileSync(path.join(dir, `${p.id}.png`), svg);
  fs.writeFileSync(path.join(dir, `${p.id}.svg`), svg);
}

console.log("Generated clean real project preview visuals!");
