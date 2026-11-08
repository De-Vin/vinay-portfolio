/**
 * All portfolio content, sourced from the resume.
 * Edit copy here — sections render from this file.
 * Rule of thumb: if it isn't on the resume, it doesn't go in here.
 */

export const stages = [
  { id: 'init', n: '01', label: 'init', cmd: 'git clone vinay-avvaru' },
  { id: 'log', n: '02', label: 'log', cmd: 'git log --graph --reverse' },
  { id: 'deps', n: '03', label: 'deps', cmd: 'npm ls --depth=0' },
  { id: 'build', n: '04', label: 'build', cmd: 'npm run build' },
  { id: 'deploy', n: '05', label: 'deploy', cmd: 'kubectl rollout history' },
  { id: 'config', n: '06', label: 'config', cmd: 'cat .engineeringrc' },
  { id: 'ship', n: '07', label: 'ship', cmd: 'gh pr create' },
];

export const hero = {
  kicker: 'Vinay Avvaru — Software Engineer',
  lede:
    'I take Figma frames, domain-heavy requirements and ageing runtimes, and turn them into responsive web applications that teams actually ship — across healthcare and insurance products.',
  stats: [
    { value: '04', label: 'healthcare web apps built from scratch' },
    { value: 'v14→20', label: 'Node.js upgrade, led end to end' },
    { value: 'RBAC', label: 'Keycloak multitenancy & custom themes, led' },
    { value: '3', label: 'roles at Techsophy since Aug 2023' },
  ],
};

export const story = {
  title: ['The commit', 'history.'],
  intro:
    'A degree in Chemical Engineering, a career in software. The through-line is systems: understand how the whole thing flows, then make each part of it dependable. Here is the log, oldest commit first.',
  commits: [
    { date: '2016', branch: 'edu', type: 'init', msg: 'Pre-University Course', body: 'Rajiv Gandhi University of Knowledge Technologies, Nuzvid. 2016 — 2018.' },
    { date: '2018', branch: 'edu', type: 'feat', msg: 'B.Tech in Chemical Engineering (CHE)', body: 'Rajiv Gandhi University of Knowledge Technologies, Nuzvid. 2018 — 2022.' },
    { date: '2019', branch: 'side', type: 'chore', msg: 'University-level hackathons & coding sprints', body: 'Kept building and competing through 2019 — 2022 — the first real pull toward software.' },
    { date: '2020', branch: 'side', type: 'lead', msg: 'Graduate Student Council Representative', body: 'Represented students at Rajiv Gandhi University of Technologies, 2020 — 2022.' },
    { date: '2021', branch: 'side', type: 'docs', msg: 'Created & facilitated a workshop', body: 'Academic Student Association Workshop — creator and facilitator.' },
    { date: '2021', branch: 'side', type: 'talk', msg: 'Poster presenter — Technical Symposium Series', body: 'Rajiv Gandhi University of Technologies.' },
    { date: '2022', branch: 'edu', type: 'demo', msg: 'Research & project presenter', body: 'College of Engineering Project Showcase. Graduated — merge edu → main.' },
    { date: 'Aug 2023', branch: 'main', type: 'checkout', msg: 'checkout -b software-engineering', body: 'Joined Techsophy, Hyderabad, as a Software Engineer Intern. Form.io, enterprise UI components, and the in-house Awgment platform.' },
    { date: 'Jan 2024', branch: 'main', type: 'feat', msg: 'Associate Software Engineer', body: 'React & JavaScript for Channel360 and Paisaplan. Led the Node.js v14 → v20 upgrade.' },
    { date: '2024', branch: 'side', type: 'chore', msg: 'Hackathons — web development & problem-solving', body: 'Participated in multiple hackathons alongside full-time work.' },
    { date: 'Dec 2024', branch: 'main', type: 'feat', msg: 'Software Engineer — 4Healths', body: 'Four healthcare web apps from scratch with Vue.js, React and shadcn/ui. Led Keycloak multitenancy, custom themes and RBAC.', head: true },
  ],
};

