export interface Project {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  organization?: string;
  period: string;
  featured: boolean;
  role: string;
  problem: string;
  bullets: string[];
  outcome: string;
  tech: string[];
  tags: ('AI' | 'Full Stack' | 'Mobile')[];
  roleMatch: {
    sde: number;       // priority rank 1-4
    fullstack: number; // priority rank 1-4
    ai: number;        // priority rank 1-4
  };
  links: {
    live?: string | null;
    github?: string | null;
    architectureNotes?: string | null;
    demoVideo?: string | null;
  };
  architectureDiagram?: 'wiimo' | 'lexai';
}

export const projects: Project[] = [
  {
    id: 'wiimo',
    slug: 'wiimo',
    title: 'Wiimo',
    tagline: 'Production AI Voice Ordering Agent live in Gulf restaurants.',
    organization: 'Creative Homme',
    period: 'Feb 2026 – Aug 2026',
    featured: true,
    role: 'Core Full Stack & AI Engineer',
    problem:
      'Restaurant chains in Bahrain and the Gulf faced severe order bottlenecking during peak rush hours, multilingual customer accents, and noisy kitchen environments that broken standard voice bots could not handle.',
    bullets: [
      'Built and shipped a production AI voice ordering agent for the Bahrain market, serving live users with GPT-4o function calling across 6 custom POS tools.',
      'Engineered real-time SSE streaming, Whisper STT and OpenAI TTS with VAD (Voice Activity Detection) barge-in so users can naturally interrupt the agent mid-response.',
      'Designed Redis-backed multi-turn conversation state and branch-lock logic to prevent cart conflicts across concurrent sessions and restaurant switches.',
      'Led a zero-downtime mid-production migration from OpenAI to Anthropic Claude API (streaming, dynamic tool injection, cart state synchronization).',
    ],
    outcome:
      'Deployed live across restaurant chains in Bahrain/Gulf market, handling end-to-end voice orders with sub-second response times.',
    tech: ['GPT-4o', 'Claude API', 'Whisper STT', 'OpenAI TTS', 'SSE', 'Redis', 'React', 'Node.js', 'WebSockets', 'Zod'],
    tags: ['AI', 'Full Stack'],
    roleMatch: {
      ai: 1,
      fullstack: 1,
      sde: 2,
    },
    links: {
      live: null, // Company production deployment in Bahrain
      github: null, // Internal company IP
      architectureNotes: 'TODO: Add public architecture teardown blog post',
      demoVideo: 'TODO: Link to Wiimo Voice Demo Video',
    },
    architectureDiagram: 'wiimo',
  },
  {
    id: 'lexai',
    slug: 'lexai',
    title: 'LexAI',
    tagline: 'AI Legal Research & Contract Analysis with Anti-Hallucination Checks.',
    period: 'Mar 2026',
    featured: true,
    role: 'Full Stack & AI Architect',
    problem:
      'Legal researchers in India spend dozens of hours reviewing contracts and cross-referencing citations across massive unindexed statutory court databases, with commercial LLMs frequently hallucinating legal precedents.',
    bullets: [
      'Engineered 4 specialized AI agent pipelines (research, drafting, compliance, case analysis) on Anthropic Claude with deterministic hallucination verification against Indian Kanoon API.',
      'Architected 20+ REST APIs across 11 modular microservices, incorporating automated WhatsApp notification workflows, voice transcription, and PDF/DOCX generation.',
      'Implemented robust JWT authentication, Redis-backed rate limiting, tiered subscriptions via Razorpay, and BullMQ async background job queues.',
    ],
    outcome:
      'Reduced average legal document analysis time from 4+ hours to under 3 minutes for early legal practitioners.',
    tech: [
      'Next.js 16',
      'React 19',
      'TypeScript',
      'Express.js',
      'PostgreSQL',
      'Prisma',
      'Redis',
      'BullMQ',
      'Tiptap',
      'Redux Toolkit',
      'Razorpay',
    ],
    tags: ['AI', 'Full Stack'],
    roleMatch: {
      ai: 2,
      fullstack: 2,
      sde: 1,
    },
    links: {
      live: 'TODO: https://lexai.dev',
      github: 'TODO: https://github.com/NumanFaisal/lexai',
      architectureNotes: 'TODO: LexAI Agent Pipeline Teardown',
    },
    architectureDiagram: 'lexai',
  },
  {
    id: 'shilpsetu',
    slug: 'shilpsetu',
    title: 'ShilpSetu',
    tagline: 'AI Artisan Marketplace bridging traditional craftspeople to digital commerce.',
    period: 'Sep 2026',
    featured: true,
    role: 'Lead Mobile & AI Engineer',
    problem:
      'Traditional Indian artisans produce master-grade handmade goods but cannot sell on standard e-commerce platforms due to tech literacy barriers and lack of studio-grade product photography equipment.',
    bullets: [
      'Developed an automated 10-stage AI image pipeline (background removal via Poof.bg ~100ms, studio reconstruction, shadow synthesis, lighting) powered by BullMQ concurrent workers.',
      'Built 12+ secure REST APIs with JWT and OTP authentication, RBAC, and Cloudflare R2 object storage integration.',
      'Integrated Gemini Vision + GPT-4o for visual craft analysis, automated bilingual catalog generation, and real-time fair market pricing via Tavily.',
      'Built an offline-first Expo/React Native mobile app with multilingual voice-to-catalog AI and direct real-time artisan-buyer messaging.',
    ],
    outcome:
      'Won 1st Place at Regional Hackathon; enabled 100+ rural artisans to onboard and publish studio-grade catalogs in under 3 minutes.',
    tech: [
      'Node.js',
      'TypeScript',
      'PostgreSQL',
      'Prisma',
      'Redis',
      'BullMQ',
      'Cloudflare R2',
      'Expo',
      'React Native',
      'Zustand',
      'Gemini Vision',
      'GPT-4o',
      'Tavily',
    ],
    tags: ['AI', 'Mobile', 'Full Stack'],
    roleMatch: {
      fullstack: 3,
      ai: 3,
      sde: 3,
    },
    links: {
      live: 'TODO: https://shilpsetu.dev',
      github: 'https://github.com/NumanFaisal/shilpsetu',
    },
  },
  {
    id: 'tata-steel-vms',
    slug: 'tata-steel-vms',
    title: 'Tata Steel Vendor Management System',
    tagline: 'Enterprise compliance, safety hazard detection & automated workflow platform.',
    organization: 'Orbinger India Pvt. Ltd.',
    period: 'Aug 2025 – Jan 2026',
    featured: true,
    role: 'Full Stack Developer',
    problem:
      'Large industrial manufacturing facilities at Tata Steel struggled with manual vendor audit handoffs, slow safety hazard reporting, and uncoordinated CAPA/SOP compliance tracking across disparate systems.',
    bullets: [
      'Built and deployed an enterprise vendor management system for Tata Steel automating CAPA (Corrective and Preventive Action), SOP, and enterprise SSO workflows.',
      'Eliminated manual paper handoff steps with intelligent role-based routing and structured responsibility tracking.',
      'Integrated AI hazard detection from plant floor photos with automated severity classification, cutting escalation turnaround time.',
    ],
    outcome:
      'Deployed on-premises in live industrial operations at Tata Steel, drastically reducing compliance review turnaround times.',
    tech: ['React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Computer Vision API', 'Docker'],
    tags: ['Full Stack'],
    roleMatch: {
      sde: 4,
      fullstack: 4,
      ai: 4,
    },
    links: {
      live: null, // Deployed on internal Tata Steel intranet
      github: null, // Enterprise NDA
    },
  },
];
