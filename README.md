# Pixels in. Production out.

[![Deploy to GitHub Pages](https://github.com/De-Vin/vinay-portfolio/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/De-Vin/vinay-portfolio/actions/workflows/deploy-pages.yml)
![React 19](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=white)
![Vite 7](https://img.shields.io/badge/Vite-7-646cff?logo=vite&logoColor=white)
![Node 24+](https://img.shields.io/badge/Node-24%2B-339933?logo=node.js&logoColor=white)

The portfolio of **Vinay Avvaru**, Software Engineer based in Hyderabad, India. It's built with React 19 and Vite 7, uses no UI framework and no templates, and has just two runtime dependencies (`react`, `react-dom`).

**Live site:** https://de-vin.github.io/vinay-portfolio/ (deployed by GitHub Actions on every push to `main`)

![Hero](public/og-image.png)

## About me

I'm a front-end-focused software engineer who turns Figma designs into production web applications. I currently build the 4Healths suite of healthcare apps, and previously worked on the insurance platforms (Channel360, Paisaplan). I started out in Chemical Engineering before switching to software.

- **Core stack:** React, Vue.js, JavaScript, TypeScript, HTML/CSS, shadcn/ui, Material UI
- **Also:** Node.js, REST & GraphQL, Keycloak, Form.io, Jest, React Testing Library, Git, CI/CD
- **Resume:** [Vinay_Avvaru_Software_Engineer.pdf](public/resume/Vinay_Avvaru_Software_Engineer.pdf)
- **Find me:** [GitHub](https://github.com/De-Vin) · [LinkedIn](https://www.linkedin.com/in/vinay-avvaru) · [saivinai9050@gmail.com](mailto:saivinai9050@gmail.com)

### Featured work

| Project | What it is | Role | Period |
|---|---|---|---|
| **4Healths** | Four healthcare web apps built from scratch (Vue.js, React, shadcn/ui) | Software Engineer | Dec 2024 – Present |
| **Keycloak Multitenancy & RBAC** | Multi-tenant auth, custom Keycloak themes and role-based access control | Lead | Dec 2024 – Present |
| **Channel360** | Web application for insurance agents (React, JavaScript) | Associate Software Engineer | Jan – Dec 2024 |
| **Paisaplan** | Digital insurance platform (React, JavaScript) | Associate Software Engineer | Jan – Dec 2024 |
| **Node.js v14 → v20** | Runtime upgrade across six major versions, resolving compatibility issues | Lead | 2024 |
| **Awgment × Form.io** | Custom forms, workflows and user management for an in-house platform | Software Engineer Intern | Aug – Dec 2023 |

These are company projects, so their source isn't public. The full case files are on the site.

---

## The concept

The whole site plays out as a CI/CD pipeline run. Each section is a stage of a build, and the build is Vinay:

| Stage | Command | Section |
|---|---|---|
| `01 init` | `git clone vinay-avvaru` | Hero: a design-tool canvas with rulers, crosshair guides and a selected Figma frame (*Pixels in.*) that ships (*Production out.*, `● deployed · main`) |
| `02 log` | `git log --graph --reverse` | Engineering story as a git graph. `main` is the career, `edu` is education, `side` is hackathons, talks and leadership. `checkout -b software-engineering` marks the move from Chemical Engineering into software |
| `03 deps` | `npm ls --depth=0` | Skills as an interactive `package.json`. Each dependency shows the products it shipped in. No skill bars, no self-ratings |
| `04 build` | `npm run build` | Projects as "release artifacts". Each opens a case file with the brief, contribution, challenges, stack and links |
| `05 deploy` | `kubectl rollout history` | Experience as versioned releases (`v0.1.0` → `v2.0.0`) with conventional-commit changelogs |
| `06 config` | `cat .engineeringrc` | Philosophy: a manifesto that lights up as you scroll, plus rules where each one cites real evidence |
| `07 ship` | `gh pr create` | Contact: the enquiry form is styled as opening a pull request |

The top bar is a live pipeline. The stage you're reading is `running` and earlier stages turn `passed`. Each stage keeps its own timer.

**Extras**
- **Boot sequence.** A terminal "build" plays once per browser session. Press any key to skip it. It's skipped automatically when the visitor prefers reduced motion.
- **Command palette.** Open it with `⌘K` / `Ctrl K` (or `/`). It can jump to stages, open case files, copy the email address, download the resume and toggle inspect mode.
- **Inspect mode.** Press `I` or the top-bar button, then hover anything to see its element, class and rendered size, DevTools-style.
- **Deep links.** `/#build/keycloak` opens that case file directly.

**Design system** (`src/styles/tokens.css`)
- Palette: graphite ink `#0b0c0e` and warm paper `#ece7de`, plus signal vermilion `#ff5a2b` for build/action, pass green `#6fe3a5` and design-tool selection blue `#4f8cff`.
- Type: **Bricolage Grotesque** for display, **Instrument Serif** italic for accent words and **JetBrains Mono** for system text.
- Motion: masked letter/word reveals, staggered scroll reveals, a scroll-lit manifesto and a cursor-reactive dot field. Everything respects `prefers-reduced-motion`.

---

## Run it locally

Requires **Node 24+** (pinned in `.nvmrc`).

```bash
git clone https://github.com/De-Vin/vinay-portfolio.git
cd vinay-portfolio
nvm use
npm install
npm run dev        # http://localhost:5173
```

`npm run build` writes the static site to `dist/`, and `npm run preview` serves that build locally.

---

## Editing content

**All copy lives in [`src/data/content.js`](src/data/content.js), and the resume is its source of truth.** Sections render from this file, so you rarely need to touch components.

- **Project links.** Each build has `links: { github: null, live: null }`. Add a URL and the case file shows a "Live demo" or "Source" button. While both are `null`, the case file says the work is private to the company.
- **Skills.** `skills[].items[].used` lists build ids (`'4healths'`, `'channel360'`, …), which become the "shipped in →" chips.
- **Personal details and links.** These live in [`src/config.js`](src/config.js). Set `showPhone: true` to list your phone number.
- **Resume.** Replace `public/resume/Vinay_Avvaru_Software_Engineer.pdf` (keep the name, or update `config.links.resume`).

---

## Contact form (EmailJS)

The enquiry form sends email through [EmailJS](https://www.emailjs.com), called directly with `fetch` (no SDK). It asks for name, email, an optional **mobile number** with a country-code selector, subject and message. If a mobile number is given, it is appended to the message as `Contact me at +91 79939 56446`.

### Setup

1. In EmailJS, add an **Email Service** (e.g. Gmail) and copy its **Service ID**.
2. Create an **Email Template** and copy its **Template ID**. Use these variables:
   - To Email: `saivinai9050@gmail.com`
   - Subject: `[Portfolio] {{subject}}`
   - Body: `From: {{from_name}} ({{reply_to}})` followed by `{{message}}`
   - Reply To: `{{reply_to}}`
3. Copy the **Public Key** from **Account → General**.
4. Create a `.env` in the project root (it's gitignored; see [`.env.example`](.env.example)) and restart `npm run dev`:
   ```
   VITE_CONTACT_PROVIDER=emailjs
   VITE_EMAILJS_SERVICE_ID=service_xxx
   VITE_EMAILJS_TEMPLATE_ID=template_xxx
   VITE_EMAILJS_PUBLIC_KEY=xxxxxxxx
   ```
5. Recommended: under **Account → Security**, restrict requests to the site's domain.

These values are **public by design**: they ship to every visitor's browser. Abuse protection comes from the domain restriction and the form's hidden honeypot field.

If any EmailJS value is missing, the form falls back to **mailto**: it opens the visitor's email app with the message prefilled.

**Form behaviour:** inline validation (on blur and on submit) with focus moved to the first invalid field, a "Running checks…" loading state, a 15-second timeout, and an error message that keeps what was typed and offers a prefilled mailto link. Status messages use `aria-live`.

---

## Deploying (GitHub Pages)

The site deploys to **https://de-vin.github.io/vinay-portfolio/** through [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) on every push to `main`.

1. **Settings → Pages → Source:** choose **GitHub Actions**.
2. **Settings → Secrets and variables → Actions → Variables:** add `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID` and `VITE_EMAILJS_PUBLIC_KEY`.
3. Push to `main`, or run the workflow manually. It builds with `BASE_PATH=/vinay-portfolio/`; change that to `/` if you add a custom domain.

The build is a static `dist/` folder, so any other static host also works with the same `VITE_…` variables.

### Before going live
- [ ] Replace the placeholder `https://vinay-avvaru.dev` with the real URL in `src/config.js`, `index.html` (canonical, Open Graph, JSON-LD), `public/robots.txt` and `public/sitemap.xml`.
- [ ] Add the EmailJS variables and send yourself a test enquiry.
- [ ] Add live or GitHub links to any projects that have public versions.

---

## Project structure

```
src/
  config.js              ← links, email, EmailJS keys (from .env)
  data/content.js        ← every word on the site, from the resume
  data/countries.js      ← country calling codes for the mobile field
  context/UIContext.jsx  ← stage tracking, case file, palette, inspect, toast
  hooks/                 ← reveal observer, stage tracker, focus trap, magnetic, clock
  lib/                   ← mailer (EmailJS, mailto fallback), utils
  components/            ← Boot, TopBar, CommandPalette, CaseDrawer, Inspector, Mock (SVG sketches), SplitText…
  sections/              ← Hero (+ HeroField canvas), Story, Arsenal, Builds, Deploys, Philosophy, Contact
  styles/                ← tokens, base, chrome (site UI), sections
public/                  ← resume PDF, favicon, OG image, robots, sitemap
```

## Quality notes

- **Performance.** There's one shared `IntersectionObserver` for every reveal. The hero canvas only redraws while the pointer moves and only while it's visible, and its pixel ratio is capped at 2. Scroll handlers are throttled with `requestAnimationFrame`. Animations use `transform`/`opacity` only. The production JS bundle is about 94 KB gzipped.
- **Accessibility.** The site has semantic landmarks and a skip link. Dialogs (case file, palette) trap focus, close with Esc and return focus to what opened them. Everything works from the keyboard. Split-text headings expose their plain text to screen readers. Under `prefers-reduced-motion`, all motion is disabled and the boot sequence is skipped.
- **SEO.** The page has a title and description, canonical URL, Open Graph and Twitter cards, `Person` JSON-LD, robots.txt, a sitemap and a `<noscript>` summary.
- **Responsive.** Tested at 390, 1024, 1200 and 1440 px wide with no horizontal overflow. On phones, the pipeline collapses to dots, the case-file previews appear inline, and the cursor-only effects turn off.

---

## License & contact

© Vinay Avvaru. The code is here for reference; please don't republish the content, resume or design as your own.

Questions or opportunities? Email [saivinai9050@gmail.com](mailto:saivinai9050@gmail.com) or reach out on [LinkedIn](https://www.linkedin.com/in/vinay-avvaru).