export const skills = [
  {
    key: 'languages',
    label: 'Languages',
    items: [
      { name: 'JavaScript', used: ['channel360', 'paisaplan'], note: 'The language behind the Channel360 and Paisaplan applications.' },
      { name: 'TypeScript', used: [], note: 'Part of the core toolkit.' },
      { name: 'HTML', used: ['4healths'], note: 'Semantic, responsive markup — the base of every pixel-perfect build.' },
      { name: 'CSS', used: ['4healths'], note: 'Responsive, pixel-accurate layouts from Figma designs.' },
    ],
  },
  {
    key: 'frontend',
    label: 'Frontend Engineering',
    items: [
      { name: 'React', used: ['4healths', 'channel360', 'paisaplan'], note: 'Primary framework across insurance and healthcare products.' },
      { name: 'Vue.js', used: ['4healths'], note: 'Used alongside React to build the 4Healths applications.' },
      { name: 'shadcn/ui', used: ['4healths'], note: 'Component foundation for the 4Healths apps.' },
      { name: 'Material UI', used: [], note: 'Part of the core component-library toolkit.' },
    ],
  },
  {
    key: 'backend',
    label: 'Backend & APIs',
    items: [
      { name: 'Node.js', used: ['node-upgrade'], note: 'Led the runtime upgrade from v14 to v20.' },
      { name: 'REST APIs', used: [], note: 'API integration for front-end applications.' },
      { name: 'GraphQL', used: [], note: 'Part of the API toolkit.' },
    ],
  },
  {
    key: 'platforms',
    label: 'Auth & Platforms',
    items: [
      { name: 'Keycloak', used: ['keycloak'], note: 'Led multitenancy, custom themes and role-based access control.' },
      { name: 'Form.io', used: ['awgment'], note: 'Custom forms, integrations and workflows during the internship.' },
    ],
  },
  {
    key: 'testing',
    label: 'Testing',
    items: [
      { name: 'Jest', used: [], note: 'Unit testing for JavaScript and React code.' },
      { name: 'React Testing Library', used: [], note: 'Testing components the way users use them.' },
      { name: 'Unit Testing', used: [], note: 'Part of the everyday workflow.' },
    ],
  },
  {
    key: 'tooling',
    label: 'Tools & Infrastructure',
    items: [
      { name: 'Git', used: [], note: 'Version control for everything.' },
      { name: 'CI/CD Pipelines', used: ['4healths'], note: 'Deployments and production fixes alongside DevOps.' },
    ],
  },
];

/**
 * Projects / builds. Links are null by default — add a URL in `links`
 * and the case file will show it. Everything else comes from the resume.
 */
