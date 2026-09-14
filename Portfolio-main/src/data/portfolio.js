export const profile = {
  name: 'Panchakarla Siddhartha',
  callsign: 'SIDDHARTHA_OS',
  role: 'AI/ML Full Stack Engineer',
  location: 'India',
  email: 'siddharthapanchakarla@gmail.com',
  phone: '+91 8341672978',
  linkedin: 'https://www.linkedin.com/in/panchakarla-siddhartha-278008377/',
  github: 'https://github.com/Siddhartha2809',
  resume: '',
  summary:
    'AI/ML Full Stack Engineer specializing in high-performance event-driven systems, Generative AI workflows, secure portals, and resilient distributed application architecture.',
};

export const education = [
  {
    id: 'btech',
    degree: 'Bachelor of Technology in Computer Science',
    institution: 'DVR & Dr. HS MIC College of Technology',
    year: '2022 – 2026',
    details:
      'Focus on distributed systems, AI/ML architectures, and software engineering principles.',
  },
];

export const certifications = [
  { id: 'fullstack', title: 'Full Stack Developer Certification', date: 'Mar 2026' },
  { id: 'python-kaggle', title: 'Python — Kaggle', date: 'Sep 2023' },
  { id: 'digital-marketing', title: 'Digital Marketing Fundamentals', date: 'Aug 2025' },
];

export const hackathons = [
  'Code Spark 2025',
  'GenAiversity Hackathon 2025 — Hyderabad (Generative AI)',
  'Piston Cup 2025 — Vignan College, Visakhapatnam',
  'Python Workshop — Bapatla Women\'s College',
];

export const projects = [
  {
    id: 'fabrication-os',
    title: 'AI-Powered Fabrication Management Portal',
    category: 'B2B Platform',
    tech: ['React', 'Supabase', 'Node.js', 'Tailwind CSS', 'Anthropic Claude'],
    year: '2024',
    overview:
      'A production-grade full-stack B2B platform with real-time event-driven order management — directly applicable to high-throughput AI/ML service backends.',
    highlights: [
      'Integrated LLM APIs (Anthropic Claude) for intelligent workflow automation, demonstrating practical agentic AI development skills.',
      'Engineered a live two-way negotiation system using Supabase Realtime (WebSocket pub/sub), eliminating polling and enabling low-latency data flows.',
      'Implemented RBAC via Supabase Auth, applying security-boundary patterns critical to multi-tenant AI inference platforms.',
      'Built interactive admin dashboards for operational lifecycle visualisation — transferable to ML pipeline monitoring and model observability UIs.',
    ],
    architecture:
      'React command surface, Node orchestration layer, Supabase persistence, role-scoped realtime channels, and event-driven negotiation states.',
    challenges:
      'Strict RBAC, live order state synchronization, tenant isolation, and keeping negotiation events consistent across active sessions.',
    links: [
      {
        label: 'Request walkthrough',
        href: 'mailto:siddharthapanchakarla@gmail.com?subject=Fabrication%20OS%20walkthrough',
      },
    ],
  },
  {
    id: 'offline-sync-engine',
    title: 'Offline-First Smart Attendance System',
    category: 'Distributed Systems',
    tech: ['React', 'React Native', 'Express.js', 'SQLite', 'Node.js'],
    year: '2024',
    overview:
      'A cross-platform mobile system with a custom conflict-resolution sync engine that protects data integrity during intermittent network states.',
    highlights: [
      'Designed a custom conflict-resolution sync engine for offline-first mobile app, demonstrating distributed data consistency skills relevant to ML data pipelines.',
      'Applied data preprocessing and bulk-entry optimisation to achieve sub-second latency — same throughput mindset required in AI inference services.',
      'Built analytics dashboards with RBAC for faculty/admin, mirroring metrics-driven access patterns of ML platform tooling.',
      'Delivered cross-platform Android & iOS production builds, showcasing full deployment lifecycle ownership.',
    ],
    architecture:
      'Local-first SQLite writes, deterministic sync queues, Express API reconciliation, batched transport, and Capacitor native shell delivery.',
    challenges:
      'Conflict handling, bulk-entry performance, offline UX continuity, and keeping critical database operations under sub-second latency.',
    links: [
      {
        label: 'Discuss system',
        href: 'mailto:siddharthapanchakarla@gmail.com?subject=Offline%20Sync%20Engine',
      },
    ],
  },
  {
    id: 'secure-auth-portal',
    title: 'Secure Multi-Role Assessment Portal',
    category: 'Security & Access',
    tech: ['PHP', 'JavaScript', 'MySQL', 'HTML5', 'CSS3'],
    year: '2023',
    overview:
      'A multi-role web assessment platform with strict session authentication, dynamic exam creation, and live state management for concurrent users.',
    highlights: [
      'Architected session-based authentication with server-side validation — deepening understanding of API security relevant to AI service endpoints.',
      'Built a proctored exam environment requiring real-time state management and reliability under concurrent user load — analogous to concurrent ML inference requests.',
      'Handled structured data processing, dynamic query generation, and automated report exports, reinforcing data pipeline fundamentals.',
    ],
    architecture:
      'PHP server-rendered control surfaces, MySQL relational model, hardened session flows, role-specific access layers, and dynamic assessment state.',
    challenges:
      'Preventing privilege leakage, keeping proctored assessment state stable, and making authoring tools reliable for active administrators.',
    links: [
      {
        label: 'Review access model',
        href: 'mailto:siddharthapanchakarla@gmail.com?subject=Secure%20Auth%20Portal',
      },
    ],
  },
  {
    id: 'course-registration',
    title: 'Course Registration & Admin System',
    category: 'Workflow Automation',
    tech: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
    year: '2023',
    overview:
      'A course registration and administration system with automated document generation, event-triggered workflows, and end-to-end lifecycle management.',
    highlights: [
      'Implemented server-side validation and auto-generated PDF/CSV exports, demonstrating data pipeline output and workflow automation.',
      'Built event-triggered confirmation letter workflows, improving end-user transparency through automated communication.',
    ],
    architecture:
      'PHP backend with MySQL storage, server-side form validation, automated PDF/CSV generation pipelines, and event-triggered email workflows.',
    challenges:
      'Reliable document generation at scale, concurrent registration handling, and maintaining data integrity across multi-step enrollment flows.',
    links: [
      {
        label: 'View project',
        href: 'mailto:siddharthapanchakarla@gmail.com?subject=Course%20Registration%20System',
      },
    ],
  },
];

