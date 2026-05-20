export const en = {
  // ── Layout / SEO ──
  site: {
    title: "Life Journey — AI-Powered Personal Brand Website Generator",
    description: "Upload your resume, AI polishes it, and generates a modern personal homepage. Supports PDF/DOCX parsing, 5 AI styles, and QR code sharing.",
    keywords: "resume,personal website,AI,resume builder,personal brand,website generator",
    ogTitle: "Life Journey — AI-Powered Personal Brand Website Generator",
    ogDescription: "Upload your resume, let AI polish it, and generate a modern personal homepage with one click.",
  },

  // ── Navigation / Header ──
  nav: {
    steps: ["Upload", "Edit", "Preview"],
    login: "Login",
    logout: "Logout",
    brand: "Life Journey",
  },

  // ── Home Page ──
  home: {
    typewriter: [
      "AI-powered resume polishing, generate a modern personal site",
      "5 AI styles to match your career positioning",
      "One-click publish, share with the world via QR code",
    ],
    cta: "Get Started",
    learnMore: "Learn More",
    features: [
      { title: "Upload & Parse", desc: "Drag & drop PDF/DOCX resume files, AI automatically extracts and polishes information" },
      { title: "Free Editing", desc: "Review AI-polished results, supplement and adjust content anytime" },
      { title: "One-Click Publish", desc: "Generate a modern designed personal homepage, deployable to any static hosting" },
    ],
    tagline: ["AI Polish", "5 Styles", "One-Click Publish"],
    scrollHint: "Scroll down",
    modal: {
      title: "Get Started",
      subtitle: "Choose AI style, upload resume, generate instantly",
      parsed: "Resume parsing complete, data saved",
      editInfo: "Edit Info",
      preview: "Preview",
      history: "History",
    },
    brandStatement: "Upload your resume, AI polishes it, and generates your modern personal homepage",
  },

  // ── Edit Page ──
  edit: {
    supplement: "Supplement",
    agentSelector: {
      label: "Choose AI Parsing Style",
      suitable: "Suitable for",
    },
    form: {
      basics: "Basic Info",
      skills: "Skills",
      experience: "Work Experience",
      education: "Education",
      projects: "Projects",
      languages: "Languages",
      certifications: "Certifications",
      name: "Name",
      title: "Job Title",
      email: "Email",
      phone: "Phone",
      location: "Location",
      website: "Website",
      summary: "Summary",
      company: "Company",
      position: "Position",
      startDate: "Start Date",
      endDate: "End Date",
      jobSummary: "Job Summary",
      highlights: "Key Achievements",
      institution: "Institution",
      degree: "Degree",
      field: "Field of Study",
      projectName: "Project Name",
      projectDesc: "Project Description",
      projectUrl: "Project URL",
      language: "Language",
      proficiency: "Proficiency",
      certName: "Certification Name",
      issuer: "Issuer",
      date: "Date",
      add: "Add",
      remove: "Remove",
      present: "Present",
      proficiencyLevels: ["Native", "Fluent", "Good", "Basic"],
    },
    supplementPanel: {
      title: "Supplement Materials",
      description: "Upload project documents, certificates, etc. AI will intelligently extract and merge into your resume",
      uploadHint: "Drag & drop or click to upload PDF/DOCX/TXT",
      merging: "AI is analyzing supplement materials...",
      empty: "No supplement materials uploaded yet",
    },
  },

  // ── Preview Page ──
  preview: {
    tabs: [
      { label: "Portfolio Preview", icon: "🏠" },
      { label: "Project Case", icon: "📋" },
      { label: "Industry Brief", icon: "📊" },
      { label: "Whitepaper", icon: "📄" },
      { label: "Job Materials", icon: "💼" },
    ],
    generate: "Generate",
    regenerate: "Regenerate",
    generating: "AI is generating materials...",
    noData: "No resume data to preview.",
    backToUpload: "Back to upload",
    backToEdit: "← Back to Edit",
    notGenerated: "No materials generated yet. Click the \"Generate\" button at top right to let AI create professional reports based on your resume.",
    generateNow: "Generate Now",
    emptyCategory: "No content in this category. Please regenerate or select another category.",
    downloadHTML: "Download HTML",
    publishing: "Publishing...",
    publish: "Publish",
  },

  // ── Pricing Page ──
  pricing: {
    title: "Choose Your Plan",
    subtitle: "3 free trials, upgrade to Pro when ready",
    recommended: "Recommended",
    upgrade: "Upgrade to Pro",
    free: {
      name: "Free",
      price: "$0",
      period: "Forever",
      description: "Explore core features",
      features: ["3 resume parses", "1 AI Agent style", "Personal homepage HTML", "Basic themes"],
      cta: "Sign Up Free",
      start: "Get Started",
    },
    monthly: {
      name: "Pro Monthly",
      price: "$5",
      period: "/month",
      description: "For active job seekers",
      features: ["Unlimited resume parsing", "All 5 AI Agents", "Project case reports", "Industry briefs & whitepapers", "Supplement merging", "Job materials pack", "Priority processing"],
    },
    yearly: {
      name: "Pro Yearly",
      price: "$35",
      period: "/year",
      description: "Save $25 · Only $2.90/mo",
      features: ["All Pro Monthly features", "Exclusive premium themes", "Batch export", "Annual report summary", "Priority support"],
    },
    payModal: {
      title: "Scan to Pay",
      generating: "Generating payment code...",
      openInBrowser: "Open in browser to pay",
      autoActivate: "Automatically activated after payment",
      qrCodeAlt: "Payment QR Code",
    },
    backToHome: "← Back to Home",
  },

  // ── Login Page ──
  auth: {
    brandTitle: "Life Journey",
    brandDesc: "Upload your resume, AI polishes it\nGenerate your modern personal homepage",
    welcome: "Welcome Back",
    createAccount: "Create Account",
    loginDesc: "Log in to view your resume history",
    registerDesc: "Register to save and manage your resumes",
    name: "Name",
    namePlaceholder: "Your name (optional)",
    email: "Email",
    emailPlaceholder: "you@example.com",
    password: "Password",
    passwordPlaceholder: "At least 6 characters",
    login: "Log In",
    register: "Sign Up",
    processing: "Processing...",
    noAccount: "Don't have an account?",
    hasAccount: "Already have an account?",
    goRegister: "Sign Up",
    goLogin: "Log In",
    backToHome: "← Back to Home",
    networkError: "Network error, please try again.",
    operationFailed: "Operation failed",
  },

  // ── Agents ──
  agents: {
    techGeek: {
      name: "Tech Geek",
      description: "Deep dive into technical capabilities, quantify engineering impact",
      suitable: "Software development, architecture, DevOps, data engineering",
    },
    creativeMaster: {
      name: "Creative Master",
      description: "Emphasize design philosophy, visual expression, and creative methodology",
      suitable: "UI/UX design, brand design, video production, creative direction",
    },
    businessElite: {
      name: "Business Elite",
      description: "Highlight performance metrics, leadership, and business impact",
      suitable: "Management, finance, sales, marketing, consulting",
    },
    academicRigor: {
      name: "Academic Rigor",
      description: "Focus on academic achievements, research direction, and publications",
      suitable: "Academic positions, research institutions, think tanks, education",
    },
    generalAllround: {
      name: "General All-Rounder",
      description: "Balanced coverage across all dimensions, AI auto-determines focus",
      suitable: "General / Undecided career direction",
    },
  },

  // ── Report Types ──
  reports: {
    projectCase: "Project Case",
    industryBrief: "Industry Brief",
    whitepaper: "Whitepaper",
    jobMaterial: "Job Materials",
  },

  // ── HTML Generator ──
  html: {
    generatedBy: "Generated by Life Journey",
    personalHomepage: "'s Homepage",
    about: "About",
    experience: "Experience",
    education: "Education",
    skills: "Skills",
    projects: "Projects",
    languages: "Languages",
    certifications: "Certifications",
    contact: "Contact",
    generated: "Generated by AI",
  },

  // ── Error / Loading / Not Found ──
  states: {
    loading: "Loading…",
    error: "Something Went Wrong",
    errorDefault: "An unexpected error occurred while loading the page. Please try again later.",
    retry: "Reload",
    notFound: "Page Not Found",
    notFoundDesc: "The page you're looking for may have been moved, deleted, or the address is incorrect.",
    backHome: "Back to Home",
    close: "Close",
    paymentFailed: "Payment failed",
    generateFailed: "Generation failed",
    networkError: "Network error",
  },

  // ── Feedback ──
  feedback: {
    button: "💬 Feedback",
    title: "Send Feedback",
    placeholder: "Your suggestions or issues...",
    submit: "Submit",
    thanks: "Thanks for your feedback!",
  },

  // ── Upload ──
  upload: {
    dropHint: "Drag & drop your resume here, or",
    clickUpload: "click to upload",
    formats: "Supports PDF, DOCX formats, max 10MB",
    remove: "Remove",
    parsing: "AI is parsing your resume...",
    startParse: "Start Parsing",
    invalidFormat: "Only PDF and DOCX file formats are supported.",
    fileTooLarge: "File size cannot exceed 10MB.",
    networkError: "Network error, please check your connection and try again.",
    parseFailed: "Parsing failed",
  },

  // ── Theme Music ──
  music: {
    title: "Life Journey Theme Music",
    hint: "Click to toggle music",
  },

  // ── Resume Portfolio Preview ──
  portfolio: {
    noData: "No resume data",
    download: "Download HTML",
    warning: "Note",
    warningText: "This HTML is a self-contained file with inlined CSS and JS (~15KB). You can drag it to any static hosting (Vercel, Netlify, GitHub Pages) and it will work immediately.",
    gotIt: "Got it",
  },
  // ── AI Prompts ──
  prompts: {
    sharedOutputFormat: `Please strictly return results in the following JSON format. If a field cannot be found in the resume, use an empty string "" or empty array [] instead—do not fabricate information.

Output format (JSON schema):
{
  "basics": {
    "name": "Full name",
    "title": "Optimized job title (brand-focused, highlighting core competencies)",
    "email": "Email address",
    "phone": "Phone number",
    "location": "City",
    "website": "Personal website/LinkedIn",
    "summary": "Polished professional summary (2-4 sentences highlighting core strengths and personal brand)",
    "avatar": ""
  },
  "skills": [
    { "id": "english-identifier", "category": "Skill category name", "items": ["Skill 1", "Skill 2"] }
  ],
  "experience": [
    {
      "id": "english-identifier",
      "company": "Company name",
      "position": "Job title",
      "startDate": "YYYY-MM",
      "endDate": "YYYY-MM (use 'Present' if current)",
      "summary": "Polished job overview (1-2 sentences)",
      "highlights": ["Achievement descriptions starting with action verbs, quantified where possible"]
    }
  ],
  "education": [
    {
      "id": "english-identifier",
      "institution": "School name",
      "degree": "Degree",
      "field": "Field of study",
      "startDate": "YYYY-MM",
      "endDate": "YYYY-MM"
    }
  ],
  "projects": [
    {
      "id": "english-identifier",
      "name": "Project name",
      "description": "Polished project overview",
      "url": "Project URL (if available)",
      "highlights": ["Quantified project achievements"]
    }
  ],
  "languages": [
    { "id": "english-identifier", "language": "Language name", "proficiency": "Native/Fluent/Good/Basic" }
  ],
  "certifications": [
    { "id": "english-identifier", "name": "Certification name", "issuer": "Issuing organization", "date": "Date obtained" }
  ]
}

General rules:
- Dates in YYYY-MM format, e.g. "2023-01"
- id fields use readable English identifiers
- Return ONLY the JSON code block, no other text
- Wrap the returned JSON in a \`\`\`json code block`,

    techGeekPrompt: `You are a senior technical headhunter and VP of Engineering. Your expertise is uncovering true engineering depth and impact from technical resumes.

Role:
You have evaluated thousands of technical resumes. You despise empty buzzword-stacking and value concrete engineering decisions with quantified outputs.

Optimization principles:
- Every highlight must include technical approach + quantified result (e.g. "Reduced API response time from 2s to 50ms by introducing Redis caching layer")
- Transform vague descriptions into specific technical details: not "optimized system performance" but "used flame graphs to identify hotspots, refactored xx module"
- If skills inferred from experience are missing from the skills list, add them (e.g. add React/TypeScript if React projects are mentioned)
- Project experience should highlight the WHY and trade-offs behind tech choices, not just list tools used
- Summary should read like a personal tech brand statement: one-line positioning + core tech stack + most impactful engineering achievement
- Infer system scale from project descriptions (users, QPS, data volume) and reflect in appropriate fields

`,

    creativeMasterPrompt: `You are a top creative director and design team lead. You screen talent for the world's leading design firms.

Role:
You value a designer's aesthetic judgment and creative methodology over tool lists. You believe good design is backed by clear design logic.

Optimization principles:
- Each project experience should follow the chain: Design Challenge → Solution → Visual Output → Business Impact
- Transform "responsible for design" into "led the complete design process from user research to high-fidelity delivery"
- Highlight cross-team collaboration: working methods and outcomes with product, engineering, and marketing
- Skills categories should reflect the completeness of the design toolkit (User Research/Interaction Design/Visual Design/Design Systems/Motion)
- Each project description should include unique design methods and visual style choices
- Summary should convey the designer's personal style and design philosophy, not a resume-style list
- If portfolio links or awards exist, feature them prominently

`,

    businessElitePrompt: `You are a top executive headhunter and MBA admissions officer. You evaluate talent for Fortune 500 companies and top business schools.

Role:
When reviewing business resumes, you ask only three questions: What value did this person create? How did they do it? Can they enable others to do it too?

Optimization principles:
- Every experience must include quantifiable business results (revenue growth, cost reduction, efficiency gains, team size)
- Transform "responsible for xx" into "led xx initiative, resulting in yy business growth"
- Highlight leadership: team size managed, cross-departmental coordination scope, budget authority
- Emphasize strategic thinking: not just what was executed, but why and how
- Summary should read like an elevator pitch: confident, concise, impactful personal business value statement
- Project experience should emphasize business ROI; technical details take a secondary role
- Education background with MBA or prestigious institutions should be prominently featured
- Industry certifications (CFA, PMP, etc.) should be highlighted where appropriate

`,

    academicRigorPrompt: `You are a senior academic committee member and doctoral advisor. You evaluate the depth, rigor, and research potential of academic talent.

Role:
You believe the appeal of an academic CV lies in the clarity of the research trajectory and the originality of intellectual contributions, not page count.

Optimization principles:
- Outline a clear research narrative: Research interests → Methodology → Key findings → Academic impact
- Each research experience should reflect your unique scholarly contribution, not just project participation
- Publication records strictly follow academic conventions (ordered by significance or reverse chronological)
- In education, thesis topics should be reflected in the field of study
- Skills categories should distinguish "Research Methods", "Data Analysis", "Domain Knowledge", "Teaching Ability" and other academic dimensions
- Summary should adopt an academic style: research area + core contributions + future directions, rigorous and measured
- Teaching experience and academic service (journal review, conference organization, etc.) should also be included
- Language proficiency is critical for international academic exchange—always note if present

`,

    generalAllroundPrompt: `You are a senior career advisor and resume optimization expert. You help candidates across all industries craft their most compelling personal resumes.

Role:
You believe "the best resume tells your story in the reader's language." You automatically identify the candidate's industry and role, then optimize accordingly.

Optimization principles:
- Automatically identify the resume's industry and role type, adopting the most suitable expression style and emphasis
- Rewrite bland wording using vivid, powerful action verbs and specific achievements to make descriptions more persuasive
- Every highlight must start with a verb and include quantitative metrics where possible
- Summary is a 2-4 sentence micro-story: Who I am → What I've done → What value I bring
- Skills should be reasonably grouped—no more than 6 categories, 3-8 items per category
- Reasonably supplement inferred details (infer skills from roles, infer project scale from company)
- Maintain a professional, confident tone without over-exaggeration

`,

    mergePrompt: `You are a resume optimization expert. You will receive existing resume data (JSON format) and supplementary material text.
Intelligently merge new information from the supplementary material into the existing resume—fill in missing sections and enhance existing content.

Merge principles:
- Preserve existing correct information; do not delete or modify unrelated sections
- New projects, skills, and experiences from supplementary materials should be added to their corresponding sections
- If supplementary material is related to but not duplicative of existing information, enhance existing content (e.g. add achievement highlights from the supplement to existing work experience)
- If there is conflicting information, update based on the supplementary material
- Supplementary material may be incomplete fragments (e.g. a self-introduction, a project document)—extract key information and fit into appropriate fields
- Return the complete merged JSON in exactly the same format as the input

Return ONLY the complete JSON wrapped in a \`\`\`json code block, no other text.`,

    reportPrompt: `You are a senior career advisor and industry analyst. Your task is to generate professional content based on the user's resume data to help them stand out in job applications and personal branding.

Generate the following 4 types of reports based on the resume content, 1-2 articles per type. Return strict JSON format.

[1. Project Case (project-case)]
Expand each project experience in STAR format (Situation-Task-Action-Result).
- Title format: "Project Name — STAR Case Analysis"
- Content includes: Project background & business objectives, Personal role & core responsibilities, Key actions taken, Quantifiable results & impact

[2. Industry Brief (industry-brief)]
Based on positions and skills in the resume, write an industry analysis brief.
- Title format: "XX Industry/Sector — Current State & Trends Brief"
- Content includes: Industry overview & market size, Competitive landscape & key players, Technology/business trends, Talent demand & skill directions

[3. Career Whitepaper (whitepaper)]
Distill the overall work experience into a professional whitepaper.
- Title format: "Career Development Whitepaper — XX"
- Content includes: Executive summary, Core competency framework, Key methodologies, Representative achievements, Career development recommendations

[4. Job Materials (job-material)]
Generate multi-purpose job application content.
- Title format: "Job Materials Pack — XX"
- Content includes: Cover letter template, 1-minute self-introduction speaking script, LinkedIn-optimized personal summary

Output format (strict JSON):
{
  "reports": [
    { "type": "project-case", "title": "Title", "content": "Markdown formatted content" },
    { "type": "industry-brief", "title": "Title", "content": "Markdown formatted content" },
    { "type": "whitepaper", "title": "Title", "content": "Markdown formatted content" },
    { "type": "job-material", "title": "Title", "content": "Markdown formatted content" }
  ]
}

Important:
- content fields use Markdown format with appropriate heading levels, lists, bold text, etc.
- All content must be professional and factual—do not fabricate companies or data
- Deeply expand on existing information from the resume; fill gaps with reasonable industry knowledge
- Return ONLY the \`\`\`json code block, no other text`,
  },
} as const;
