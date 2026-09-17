/**
 * Content config — edit this file to update portfolio copy.
 * Used by main.js to render skills, projects, experience, research, float tags.
 */
window.PORTFOLIO = {
  typewriterText: "Building Full-Stack Solutions & Smart Automation",

  /** Midground parallax float tags (0.35x scroll) */
  floatTags: [
    { label: "React", x: 8, y: 18, depth: 0.9 },
    { label: "Node.js", x: 78, y: 14, depth: 1.15 },
    { label: "TypeScript", x: 18, y: 72, depth: 0.75 },
    { label: "Python", x: 85, y: 68, depth: 1.05 },
    { label: "SQL", x: 52, y: 22, depth: 0.85 },
    { label: "PineScript", x: 62, y: 78, depth: 1.2 },
    { label: "Next.js", x: 12, y: 48, depth: 1.0 },
    { label: "Docker", x: 88, y: 42, depth: 0.8 },
    { label: "AWS", x: 42, y: 85, depth: 0.95 },
    { label: "Laravel", x: 72, y: 32, depth: 1.1 },
  ],

  skills: [
    {
      title: "Frontend",
      items: ["React", "Next.js", "TypeScript", "React Native", "Tailwind CSS", "PWA"],
    },
    {
      title: "Backend",
      items: ["Node.js", "Nest.js", "Laravel", "Express.js", "PHP", "Docker", "AWS"],
    },
    {
      title: "Scripting & Databases",
      items: ["Python", "SQL", "PineScript", "MongoDB", "PostgreSQL", "MySQL", "Redis"],
    },
  ],

  projects: [
    {
      name: "Samplethis",
      stack: "Next.js · Subscription & Listing",
      desc: "Digital music platform with premium sample packs, VST3 marketplace, licensing & dashboards.",
      live: "https://samplethis.com/",
      code: "https://github.com/kamrankhoxa/smplethis",
    },
    {
      name: "Montamo Project Portal",
      stack: "Next.js · Customer Dashboard & VOC",
      desc: "Construction portal with OTP & Zitadel OIDC, Django BFF, Elfsquad CPQ & Notion CMS on Cloud Run.",
      live: "https://dev-projektportal.montamo.engineer/",
      code: "https://github.com/montamo/project-portal",
    },
    {
      name: "Maelano Phase-01",
      stack: "MERN · Microservices",
      desc: "Amazon-style e-commerce with Dockerized microservices on AWS ALB — 60% less manual workload.",
      live: "https://maelano.com/",
      code: "https://github.com/kamrankhoxa/maelano",
    },
    {
      name: "WayveUK",
      stack: "Next.js · Rental Marketplace",
      desc: "Student marketplace to rent, buy & sell — payments, delivery & student-exclusive offers.",
      live: "https://wayveuk.com/",
      code: "https://github.com/kamrankhoxa/wayveuk",
    },
    {
      name: "Laboratory AI-Driven",
      stack: "Laravel · AI Reports",
      desc: "Multi-tenant lab management with SSO, AI diagnostics & automated report generation.",
      live: "http://pioneercdxlabs.com/",
      code: "https://github.com/kamrankhoxa/labioneer",
    },
    {
      name: "WorkzenPro",
      stack: "Next.js & Laravel · HRM",
      desc: "SaaS suite — org creation, domain setup, tenant routing & unified login systems.",
      live: "https://workzenpro.com/",
      code: "https://github.com/kamrankhoxa/workzen",
    },
    {
      name: "Eztoolx",
      stack: "Next.js · Multi-tool Platform",
      desc: "Video downloading, media utilities & productivity tools in one interface.",
      live: "https://eztoolx.com/",
      code: "https://github.com/kamrankhoxa/eztoolx",
    },
    {
      name: "DeFi LaunchPad",
      stack: "T3 · NextUI & ShyftRPC",
      desc: "Token launch with presale logic, tax mechanisms & escrow-like fund security.",
      live: null,
      code: "https://github.com/kamrankhoxa/dex-app",
    },
    {
      name: "Escrow Commerce",
      stack: "Laravel · Crypto Pay",
      desc: "Crypto e-commerce with escrow payments and multi-currency via Coinbase/BitPay.",
      live: null,
      code: "https://github.com/kamrankhoxa/conceptbig",
    },
    {
      name: "Vehicle Marketplace",
      stack: "Node.js · Listings",
      desc: "Vehicle listings, dealer profiles, messaging & role-specific booking workflows.",
      live: "https://mippim.com/",
      code: "https://github.com/kamrankhoxa/m-motors",
    },
    {
      name: "Cab Booking Platform",
      stack: "WordPress · WooCommerce",
      desc: "Taxi booking with per-km/per-hour rates, real-time fare calculation & tracking.",
      live: "https://pdxairportshuttle.com/",
      code: "https://github.com/kamrankhoxa/kwickcab",
    },
    {
      name: "Quran Search",
      stack: "Django · Voice Recognition",
      desc: "Search Quranic verses by voice, audio upload, or Arabic text input.",
      live: null,
      code: "https://github.com/kamrankhoxa/quranvers",
    },
  ],

  experience: [
    {
      role: "Associate Team Lead",
      company: "Codebotx",
      url: "https://codebotx.com/",
      meta: "D.G. Khan, PK · Nov 2025 – Present",
      bullets: [
        "Led zero-downtime deployments for a large-scale TypeScript platform.",
        "Refactored core services to enforce clean architecture and cut technical debt.",
      ],
    },
    {
      role: "Associate Team Lead",
      company: "Tech Solutions Pro",
      url: "https://techsolutionspro.co.uk/",
      meta: "Islamabad, PK · Apr 2025 – Nov 2025",
      bullets: [
        "Architected Amazon-style microservices — 35% faster onboarding, 40% faster deploys via Docker & AWS ALB.",
        "Optimized subscription workflows with async orchestration — 60% less manual overhead.",
      ],
    },
    {
      role: "Associate Software Engineer",
      company: "BloomRix",
      url: "http://www.bloomrix.com/",
      meta: "Lahore, PK · Aug 2024 – Feb 2025",
      bullets: [
        "Built multi-tenancy CRM/HRM/ERP — 35% faster onboarding, 40% shorter deploy cycles.",
        "Delivered centralized SSO — 80% better authentication efficiency.",
      ],
    },
    {
      role: "Associate Software Engineer",
      company: "SA Communications",
      url: "https://www.linkedin.com/company/98633674/",
      meta: "Okara, PK · Jan 2023 – Jul 2024",
      bullets: [
        "Escrow payments with BTCPay Server — multi-currency, 15% faster transactions.",
        "BIP39 wallet recovery — 30% higher key recovery success.",
      ],
    },
    {
      role: "Associate Software Engineer",
      company: "eFAIDA Technologies",
      url: "https://efaida.com/",
      meta: "Okara, PK · Apr 2023 – Dec 2023",
      bullets: [
        "10+ WordPress plugins — 25% performance gain, 95% client satisfaction.",
        "Headless CMS with Strapi.js — 30% less backend time, 20% lower API latency.",
      ],
    },
  ],

  research: [
    {
      title: "Artificial Intelligence",
      body: "Exploring ML, NLP, and AI automation using Python for healthcare, finance, and security.",
    },
    {
      title: "Blockchain Technology",
      body: "Investigating smart contracts, dApps, and cryptographic protocols for decentralized systems.",
    },
    {
      title: "AI–Blockchain Integration",
      body: "Researching privacy-preserving, transparent, and autonomous intelligent systems.",
    },
  ],
};
