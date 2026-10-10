export const profile = {
  name: 'Siddhartha Panchakarla',
  callsign: 'AI_ENGINEER',
  role: 'Generative AI & Python Engineer',
  location: 'Vijayawada, India',
  email: 'siddharthapanchakarla@gmail.com',
  phone: '+91 8341672978',
  linkedin: 'https://www.linkedin.com/in/panchakarla-siddhartha-278008377/',
  github: 'https://github.com/Siddhartha2809',
  resume: '',
  summary:
    'Computer Science (B.Tech, 2026) graduate who builds LLM-powered applications end to end, from requirements to deployment. Integrated Anthropic Claude APIs into a production-style B2B workflow-automation portal, with hands-on exposure to prompt engineering and RAG fundamentals. Strong in Python, REST API design, SQL/NoSQL databases, event-driven architecture and role-based security. Customer-centric communicator who turns business needs into working, secure technical solutions. Actively building skills in Google Cloud, Gemini and the Agent Development Kit (ADK).',
};

export const education = [
  {
    id: 'btech',
    degree: 'B.Tech, Computer Science Engineering',
    institution: 'CGPA 8.13 / 10.0',
    year: '2022 - 2026',
    details: '',
  },
  {
    id: 'intermediate',
    degree: 'Intermediate (MPC)',
    institution: '89.2%',
    year: '2020 - 2022',
    details: '',
  },
];

export const certifications = [
  { id: 'fullstack', title: 'Full Stack Developer Certification', date: '2026' },
  { id: 'python-kaggle', title: 'Python, Kaggle', date: '2023' },
  { id: 'html-css', title: 'HTML & CSS3, Infosys Springboard', date: '2024' },
  { id: 'digital-marketing', title: 'Digital Marketing Fundamentals', date: '2025' },
];

export const hackathons = [
  'Code Spark 2025, GenAIversity Hackathon, Hyderabad (generative AI focused)',
  'Piston Cup 2025, Vignan College, Visakhapatnam',
  'Python Workshop, Bapatla Women\'s College',
];

