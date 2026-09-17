/* global React, ReactDOM */

const PROFILE = {
  name: "Kamran Fareed",
  handle: "@KamranKhoxa",
  title: "Software Engineer & Full Stack Developer",
  lead: "4.5+ years building scalable microservices and SaaS platforms — TypeScript, PHP, Docker & AWS.",
  location: "D.G. Khan, PK",
  email: "kamrankhoxa@outlook.com",
  phoneDisplay: "+92 335 2455552",
  phoneHref: "+923352455552",
  linkedin: "https://www.linkedin.com/in/kamrankhoxa",
  github: "https://github.com/kamrankhoxa",
  resumes: {
    job: { href: "/Kamran_Fareed_Resume.pdf", label: "Job Resume" },
    research: { href: "/Kamran_Fareed_Research_Resume.pdf", label: "Research Resume" },
  },
};

const EXPERIENCE = [
  {
    role: "Associate Team Lead",
    company: "Codebotx",
    url: "https://codebotx.com/",
    meta: "D.G. Khan, PK · Nov 2025 – Present",
    bullets: [
      "Led zero-downtime deployment initiatives for a large-scale TypeScript platform, ensuring uninterrupted service during critical releases.",
      "Refactored core services and shared libraries to enforce clean architecture, reducing technical debt and stabilizing development velocity.",
    ],
  },
  {
    role: "Associate Team Lead",
    company: "Tech Solutions Pro",
    url: "https://techsolutionspro.co.uk/",
    meta: "Islamabad, PK · Apr 2025 – Nov 2025",
    bullets: [
      "Architected an Amazon-style microservices platform (FBM, vendors, sellers, wholesalers) — 35% faster onboarding, 40% faster deployments via Docker & AWS ALB.",
      "Optimized subscription and order workflows with async orchestration — 60% less manual overhead.",
    ],
  },
  {
    role: "Associate Software Engineer",
    company: "BloomRix",
    url: "http://www.bloomrix.com/",
    meta: "Lahore, PK · Aug 2024 – Feb 2025",
    bullets: [
      "Engineered a multi-tenancy framework with CRM, HRM & ERP — 35% faster onboarding, 40% shorter deployment cycles.",
      "Delivered centralized SSO — 80% improvement in authentication efficiency.",
    ],
  },
  {
    role: "Associate Software Engineer",
    company: "SA Communications",
    url: "https://www.linkedin.com/company/98633674/",
    meta: "Okara, PK · Jan 2023 – Jul 2024",
    bullets: [
      "Built escrow payment infrastructure with BTCPay Server — multi-currency, 15% faster transactions.",
      "Strengthened wallet security with BIP39 mnemonic recovery — 30% higher key recovery success.",
    ],
  },
  {
    role: "Associate Software Engineer",
    company: "eFAIDA Technologies",
    url: "https://efaida.com/",
    meta: "Okara, PK · Apr 2023 – Dec 2023",
    bullets: [
      "Delivered 10+ custom WordPress plugins — 25% performance gain, 95% client satisfaction.",
      "Architected headless CMS with Strapi.js — 30% less backend dev time, 20% lower API latency.",
    ],
  },
];

const RESEARCH = [
  {
    title: "Artificial Intelligence",
    body: "Exploring ML, NLP, and AI automation using Python for healthcare, finance, and security applications.",
  },
  {
    title: "Blockchain Technology",
    body: "Investigating smart contracts, dApps, and cryptographic protocols (Rust) for secure decentralized systems.",
  },
  {
    title: "AI–Blockchain Integration",
    body: "Researching how both domains combine for privacy-preserving, transparent, and autonomous intelligent systems.",
  },
];