export const builds = [
  {
    id: '4healths',
    name: '4Healths',
    tagline: 'Four healthcare web applications, built from zero.',
    kind: 'Healthcare product suite',
    role: 'Software Engineer',
    period: 'Dec 2024 — Present',
    status: 'In production',
    live: true,
    mock: 'dashboard',
    brief:
      'Stand up four healthcare web applications from scratch — each with responsive, pixel-accurate interfaces and the core user workflows the product depends on.',
    did: [
      'Built 4 healthcare web applications from scratch using Vue.js, React and shadcn/ui.',
      'Delivered responsive, pixel-perfect UI from Figma designs.',
      'Implemented the core user workflows of the applications.',
      'Collaborated with backend, QA and DevOps teams on production fixes and deployments.',
    ],
    challenges: [
      ['Two frameworks, one product family', 'Shipping in both Vue.js and React while keeping the experience consistent across apps.'],
      ['Design fidelity at every breakpoint', 'Translating Figma frames into layouts that stay pixel-accurate as they respond.'],
      ['Production is a team sport', 'Working across backend, QA and DevOps to get fixes and deployments out safely.'],
    ],
    stack: ['Vue.js', 'React', 'shadcn/ui', 'Keycloak', 'Figma'],
    links: { github: null, live: null },
  },
  {
    id: 'keycloak',
    name: 'Keycloak Multitenancy & RBAC',
    tagline: 'Authentication designed to scale with every tenant.',
    kind: 'Identity & access',
    role: 'Lead — Software Engineer',
    period: '4Healths · Dec 2024 — Present',
    status: 'In production',
    live: true,
    mock: 'auth',
    brief:
      'Give the healthcare platform an authentication layer that scales: multiple tenants, product-matched login experiences, and access governed by roles.',
    did: [
      'Led Keycloak multitenancy for scalable authentication.',
      'Built custom Keycloak themes.',
      'Led role-based access control (RBAC).',
    ],
    challenges: [
      ['Tenancy is architecture', 'Multitenancy shapes how every app authenticates — it has to be designed, not bolted on.'],
      ['Auth that looks like the product', 'Custom themes so the login experience belongs to the application, not the identity provider.'],
      ['Roles over special cases', 'RBAC so access rules live in one model instead of scattered across screens.'],
    ],
    stack: ['Keycloak', 'RBAC', 'Multitenancy', 'Custom themes'],
    links: { github: null, live: null },
  },
  {
    id: 'channel360',
    name: 'Channel360',
    tagline: 'A web application for insurance agents.',
    kind: 'Insurance · agent platform',
    role: 'Associate Software Engineer',
    period: 'Jan 2024 — Dec 2024',
    status: 'Shipped & maintained',
    mock: 'agent',
    brief:
      'Give insurance agents a web application that fits how insurance actually works — screens, workflows and integrations aligned to domain requirements.',
    did: [
      'Developed and maintained the Channel360 web application using React and JavaScript.',
      'Implemented core UI screens and business workflows.',
      'Built integrations aligned with insurance domain requirements.',
    ],
    challenges: [
      ['Domain first', 'Insurance workflows have rules — the UI has to encode them, not approximate them.'],
      ['Develop and maintain', 'Building new screens while keeping an application in active use stable.'],
    ],
    stack: ['React', 'JavaScript', 'Node.js'],
    links: { github: null, live: null },
  },
  {
    id: 'paisaplan',
    name: 'Paisaplan',
    tagline: 'A digital insurance platform.',
    kind: 'Insurance · consumer platform',
    role: 'Associate Software Engineer',
    period: 'Jan 2024 — Dec 2024',
    status: 'Shipped & maintained',
    mock: 'policy',
    brief:
      'Bring insurance online as a digital platform, with UI screens and business workflows that match insurance domain requirements.',
    did: [
      'Developed and maintained the Paisaplan platform using React and JavaScript.',
      'Implemented core UI screens, business workflows and integrations.',
    ],
    challenges: [
      ['Complex products, clear screens', 'Turning insurance domain requirements into flows people can follow.'],
      ['Shared foundations', 'Built in the same period and stack as Channel360 — and part of the same runtime upgrade.'],
    ],
    stack: ['React', 'JavaScript', 'Node.js'],
    links: { github: null, live: null },
  },
  {
    id: 'node-upgrade',
    name: 'Node.js v14 → v20',
    tagline: 'Moving the runtime forward six major versions.',
    kind: 'Platform engineering',
    role: 'Lead — Associate Software Engineer',
    period: '2024',
    status: 'Completed',
    mock: 'upgrade',
    brief:
      'The applications were running on Node.js v14. Upgrade to v20 without breaking them — and come out more stable than before.',
    did: [
      'Led the Node.js upgrade from v14 to v20.',
      'Resolved the compatibility issues the upgrade surfaced.',
      'Improved application stability and performance.',
    ],
    challenges: [
      ['Six majors in one move', 'Compatibility issues across a large version gap had to be found and resolved.'],
      ['Stability is the deliverable', 'The goal was not a new version number, it was a steadier, faster application.'],
    ],
    stack: ['Node.js', 'JavaScript', 'React'],
    links: { github: null, live: null },
  },
  {
    id: 'awgment',
    name: 'Awgment × Form.io',
    tagline: 'Making the next application faster to start.',
    kind: 'In-house platform',
    role: 'Software Engineer Intern',
    period: 'Aug 2023 — Dec 2023',
    status: 'Contributed',
    mock: 'forms',
    brief:
      'Awgment is Techsophy’s in-house platform. The goal: improve it so teams could set up applications faster instead of building from scratch.',
    did: [
      'Worked extensively with Form.io — custom forms, integrations and workflows.',
      'Contributed to Awgment’s user management and workflow enhancements.',
      'Helped improve Awgment to enable faster application setup instead of building from scratch.',
      'Built and enhanced UI components for internal enterprise tools.',
    ],
    challenges: [
      ['Platforms over one-offs', 'Work that pays off every time a new application is set up.'],
      ['Forms as a system', 'Custom Form.io forms wired into integrations and workflows, not standalone pages.'],
    ],
    stack: ['Form.io', 'Awgment', 'JavaScript'],
    links: { github: null, live: null },
  },
];