export const projects = [
  {
    id: 'multi-agent-adk',
    title: 'Multi-Agent Business Assistant',
    category: 'AI & Agents',
    tech: ['Python', 'Google ADK', 'Gemini API', 'Vertex AI', 'PostgreSQL', 'Cloud Run'],
    year: '2026',
    overview:
      'Built a multi-agent system with Google ADK in which a coordinator agent delegates tasks to specialist agents for data lookup, scheduling, and email drafting.',
    highlights: [
      'Connected agents to PostgreSQL and Google Calendar/Gmail through tool calling, with OAuth and least-privilege IAM so each agent accesses only the data it needs.',
      'Added logging of agent steps and tool calls to debug and troubleshoot agent behavior, reducing failure types.',
      'Deployed on Cloud Run with secrets in Secret Manager.'
    ],
    architecture:
      'Multi-agent orchestration with Google ADK, tool calling to external APIs, deployed on GCP Cloud Run.',
    challenges:
      'Managing least-privilege IAM and OAuth for individual agents, and debugging complex agent-to-agent interactions.',
    links: [],
  },
  {
    id: 'secure-rag',
    title: 'Secure RAG Document Assistant',
    category: 'Google Cloud & AI',
    tech: ['Python', 'Gemini', 'Vertex AI Embeddings', 'pgvector', 'FastAPI'],
    year: '2026',
    overview:
      'Implemented a Retrieval-Augmented Generation pipeline over documents: chunking, embedding, vector retrieval, and grounded Gemini answers with source citations.',
    highlights: [
      'Enforced per-user, role-based document access at retrieval time so users only receive answers from content they are permitted to see.',
      'Evaluated answer quality on test questions and improved retrieval accuracy by tuning chunk size and top-k.'
    ],
    architecture:
      'FastAPI backend, pgvector for semantic search, Vertex AI for embeddings, and Gemini for grounded generation with RBAC filtering at query time.',
    challenges:
      'Implementing real-time role-based access control (RBAC) during the vector retrieval phase to ensure data privacy.',
    links: [],
  },
  {
    id: 'multimodal-gemini',
    title: 'Multimodal Document & Voice Assistant',
    category: 'Generative AI',
    tech: ['Python', 'Gemini Multimodal API', 'Speech-to-Text', 'React'],
    year: '2026',
    overview:
      'Built an app that accepts images, PDFs and voice input and uses Gemini to extract structured data such as invoice fields and answer questions about them.',
    highlights: [
      'Returned validated JSON output for downstream systems.',
      'Wrote a short architecture README and demo video explaining design trade-offs for a technical audience.'
    ],
    architecture:
      'React frontend capturing voice/image/PDF, Python backend routing to Gemini Multimodal and Speech-to-Text APIs, outputting structured JSON.',
    challenges:
      'Handling diverse unstructured input types and ensuring strict, validated JSON schema output from the LLM.',
    links: [],
  },
  {
    id: 'fabrication-os',
    title: 'AI-Powered Fabrication Management B2B Portal',
    category: 'Full-Stack B2B Platform',
    tech: ['React', 'Supabase', 'Node.js', 'Tailwind CSS', 'Anthropic Claude'],
    year: '2024',
    overview:
      'Designed and delivered a full-stack B2B platform end to end, integrating LLM APIs to automate order and workflow tasks.',
    highlights: [
      'Integrated Anthropic Claude LLM APIs with prompt engineering for reliable workflow automation.',
      'Implemented RBAC through Supabase Auth to securely separate customer and admin access.',
      'Built a real-time negotiation system on WebSocket pub/sub, replacing polling with low-latency data flow.',
      'Created admin dashboards for operational visibility over PostgreSQL data models.'
    ],
    architecture:
      'React frontend, Node.js orchestration, Supabase Auth/PostgreSQL/Realtime, Claude API integration.',
    challenges:
      'Strict RBAC, real-time order state synchronization over WebSockets, and reliable LLM outputs.',
    links: [],
  },
  {
    id: 'offline-sync-engine',
    title: 'Offline-First Smart Attendance System',
    category: 'Distributed Systems',
    tech: ['React Native', 'Express.js', 'SQLite', 'Node.js'],
    year: '2024',
    overview:
      'Designed a custom conflict-resolution sync engine to keep data consistent across concurrent offline and online clients.',
    highlights: [
      'Optimized bulk entry and preprocessing to achieve sub-second query latency.',
      'Built REST endpoints and SQL analytics dashboards with RBAC for faculty and admin roles.',
      'Delivered and tested cross-platform Android and iOS builds.'
    ],
    architecture:
      'Local-first SQLite, deterministic sync queues, Express API reconciliation, and React Native mobile delivery.',
    challenges:
      'Conflict handling during intermittent network states and maintaining sub-second query performance.',
    links: [],
  }
];

export const skills = [
  {
    id: 'generative-ai',
    label: 'Generative AI & Agents',
    group: 'intelligence',
    detail: 'LLM APIs (Anthropic Claude), Prompt Engineering, LLM-based workflow automation, RAG fundamentals, agent-style workflow design',
    links: [],
  },
  {
    id: 'python',
    label: 'Python (OOP)',
    group: 'runtime',
    detail: 'Primary language for AI pipelines, backend services, and orchestration.',
    links: [],
  },
  {
    id: 'cloud-devops',
    label: 'Cloud & DevOps',
    group: 'systems',
    detail: 'Git, GitHub, CI/CD, Agile/SDLC, Google Cloud (Vertex AI, Cloud Run, IAM)',
    links: [],
  },
  {
    id: 'databases',
    label: 'Databases & Schema',
    group: 'data',
    detail: 'PostgreSQL (Supabase), MySQL, MongoDB, SQLite, schema modeling, query design',
    links: [],
  },
  {
    id: 'apis',
    label: 'APIs & Backend',
    group: 'systems',
    detail: 'REST API design, Node.js, Express.js, WebSockets, event-driven architecture',
    links: [],
  },
  {
    id: 'security',
    label: 'Security & Governance',
    group: 'systems',
    detail: 'RBAC, Supabase Auth, server-side validation, secure coding practices',
    links: [],
  },
  {
    id: 'data-ml',
    label: 'Data & ML',
    group: 'data',
    detail: 'Scikit-learn, Pandas, NumPy, EDA, data cleaning and preprocessing',
    links: [],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    group: 'interface',
    detail: 'React, React Native, Tailwind CSS, HTML5, CSS3',
    links: [],
  }
];
