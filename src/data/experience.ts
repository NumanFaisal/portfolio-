export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  location: string;
  period: string;
  type: string;
  current: boolean;
  bullets: string[];
  tech: string[];
  impactBadge?: string;
}

export const experiences: ExperienceItem[] = [
  {
    id: 'creative-homme',
    company: 'Creative Homme',
    role: 'Trainee Software Engineer / Full Stack Developer',
    location: 'Remote / Gulf Market',
    period: 'Feb 2026 – Aug 2026',
    type: 'Full-time',
    current: true,
    impactBadge: 'Live Production AI in Gulf',
    bullets: [
      'Built and shipped a production AI voice ordering agent for the Bahrain market, serving live restaurant users with GPT-4o function calling across 6 custom tools.',
      'Engineered real-time SSE streaming, Whisper STT and OpenAI TTS with VAD barge-in so users can naturally interrupt the AI agent mid-response.',
      'Designed Redis-backed multi-turn conversation state and branch-lock logic to prevent cart conflicts across concurrent user sessions and restaurant switches.',
      'Led a mid-production migration from OpenAI to the Anthropic Claude API (streaming, dynamic tool injection, cart state synchronization) with zero user-facing downtime.',
    ],
    tech: ['React', 'Node.js', 'GPT-4o', 'Claude API', 'Whisper STT', 'OpenAI TTS', 'SSE', 'Redis', 'TypeScript'],
  },
  {
    id: 'orbinger-india',
    company: 'Orbinger India Pvt. Ltd.',
    role: 'Full Stack Developer',
    location: 'Jamshedpur / Remote',
    period: 'Aug 2025 – Jan 2026',
    type: 'Full-time',
    current: false,
    impactBadge: 'Deployed at Tata Steel',
    bullets: [
      'Built and deployed a comprehensive vendor management system for Tata Steel automating CAPA, SOP, and enterprise SSO workflows.',
      'Cut manual handoff steps with role-based routing and structured responsibility assignment across cross-functional plant audit teams.',
      'Integrated AI hazard detection from plant floor photos with automatic severity classification and faster critical safety escalation.',
      'Engineered key features for an Expo React Native weld seam inspection mobile app and contributed to an intelligent HRMS role-based AI chatbot.',
    ],
    tech: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Docker', 'Computer Vision API', 'React Native Expo', 'REST APIs'],
  },
  {
    id: 'seeup-tech',
    company: 'Seeup Tech',
    role: 'Web Developer Intern',
    location: 'Remote',
    period: 'Jun 2024 – Sep 2024',
    type: 'Internship',
    current: false,
    impactBadge: 'Cross-Platform Mobile & Web',
    bullets: [
      'Built React Native applications with Firebase Auth and real-time inventory tracking for iOS and Android platforms.',
      'Architected shared navigation and UI component logic across platforms to substantially reduce duplicate codebase maintenance.',
      'Developed high-throughput Node.js/Express REST endpoints and integrated third-party supplier logistics APIs.',
    ],
    tech: ['React Native', 'React', 'Node.js', 'Express', 'Firebase Auth', 'MongoDB', 'REST APIs'],
  },
];