export const experience = [
  {
    version: 'v2.0.0',
    short: 'Engineer',
    role: 'Software Engineer',
    team: '4Healths',
    company: 'Techsophy',
    location: 'Hyderabad',
    start: '2024-12',
    end: null,
    range: 'Dec 2024 — Present',
    env: 'production',
    stack: ['Vue.js', 'React', 'shadcn/ui', 'Keycloak', 'Figma'],
    changes: [
      ['feat', 'Built 4 healthcare web applications from scratch using Vue.js, React and shadcn/ui.'],
      ['auth', 'Led Keycloak multitenancy, custom themes and RBAC for scalable authentication.'],
      ['ui', 'Delivered responsive, pixel-perfect UI from Figma designs and implemented core user workflows.'],
      ['ops', 'Collaborated with backend, QA and DevOps teams on production fixes and deployments.'],
    ],
  },
  {
    version: 'v1.0.0',
    short: 'Associate',
    role: 'Associate Software Engineer',
    team: 'Channel360, Paisaplan',
    company: 'Techsophy',
    location: 'Hyderabad',
    start: '2024-01',
    end: '2024-12',
    range: 'Jan 2024 — Dec 2024',
    env: 'stable',
    stack: ['React', 'JavaScript', 'Node.js'],
    changes: [
      ['feat', 'Developed and maintained web applications for insurance agents (Channel360) and a digital insurance platform (Paisaplan) using React and JavaScript.'],
      ['perf', 'Led the Node.js upgrade from v14 to v20, resolving compatibility issues and improving application stability and performance.'],
      ['ui', 'Implemented core UI screens, business workflows and integrations aligned with insurance domain requirements.'],
    ],
  },
  {
    version: 'v0.1.0',
    short: 'Intern',
    role: 'Software Engineer Intern',
    team: 'Enterprise tools · Awgment',
    company: 'Techsophy',
    location: 'Hyderabad',
    start: '2023-08',
    end: '2023-12',
    range: 'Aug 2023 — Dec 2023',
    env: 'preview',
    stack: ['Form.io', 'Awgment', 'JavaScript'],
    changes: [
      ['ui', 'Built and enhanced UI components for internal enterprise tools.'],
      ['feat', 'Worked extensively with Form.io — custom forms, integrations and workflows.'],
      ['feat', 'Contributed to Awgment (in-house platform) for user management and workflow enhancements.'],
      ['perf', 'Improved Awgment to enable faster application setup instead of building from scratch.'],
    ],
  },
];

export const philosophy = {
  manifesto:
    'A screen isn’t done when it looks right. It’s done when it matches the design at every breakpoint, holds up for every tenant and every role, runs on a runtime that isn’t years behind, and leaves the next engineer a platform instead of a puzzle.',
  rules: [
    { key: 'design_fidelity', value: '"pixel-perfect is a spec, not a suggestion"', evidence: 'Responsive, pixel-perfect UI from Figma designs at 4Healths.' },
    { key: 'understand_the_system', value: 'true', evidence: 'Led Keycloak multitenancy and RBAC instead of patching access screen by screen.' },
    { key: 'fix_the_foundation', value: '"before the symptoms"', evidence: 'Led the Node.js v14 → v20 upgrade for stability and performance.' },
    { key: 'build_platforms', value: '"make the next app faster to start"', evidence: 'Improved Awgment so applications could be set up instead of built from scratch.' },
    { key: 'ship_together', value: '["backend", "qa", "devops"]', evidence: 'Production fixes and deployments, side by side with every team.' },
    { key: 'keep_learning', value: '"chemical → software engineering"', evidence: 'Hackathons and coding sprints from 2019 through 2024.' },
  ],
};