const PROJECTS = [
  {
    name: "Samplethis",
    stack: "Next.js · Subscription & Listing",
    desc: "Digital music platform with premium sample packs, VST3 plugin marketplace, licensing & user dashboards.",
    live: "https://samplethis.com/",
    code: "https://github.com/kamrankhoxa/smplethis",
  },
  {
    name: "Montamo Project Portal",
    stack: "Next.js · Customer Dashboard & VOC",
    desc: "Construction project portal with OTP & Zitadel OIDC, multi-project dashboard, Django BFF, Elfsquad CPQ & Notion CMS on Google Cloud Run.",
    live: null,
    code: "https://github.com/montamo/project-portal",
  },
  {
    name: "WayveUK",
    stack: "Next.js · Rental Marketplace",
    desc: "Student marketplace to rent, buy & sell — payments, delivery, EasyShipping & student-exclusive offers.",
    live: "https://wayveuk.com/",
    code: "https://github.com/kamrankhoxa/wayveuk",
  },
  {
    name: "Eztoolx",
    stack: "Next.js · Multi-tool Platform",
    desc: "Video downloading, media utilities & productivity tools in one unified interface.",
    live: "https://eztoolx.com/",
    code: "https://github.com/kamrankhoxa/eztoolx",
  },
  {
    name: "Maelano Phase-01",
    stack: "MERN · Microservices",
    desc: "Amazon-style e-commerce with Dockerized microservices on AWS ALB — 60% less manual workload.",
    live: "https://maelano.com/",
    code: "https://github.com/kamrankhoxa/maelano",
  },
  {
    name: "Laboratory AI-Driven",
    stack: "Laravel · AI Reports",
    desc: "Multi-tenant lab management with SSO, AI-based diagnostics & automated report generation.",
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
    name: "Vehicle Marketplace",
    stack: "Node.js · Listing & Features",
    desc: "Vehicle listings, dealer profiles, messaging, filters & role-specific booking workflows.",
    live: "https://mippim.com/",
    code: "https://github.com/kamrankhoxa/m-motors",
  },
  {
    name: "Bed Store",
    stack: "WordPress · Bricks & WooCommerce",
    desc: "Custom themes & plugins with Bricks Builder — conditional pricing & dynamic product selection.",
    live: "https://mellbour.com/",
    code: "https://github.com/kamrankhoxa/bedstore",
  },
  {
    name: "Cab Booking Platform",
    stack: "WordPress · Elementor & WooCommerce",
    desc: "Taxi booking plugin with per-km/per-hour rates, real-time fare calculation & booking tracking.",
    live: "https://pdxairportshuttle.com/",
    code: "https://github.com/kamrankhoxa/kwickcab",
  },
  {
    name: "Mallorca Guider",
    stack: "WordPress · Elementor Travel Booking",
    desc: "Polish-language Mallorca travel guide with excursions, hotel search, reviews & online reservations.",
    live: null,
    code: "https://github.com/kamrankhoxa/malloagui",
  },
  {
    name: "Quran Search Application",
    stack: "Django · Voice Recognition",
    desc: "Search Quranic verses by voice, audio upload, or Arabic text input.",
    live: null,
    code: "https://github.com/kamrankhoxa/quranvers",
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
    desc: "Crypto e-commerce with escrow payments, multi-currency via Coinbase/BitPay & encrypted wallets.",
    live: null,
    code: "https://github.com/kamrankhoxa/conceptbig",
  },
  {
    name: "Central",
    stack: "Laravel · SaaS Bootstrap",
    desc: "Org creation, domain setup, super admin allocation & domain-based tenant routing.",
    live: null,
    code: "https://github.com/kamrankhoxa/central",
  },
  {
    name: "Core",
    stack: "Laravel · Tenant Management",
    desc: "Tenant data management, subscriptions & permission-based module controls.",
    live: null,
    code: "https://github.com/kamrankhoxa/core",
  },
  {
    name: "XYZ Hosting",
    stack: "Laravel · Domains & VPS",
    desc: "Hosting panel for domain search, purchase, shared hosting & VPS with GoDaddy API integration.",
    live: null,
    code: "https://github.com/kamrankhoxa/xyzhost",
  },
  {
    name: "Gaming Zone Manager",
    stack: "React Native · Sessions",
    desc: "Gaming session billing, live status sync & JWT-based roles with real-time tracking.",
    live: null,
    code: "https://github.com/kamrankhoxa/gzm-app",
  },
  {
    name: "SportCaster",
    stack: "React Native · News & Highlights",
    desc: "Live sports headlines, match breakdowns & category-based highlights with admin tools.",
    live: null,
    code: "https://github.com/kamrankhoxa/sportcaster",
  },
];

const SKILLS = [
  "TypeScript", "JavaScript", "PHP", "Next.js", "Nest.js", "Laravel",
  "Express.js", "React", "React Native", "Zustand", "Redux",
  "MongoDB", "MySQL", "PostgreSQL", "Prisma", "Mongoose",
  "Docker", "Kubernetes", "AWS", "Redis", "Kafka",
  "Tailwind CSS", "OpenAI", "DeepSeek", "Gemini",
  "Stripe", "PayPal", "Twilio",
];