export const skills = [
  {
    id: 'generative-ai',
    label: 'Generative AI',
    group: 'intelligence',
    detail: 'LLM-backed workflows, AI interfaces, and application-layer orchestration.',
    links: ['agentic-workflows', 'python', 'system-design'],
  },
  {
    id: 'agentic-workflows',
    label: 'Agentic Workflows',
    group: 'intelligence',
    detail: 'Task decomposition, tool-mediated flows, and reliable automation loops.',
    links: ['generative-ai', 'event-driven-architecture', 'nodejs'],
  },
  {
    id: 'nodejs',
    label: 'Node.js',
    group: 'runtime',
    detail: 'API orchestration, realtime services, integrations, and backend glue.',
    links: ['event-driven-architecture', 'react', 'supabase'],
  },
  {
    id: 'react',
    label: 'React',
    group: 'interface',
    detail: 'Interactive product surfaces, stateful UI, and cinematic frontend systems.',
    links: ['nodejs', 'supabase', 'system-design'],
  },
  {
    id: 'event-driven-architecture',
    label: 'Event-Driven Architecture',
    group: 'systems',
    detail: 'Realtime data flow, decoupled services, and resilient state propagation.',
    links: ['nodejs', 'supabase', 'agentic-workflows'],
  },
  {
    id: 'supabase',
    label: 'Supabase',
    group: 'data',
    detail: 'Realtime database workflows, auth-aware persistence, and product backends.',
    links: ['react', 'nodejs', 'system-design'],
  },
  {
    id: 'system-design',
    label: 'System Design',
    group: 'systems',
    detail: 'Architecture decisions for performance, reliability, and maintainability.',
    links: ['event-driven-architecture', 'generative-ai', 'python'],
  },
  {
    id: 'python',
    label: 'Python',
    group: 'runtime',
    detail: 'Automation, AI/ML experimentation, scripting, and data-oriented tooling.',
    links: ['generative-ai', 'system-design'],
  },
];

export const timeline = [
  {
    year: 'T-03',
    title: 'Secure Systems Foundation',
    text: 'Built session-aware, multi-role web systems with strict authentication boundaries.',
    position: [4.8, 1.5, -84],
  },
  {
    year: 'T-02',
    title: 'Realtime Product Architecture',
    text: 'Moved into event-driven platforms, live negotiation flows, and production-grade portals.',
    position: [0, -1.2, -91],
  },
  {
    year: 'T-01',
    title: 'Distributed Mobile Reliability',
    text: 'Designed local-first sync behavior for applications that must keep working offline.',
    position: [-4.8, 1.2, -98],
  },
  {
    year: 'NOW',
    title: 'AI Command Layer',
    text: 'Combining Generative AI, agentic workflows, and full-stack systems into applied intelligence products.',
    position: [0, 0, -106],
  },
];
