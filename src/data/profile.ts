export interface Profile {
  name: string;
  roleTitle: string;
  location: string;
  email: string;
  headline: string;
  summary: string;
  proofHighlight: {
    title: string;
    description: string;
  };
  socialLinks: {
    github: string;
    linkedin: string;
    leetcode: string;
    resume: string;
    emailMailto: string;
  };
  stats: {
    value: string;
    label: string;
    sublabel: string;
  }[];
  education: {
    degree: string;
    field: string;
    institution: string;
    location: string;
    period: string;
    highlight: string;
  };
  now: {
    title: string;
    status: string;
    items: string[];
  };
}

export const profile: Profile = {
  name: 'Numan Faisal',
  roleTitle: 'Full Stack & AI Engineer',
  location: 'Jamshedpur, India',
  email: 'numanfaisal980@gmail.com',
  headline: 'Full Stack & AI Engineer building production AI systems.',
  summary:
    'Software developer with strong DSA and problem-solving foundations. Shipped a production AI voice ordering agent for the Bahrain market (Wiimo) and an enterprise vendor management system for Tata Steel. Experienced in building robust full-stack applications with React.js, Node.js, and multi-agent LLM systems (GPT-4o, Claude API).',
  proofHighlight: {
    title: 'Verified Production Track Record',
    description:
      'Core engineer on Wiimo (AI voice ordering agent deployed live in Bahrain restaurants) & deployed enterprise compliance system for Tata Steel.',
  },
  socialLinks: {
    github: 'https://github.com/NumanFaisal',
    linkedin: 'https://www.linkedin.com/in/numanfaisal/',
    leetcode: 'TODO: https://leetcode.com/u/numanfaisal/',
    resume: '/Numan_resume.pdf',
    emailMailto: 'mailto:numanfaisal980@gmail.com',
  },
  stats: [
    {
      value: '2+',
      label: 'Production Systems',
      sublabel: 'Live in Gulf & Tata Steel',
    },
    {
      value: '10k+',
      label: 'Voice Orders Handled',
      sublabel: 'Real-time Whisper + Claude',
    },
    {
      value: 'TODO: 250+',
      label: 'LeetCode Solved',
      sublabel: 'DSA & Algorithms foundation',
    },
    {
      value: '1st',
      label: 'Hackathon Award',
      sublabel: 'ShilpSetu AI Marketplace',
    },
  ],
  education: {
    degree: 'B.Tech',
    field: 'Computer Science and Engineering',
    institution: 'R.V.S. College of Engineering and Technology',
    location: 'Jamshedpur, India',
    period: 'Aug 2023 – Aug 2027',
    highlight:
      'Rigorous core focus in Data Structures, Algorithms, Operating Systems, Computer Networks & Database Management Systems.',
  },
  now: {
    title: 'What I Am Doing Now',
    status: 'Actively Available for SDE, Full Stack & AI Engineer Roles',
    items: [
      'Engineering low-latency agentic streaming pipelines with Anthropic Claude API & OpenAI Whisper.',
      'Refining DSA skills across advanced graph algorithms and dynamic programming.',
      'Available for full-time high-impact software engineering roles worldwide.',
    ],
  },
};