const CERTS = [
  { label: "React JS Hands-On", href: "https://www.udemy.com/certificate/UC-8867f374-749e-4f22-a921-b02a9ab4dc39/" },
  { label: "Next.js Hands-On", href: "https://www.udemy.com/certificate/UC-705a07ac-7d7b-47b7-bbaf-6f35ae327d5f/" },
  { label: "Next.js 13 Hands-On", href: "https://www.udemy.com/certificate/UC-39e42ecd-0770-49fe-9cf5-7b34b0e5d2dd/" },
  { label: "Gatsby JS", href: "https://www.udemy.com/certificate/UC-441d4f14-49b4-4bab-9e9a-98a1b1b23d9d/" },
  { label: "Figma to WordPress", href: "https://www.udemy.com/certificate/UC-964c40fa-54e1-478e-9c5d-a22c6c15db5c/" },
  { label: "NEAR Blockchain JavaScript", href: "https://www.udemy.com/certificate/UC-dbe71268-85b3-426e-b9fd-a462e54884fe/" },
  { label: "Bootstrap & jQuery", href: "https://www.udemy.com/certificate/UC-f5fe64f7-f834-4be9-b5e2-011077855f65/" },
  { label: "Crystal Agile", href: "https://www.udemy.com/certificate/UC-2e87f3fe-fe6f-4647-bc1d-a85b4ddb7b2f/" },
  { label: "Docker Hands-On Advanced", href: "https://www.udemy.com/certificate/UC-e75e1aa4-22d6-4923-ac04-a60c45ad21b4/" },
  { label: "Mastering AWS Serverless", href: "https://www.udemy.com/certificate/UC-5db478a2-55b4-49de-a8c7-fa2ce09c9e77/" },
];

function track(event, params) {
  if (typeof window.gtag === "function") {
    window.gtag("event", event, params || {});
  }
}

function Topbar() {
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <a className="brand-mini" href="#home">{PROFILE.name}</a>
        <nav className="nav" aria-label="Main">
          <a href="#home">Home</a>
          <a href="#experience">Experience</a>
          <a href="#research">Research</a>
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero glass" id="home" aria-labelledby="hero-name">
      <img
        className="avatar"
        src="/dp.png"
        alt="Kamran Fareed — professional headshot"
        width="112"
        height="112"
        fetchPriority="high"
      />
      <h1 className="hero-name" id="hero-name">{PROFILE.name}</h1>
      <p className="hero-handle">{PROFILE.handle}</p>
      <p className="hero-tagline">{PROFILE.title}</p>
      <p className="hero-lead">{PROFILE.lead}</p>

      <div className="cta-row">
        <a
          className="btn btn-primary"
          href={PROFILE.resumes.job.href}
          download
          onClick={() => track("file_download", { file_name: "job_resume" })}
        >
          {PROFILE.resumes.job.label}
        </a>
        <a
          className="btn btn-glass"
          href={PROFILE.resumes.research.href}
          download
          onClick={() => track("file_download", { file_name: "research_resume" })}
        >
          {PROFILE.resumes.research.label}
        </a>
        <a className="btn btn-glass" href={`mailto:${PROFILE.email}`}>
          Email Me
        </a>
      </div>

      <div className="contact-strip" aria-label="Contact details">
        <span>{PROFILE.location}</span>
        <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
        <a href={`tel:${PROFILE.phoneHref}`}>{PROFILE.phoneDisplay}</a>
        <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer me">
          LinkedIn
        </a>
        <a href={PROFILE.github} target="_blank" rel="noopener noreferrer me">
          GitHub
        </a>
      </div>
    </section>
  );
}

function Highlights() {
  return (
    <div className="cols section">
      <section className="panel glass">
        <h2>Portfolio Highlights</h2>
        <ul>
          <li>10+ live projects shipped</li>
          <li>Microservices &amp; SaaS architecture</li>
          <li>Zero-downtime TypeScript deployments</li>
          <li>Multi-tenant CRM, HRM &amp; ERP systems</li>
          <li>Amazon-style e-commerce platforms</li>
          <li>Crypto escrow &amp; BTCPay integrations</li>
          <li>SSO &amp; domain-based tenant routing</li>
          <li>React Native &amp; PWA applications</li>
        </ul>
      </section>

      <section className="panel glass">
        <h2>Career Summary</h2>
        <p>
          Software engineer with <strong>4.5+ years</strong> overall experience,{" "}
          <strong>3.5+ years</strong> in industry, and <strong>10+ live projects</strong>.
          Specializing in JavaScript &amp; PHP — scalable microservices and SaaS-optimized applications.
        </p>
        <p>
          Currently <strong>Associate Team Lead at Codebotx</strong> (D.G. Khan).
          Previously led platforms at Tech Solutions Pro, BloomRix, SA Communications, and eFAIDA Technologies.
        </p>
        <p>
          Recipient of <strong>Ahsaas Merit Scholarship</strong> (twice) and{" "}
          <strong>PMYP Laptop Scheme</strong>. Open to full-time engineering and research roles.
        </p>
      </section>

      <section className="panel glass">
        <h2>Academic Qualifications</h2>
        <p>
          <strong>BS Computer Science</strong>
          <br />
          University of Okara · Mar 2020 – Feb 2024
        </p>
        <ul>
          <li>CGPA: 3.43/4.0 (3rd Position in Batch)</li>
          <li>Bronze Medal for academic excellence</li>
          <li>Ahsaas Merit Scholarship (awarded twice)</li>
          <li>PMYP Laptop Scheme — merit selection</li>
          <li>Coursework: AI, DSA, DBMS, Networks, OS</li>
        </ul>
      </section>
    </div>
  );
}

function Experience() {
  return (
    <section className="section" id="experience" aria-labelledby="exp-title">
      <h2 className="section-title" id="exp-title">Experience</h2>
      {EXPERIENCE.map((job) => (
        <article className="job glass" key={`${job.company}-${job.meta}`}>
          <div className="job-head">
            <span className="job-title">
              {job.role} ·{" "}
              <a href={job.url} target="_blank" rel="noopener noreferrer">
                {job.company}
              </a>
            </span>
            <span className="job-meta">{job.meta}</span>
          </div>
          <ul>
            {job.bullets.map((b) => (
              <li key={b.slice(0, 48)}>{b}</li>
            ))}
          </ul>
        </article>
      ))}
    </section>
  );
}

function ResearchFocus() {
  return (
    <section className="section" id="research" aria-labelledby="research-title">
      <h2 className="section-title" id="research-title">Research Focus</h2>
      <p style={{ textAlign: "center", color: "var(--ink-soft)", marginBottom: "1rem", fontSize: "0.95rem" }}>
        Transitioning toward research in AI and Blockchain — see the{" "}
        <a href={PROFILE.resumes.research.href} download onClick={() => track("file_download", { file_name: "research_resume" })}>
          research resume
        </a>
        .
      </p>
      <div className="research-grid">
        {RESEARCH.map((item) => (
          <article className="research-card glass" key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section className="section" id="projects" aria-labelledby="projects-title">
      <h2 className="section-title" id="projects-title">Projects</h2>
      <div className="projects">
        {PROJECTS.map((p) => (
          <article className="project glass" key={p.name}>
            <h3>{p.name}</h3>
            <p className="stack">{p.stack}</p>
            <p>{p.desc}</p>
            <div className="project-actions">
              {p.live && (
                <a className="btn btn-sm btn-live" href={p.live} target="_blank" rel="noopener noreferrer">
                  View Project
                </a>
              )}
              {p.code && (
                <a className="btn btn-sm btn-code" href={p.code} target="_blank" rel="noopener noreferrer">
                  View Code
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="section" id="skills" aria-labelledby="skills-title">
      <h2 className="section-title" id="skills-title">Technologies &amp; Skills</h2>
      <div className="chips glass">
        {SKILLS.map((s) => (
          <span className="chip" key={s}>{s}</span>
        ))}
      </div>

      <h2 className="section-title" style={{ marginTop: "1.5rem" }}>Certifications</h2>
      <div className="certs glass">
        {CERTS.map((c) => (
          <a className="cert" key={c.href} href={c.href} target="_blank" rel="noopener noreferrer">
            {c.label}
          </a>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="section contact-block glass" id="contact" aria-labelledby="contact-title">
      <h2 className="section-title" id="contact-title">Contact</h2>
      <p>Open to full-time software engineering and research opportunities. Reach out anytime.</p>
      <div className="contact-links">
        <a href={`tel:${PROFILE.phoneHref}`}>{PROFILE.phoneDisplay}</a>
        <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
        <span>{PROFILE.location}</span>
      </div>
      <div className="cta-row" style={{ marginTop: "1.15rem", marginBottom: 0 }}>
        <a className="btn btn-primary" href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer me">
          LinkedIn
        </a>
        <a className="btn btn-glass" href={PROFILE.github} target="_blank" rel="noopener noreferrer me">
          GitHub
        </a>
        <a className="btn btn-glass" href={PROFILE.resumes.job.href} download>
          Job Resume
        </a>
        <a className="btn btn-glass" href={PROFILE.resumes.research.href} download>
          Research Resume
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      © {new Date().getFullYear()} {PROFILE.name} ({PROFILE.handle}). All rights reserved.
    </footer>
  );
}

function App() {
  return (
    <>
      <Topbar />
      <main className="wrap">
        <Hero />
        <Highlights />
        <Experience />
        <ResearchFocus />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
