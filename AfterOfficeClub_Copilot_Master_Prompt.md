# AFTEROFFICECLUB — MASTER BUILD PROMPT FOR VS CODE + GITHUB COPILOT AGENT

> **How to use:** Open the intended project folder in VS Code, switch Copilot Chat to **Agent** mode, then paste this entire document into one request. Let the agent work in phases, keeping `IMPLEMENTATION_STATUS.md` updated so work can resume if the session or context limit ends. This is a build specification, not a guarantee that code can be production-launched without configuring services, reviewing security, and running the supplied tests.

---

## 0. YOUR ROLE, WORKING STYLE, AND NON-NEGOTIABLES

Act as a principal product engineer, design director, accessibility specialist, application-security engineer, test engineer, content strategist, and pragmatic startup CTO working together on **AfterOfficeClub**. Build a distinctive, exceptionally polished, usable first release—not a generic SaaS landing-page template.

### Work autonomously

- Do not ask me questions or pause for approval on routine product decisions. Inspect the existing repository, infer reasonable defaults, record meaningful decisions in `docs/DECISIONS.md`, and continue.
- Work in the actual workspace. Do not merely describe what should be built, give snippets, create a plan and stop, or claim that work is complete without implementing it.
- Work incrementally in phases. After each meaningful phase, update `IMPLEMENTATION_STATUS.md` with files changed, commands run, test outcomes, remaining blockers and the next concrete task. If the conversation or context ends, a future agent must be able to continue from that file.
- Prefer a small number of coherent, maintainable systems over a large number of disconnected features. Do not create microservices, a custom AI model, a payments system, or a chat platform unless there is an evidenced need.
- Reuse existing project conventions when they are sound. If the workspace contains an app, preserve unrelated user work, inspect `git status`, and do not overwrite or delete changes you did not create. If the workspace is empty, initialize a clean project.
- Use currently supported, patched releases compatible with one another. Before choosing or upgrading the framework, check the official release/support information and security advisories, especially the official Next.js advisories. Do not assume `latest` is safe just because its name says latest. Pin dependencies with the existing package manager lockfile and use reproducible installs.
- Prefer free/open-source libraries and tools with suitable licenses. Check package provenance, maintainers, known vulnerabilities, and licenses before adding dependencies. Avoid paid-only services and external dependencies unless optional and clearly documented.
- Do not use fake features, dead buttons, placeholder links that look real, fabricated community size, invented testimonials, fictitious speakers, fake verification badges, fabricated job/referral listings, unsupported salary claims, or claims of guaranteed outcomes.
- Never claim an action succeeded unless it actually succeeded. Never report a test as passing unless it was run and passed. Mark any test that could not run as **NOT RUN** and state why.
- Use good judgment. Do not run destructive commands against data outside this project, delete the repository, erase user work, expose secrets, or change global computer security settings. Never push, publish, purchase a domain, deploy publicly, contact real people, or send real messages on my behalf.
- Do not leave the core app full of TODOs, empty components, `href="#"`, `console.log`, `any`, ignored lint rules, swallowed errors, fake API functions, or hard-coded pretend success. A documented integration boundary is acceptable when credentials or an external account are genuinely required.
- Avoid needless dependency installation. Make every dependency earn its place.

### Required persistent project documents

Create and maintain:

- `README.md` — setup, run, test, build, deployment, troubleshooting, environment variables and feature-mode behavior.
- `IMPLEMENTATION_STATUS.md` — phase checklist, commands and actual pass/fail results, blockers, next step.
- `docs/PRODUCT_SPEC.md` — product promise, audiences, routes, features and acceptance criteria.
- `docs/ARCHITECTURE.md` — components, data flow, storage, trust boundaries and deployment model.
- `docs/DATA_MODEL.md` — data entities, relationships, lifecycle and access rules.
- `docs/SECURITY.md` — threat model, authentication, authorization, environment variables, security headers, abuse controls and operational limitations.
- `docs/TEST_PLAN.md` — unit, integration, end-to-end, accessibility, responsive and manual release tests.
- `docs/CONTENT_POLICY.md` — firsthand experience vs sourced facts vs opinions, verification labels, recording consent, correction and moderation practices.
- `docs/DECISIONS.md` — concise architecture/product decisions and why they were taken.
- `.env.example` — every configuration variable with comments, no real secrets.
- `.github/copilot-instructions.md` — concise durable instructions for future Copilot work, including the stack, commands, standards, architecture and safety rules.
- `.github/workflows/ci.yml` — automated quality checks on pushes and pull requests, adapted to the chosen package manager and tested commands.

Do not falsely claim that these documents replace a security review or legal review.

---

## 1. PRODUCT VISION

### Name
**AfterOfficeClub**

### Primary tagline
**Real work. Real people. No guesswork.**

### Brand promise
AfterOfficeClub helps students, early-career professionals, job seekers and aspiring founders understand how jobs and businesses work in real life—by learning from people with firsthand experience, asking practical questions, and turning what they learn into their next action.

### Core insight
A job description, search result or AI answer can describe a role, but a working professional can explain the real context: what a normal day looks like, what is difficult, which skills are actually used, what interviews felt like, what surprised them, what they would learn first, and what varies between companies. The platform must preserve the difference between personal experience, widely corroborated patterns, opinion and official information.

### Who it serves
1. **Students before graduation:** explore career options before committing to a preparation path.
2. **Freshers and job changers:** understand actual role expectations, preparation and interview stages.
3. **Working professionals:** learn adjacent roles, exchange practical knowledge and find peers.
4. **People exploring a business:** learn from founders and operators about customers, operations and local processes.
5. **Professionals willing to contribute:** share experience without having to perform as influencers or give a polished keynote.
6. **Colleges and communities:** organize practical, honest career conversations and keep the knowledge available afterward.

### Product thesis
Build a searchable, growing library of **firsthand work experience**, connected to roles, skills, projects, learning paths, questions, sessions, contributors and real opportunities. Live conversations are the source; durable, searchable, reviewed knowledge is the product.

### Positioning
Not another job board. Not a course catalog. Not a generic AI chatbot. Not a public popularity contest. It is the conversation before the course, before the job application, and before the costly career decision.

### Brand voice
Warm, thoughtful, direct, curious, non-judgmental and grounded. Use everyday English with short sentences. Speak to students without talking down to them. Avoid startup-bro language, exaggerated claims, fake urgency, motivational clichés and empty corporate jargon.

### Original brand copy to use selectively
- “A job title tells you what it’s called. A real conversation tells you what it’s like.”
- “Before you spend six months preparing, spend an hour understanding the work.”
- “The work behind the job title.”
- “Not another course catalog. The conversation before the course.”
- “Every useful skill has a real-world context. Let’s find it.”
- “No guru theatre. No guaranteed-job claims. Just people who do the work.”

These are original brand lines, not quotations attributed to real people. Never invent testimonials or put an anonymous quote in quotation marks in a way that implies it came from a real community member.

### India-first, not India-only
Use India-friendly wording, default display timezone `Asia/Kolkata`, support INR where a currency is genuinely needed, and avoid assumptions that every visitor is Indian. Do not make unverified claims about Indian legal, government, employment or licensing procedures. For government/business guides, clearly distinguish official links from a contributor’s personal experience and show the location and date to which it applies.

---

## 2. THE DESIGN BAR

The website must feel like a thoughtful editorial publication and an unusually useful professional community—not like a copied template, a generic AI landing page, a webinar marketplace or a noisy social feed. Aim for the clarity, consistency, polish and navigation quality associated with excellent modern product websites, while creating an original visual identity. Study public design patterns for inspiration; do not copy another company’s proprietary branding, source code, illustrations, or exact layouts.

### Art direction
- **Visual concept:** “the work behind the title”—editorial typography plus visual systems showing how a role connects to tasks, skills, tools, people and next steps.
- **Canvas:** warm ivory/light neutral content surface, deep ink/navy text, a near-black editorial hero or feature section, and one sharp, accessible acid-lime/chartreuse accent. Use a restrained secondary muted slate/blue-grey only for supporting elements. Store colors in design tokens and verify contrast; do not rely on color alone to convey state.
- **Typography:** choose no more than two open-license font families. Self-host through an appropriate Next.js font mechanism or local font package so text does not depend on third-party font requests at runtime. A strong editorial display face plus a highly readable text face is acceptable. Verify licensing and use sensible system fallbacks.
- **Layout:** generous whitespace, a disciplined 8-point spacing scale, strong alignment, meaningful negative space, responsive grids and a maximum comfortable reading width. Prefer asymmetric editorial composition where useful, but maintain consistency.
- **Visuals:** create original CSS/SVG illustrations for a role map, timeline or knowledge network where appropriate. Use real photos only when the asset is local, properly licensed and meaningfully improves the page. No broken remote image URLs, random emojis as the main visual identity, fake headshots, or low-quality stock-photo collage.
- **Icons:** use a consistent icon set such as Lucide. Decorative icons should not replace readable labels.
- **Motion:** subtle, purposeful and short; use CSS where possible. Respect `prefers-reduced-motion`. Never make content depend on animation, forced scrolling or cursor effects. No heavy parallax, autoplay audio/video, or permanent distracting animation.
- **States:** design loading, empty, error, disabled, success, offline/network failure, no search results, and not-configured states—not only the ideal loaded view.
- **Theme:** the core brand may combine a dark editorial hero with light reading surfaces. If adding a theme switch, it must work and persist accessibly; do not add a decorative toggle.

### Responsive behavior
Test actual layout and interactions at minimum widths of **320, 360, 390, 430, 768, 1024, 1280, 1440 and 1920 CSS pixels**. Check a narrow phone, a typical phone, tablet portrait/landscape, a smaller laptop and a wide monitor. No horizontal page overflow. No clipped buttons, overlapping nav, tiny tap targets, hidden form labels or modal overflow. Use fluid typography (`clamp` where suitable), flexible layouts and content-based breakpoints rather than only fixed device widths. Check browser zoom/reflow equivalent to 200% and long text.

### Accessibility bar
Target **WCAG 2.2 AA** as a practical standard. Include semantic landmarks and headings, correct form labels, visible keyboard focus, logical tab order, skip link, accessible mobile navigation, sufficient color contrast, alt text for meaningful images, decorative image hiding, useful validation text, reduced-motion support, accessible dialog behavior, and status messages announced to assistive technology. Use `aria-*` only when native HTML is not sufficient. Do not make accessibility a last-minute overlay.

### Interaction standards
- Every visible button/link must have a meaningful working action or be visibly disabled with a clear reason.
- Do not use buttons for navigation when an actual link is appropriate.
- Provide helpful hover, focus, active, selected, loading and disabled states.
- Touch targets should generally be at least 44 by 44 CSS pixels.
- Forms need inline validation, server-side validation, safe error handling, loading states, prevention of duplicate submits and clear success/error feedback.
- Confirm destructive admin actions. Provide undo only where genuinely supported.
- External links opening new tabs must use safe `rel` attributes.
- Navigation should work with keyboard and touch; do not trap focus.

---

## 3. THE HOMEPAGE — EXACT CREATIVE DIRECTION

The first viewport must communicate the purpose immediately. It should be memorable, calm, human and visually distinct, while still being understandable in a few seconds.

### Header
- Wordmark: **AfterOfficeClub** with a small original mark suggesting connected conversations / a knowledge path. Prefer a simple custom SVG/typographic mark over an over-designed logo.
- Desktop navigation: Explore roles, Live sessions, Knowledge library, Community, For speakers.
- Primary nav CTA: “Join the community”.
- Mobile: accessible menu button, clear expanded state, close on Escape, close after navigation, body scrolling handled correctly. Avoid a giant overlay that feels like an app install screen.
- The header may become compact/sticky after scrolling only if it does not obscure content or create layout shifts.

### Hero
Use this headline exactly unless an existing brand decision argues strongly for a clear improvement:

**The work behind the job title.**

Supporting copy:

“Learn how careers and businesses actually work—from people doing the work. Ask better questions, understand the reality, and choose your next step with more confidence.”

Primary CTA: **Explore career realities** → `/explore`

Secondary CTA: **Find a live conversation** → `/sessions`

One short trust-oriented line below: “Firsthand experience, clearly labelled. Practical answers, kept searchable.”

Create a striking original visual next to the hero copy: a composed set of editorial cards / connected role nodes, showing “day-to-day work”, “skills in practice”, “what surprised me”, and “your next step”. It should resemble a beautifully art-directed knowledge map, not a fabricated real testimonial or dashboard full of fake numbers. It must collapse gracefully on mobile and remain readable. Do not place large walls of copy or the entire navigation inside the hero.

### Homepage sections, in this order
1. **Question-led discovery:** show useful starter questions such as “What does a data analyst actually do?”, “How much coding does this role involve?”, “What should I know before choosing DevOps?”, “What is the first step to testing a business idea?” Make each lead to a real relevant role/search state. Do not claim these are the most searched questions unless reliable analytics support it.
2. **Explore career realities:** role/category cards for Software Engineering, AI Applications, Data & BI, QA & Testing, Cloud & DevOps, Cybersecurity, Product & Business Analysis, Design & Research, Sales & Customer Success, Business Operations, Entrepreneurship, and Small-Business Operations. Use role content data rather than hard-coding markup for each card.
3. **What you get here:** “Understand the work”, “Prepare with context”, “Learn from different paths”, “Turn knowledge into action”—short, concrete supporting explanations.
4. **How a session becomes knowledge:** ask → meet a practitioner → capture the experience → review and structure it → publish a searchable guide. Build this as an elegant step flow.
5. **Next live conversations:** render only actual published sessions. If none exist, show a designed honest empty state such as “The next conversation is being planned. Tell us which role you want to explore.” Link to topic suggestions / join form. Do not invent a speaker, time, venue or booking status.
6. **From the library:** show published and approved guides with role tags, type, updated date and evidence status. Do not label general editorial guidance as firsthand experience.
7. **“I wish I had known this earlier”**: create a section for short lessons only when actual approved contributor content exists. In the initial seeded/demo dataset, use an explicit illustrative sample label or omit it—never imply a real person said it.
8. **A place for people who do the work:** invite speakers to contribute, explain that they do not need to be influencers, and set expectations around privacy and employer confidentiality.
9. **Trust is visible:** briefly explain how firsthand experience, public sources, dates, corroboration and corrections are represented.
10. **Final CTA:** “You don’t need all the answers. Start with a better conversation.” Buttons to explore or submit a topic.
11. **Footer:** clear navigation, community channels only when configured, social links only when genuine, legal/accessibility pages, contact method, current year and domain-aware metadata. No invented address, phone number or company registration.

The page should have editorial pacing: varied composition, strong hierarchy, a few carefully chosen cards, not a repetitive wall of rounded rectangles. Prioritize the first viewport while making the rest feel cohesive and finished.

---

## 4. REQUIRED ROUTES AND FUNCTIONAL SCOPE

Create the routes below with a coherent shared layout, good metadata, responsive design and useful empty/error states. Use actual Next.js App Router conventions.

### `/` — Home
Implement the homepage described above.

### `/explore` — Role and topic explorer
- Search by role title, question, skill, task, tool or topic.
- Debounce text search sensibly without harming keyboard use. Support clearing the search.
- Filter by broad field, experience level, work style/role context where the content supports it, and content availability (role guide, live session, recording, opportunity). Do not expose filters with no meaningful data.
- Sort by editorial relevance by default; optionally newest updated. Never make popularity the default when there is no reliable popularity data.
- URL query parameters should reflect shareable search/filter state where practical.
- Add useful empty states and “clear filters”.
- Every card must link to real content.

### `/roles/[slug]` — Role Reality Passport
Each role detail page must use a structured content schema and include:
- Role overview in plain English.
- “What this role actually does” and typical deliverables.
- Example week/day only when contributed or carefully labelled as a general illustrative example.
- Tasks, tools and skills, with clear distinctions between foundational knowledge and employer-specific requirements.
- “What can feel difficult”, trade-offs and common misunderstandings; avoid presenting one person’s view as universal.
- “Who might enjoy this work / what to consider” phrased as reflection prompts, not a diagnostic or guaranteed fit assessment.
- Entry paths and project ideas, not guaranteed hiring recipes.
- Interview preparation topics, labelled by source and date when based on real interview experience.
- Learning resources/courses with reason for recommendation, price/availability checked date where shown, and an obvious way to report outdated links. Do not endorse a paid course for undisclosed compensation.
- Related roles, published sessions, recordings and next actions.
- Contributor/source panel: role context, experience declaration, contribution date, review date and claim labels when available.
- Distinct labels such as **Firsthand account**, **Corroborated by multiple contributors**, **Public source**, **Editorial summary**, **Opinion**, and **Needs review**. Do not imply that identity or a job claim is verified unless the actual verification procedure has occurred.
- Provide a clear “Suggest a correction” action.

Create a seeded set of **8–12 useful roles** using accurate general information. Any editorial/demo-created description must be marked as a general role guide / illustrative starter guide and must not pretend to originate from a speaker. Do not fabricate quotes, salary statistics, company practices or firsthand case studies. Prefer cautious language like “varies by team and company”.

### `/sessions` — Session calendar and archive
- Tabs or filters for Upcoming, Past/recorded, and All.
- Upcoming events show only published, actually scheduled records. Display title, role/topic, date/time with timezone, speaker only if confirmed, intended audience, learning outcomes, duration, RSVP state and recording policy.
- Provide “Add to calendar” using a correct generated `.ics` file or a properly encoded calendar link. Test escaping and timezone conversion.
- Filters by role/topic and format where real data exists.
- Past recordings show only approved, publishable recordings. Clearly indicate whether a transcript and chapters are available.
- If empty, explain honestly and allow a topic request or sign-up to receive an announcement if the backend is configured.

### `/sessions/[slug]` — Session detail
- Agenda, speaker bio with approval, learning goals, date/time, attendance details, accessibility notes and recording policy.
- RSVP registration with schema validation, duplicate handling and clear status.
- Optional pre-submitted question; allow anonymous-to-the-public questions while still applying abuse controls. Do not publish email addresses.
- Show or email meeting access only using the configured/secure flow. Do not expose host credentials or private Zoom links in public page source. A public registration URL is acceptable only if intentionally configured as public.
- After a session, link to approved recording, transcript/chapter timestamps, summary, resources and related roles.
- Post-session emoji feedback: low-friction, one-tap signals for things such as practical, honest, clearer, actionable, or needs more evidence. Do not require written feedback. Keep feedback distinct from factual verification. Prevent or limit repeated votes reasonably without invasive fingerprinting. Provide a separate report/correction path.

### `/library` — Searchable knowledge library
- Search title, transcript/summary, role, skills and approved tags.
- Filters for content type (session, role guide, checklist, practical example, business/process guide), role/category, date, and evidence label when meaningful.
- Result cards must show source/type, updated date and whether the content is firsthand, editorial or public-source based.
- Highlight the matched query responsibly; escape untrusted content and avoid rendering arbitrary HTML.
- Provide a real no-results state with next steps.

### `/library/[slug]` — Knowledge item
- Accessible article typography, table of contents for long entries, related content, clear source notes and revision date.
- If a recording transcript exists, show timestamps and links to the correct approved recording; if not, do not pretend it exists.
- Include correction/report action and sharing metadata.

### `/opportunities` — Curated opportunities and referrals
- Support actual editor-approved opportunities, with role, skill tags, location/remote status, source link, posted/verified date, closing date when available and last checked date.
- Show referrals only where a contributor has explicitly opted in and the offer is real and still valid. Never imply a referral is guaranteed.
- Expire/archive stale opportunities automatically based on dates; mark status visibly and suppress expired items from “active” filters.
- If there are no opportunities, show a useful empty state and explain how the community will publish them. Never seed fake employers, company names, jobs, salaries or referral promises.
- Distinguish official application links from member-submitted leads.

### `/community` — Where the community lives
- Explain community norms, the expected participation style, how event announcements work and how to contribute.
- Render WhatsApp, Telegram, Discord and Zoom/session links only from explicit configuration or published event records. If a link is absent, do not show a broken CTA or invent an invite. Show an honest “being set up” status or offer the valid join form.
- Do not reveal members’ phone numbers, email addresses, private profiles or meeting details.
- Make clear which channel is for announcements, which is for discussion and which is for events, to avoid duplicate noisy groups.

### `/contribute` — Become a speaker / nominate someone / suggest a topic
- Explain that contributors can share real working experience without being a polished public speaker.
- Forms for speaker interest, speaker nomination, role request and session topic suggestion. Choose a minimal form per task and collect only what is necessary.
- Explicit checkbox consent before publishing a speaker bio, recording or quote. Consent to attend is not consent to record/publish.
- Validate server-side, limit message size, protect against spam and show actual submission states.

### `/about`, `/guidelines`, `/privacy`, `/terms`, `/accessibility`
- About: origin story framed around the insight that knowledge from people doing the work is often hidden, and the mission to make it reusable.
- Guidelines: respect, confidentiality, no harassment, no fake referrals, no leaking interview/company-confidential information, no spam, disclosure of commercial relationships, correction process and speaker/recording consent.
- Privacy and terms: provide careful starter copy suited to the actual product behavior, data collected, retention and third-party providers. Do not claim legal compliance or use fake addresses/representatives. Add `docs/LEGAL_REVIEW_REQUIRED.md` and mark the copy as needing owner/legal review before a real public launch.
- Accessibility page: explain how to report an accessibility barrier using a configured valid contact method. Do not invent an email address.

### `/login` and protected `/admin` area (when Supabase is configured)
Build a small but genuinely protected moderation/admin area for authorized operators to manage content. Do not attempt to build a huge CRM.

Admin capabilities:
- Create/edit/publish/unpublish roles, role guides, sessions, recording metadata, library content/resources, opportunities, speaker entries, topic submissions and reports.
- Mark whether a session is scheduled, held, recorded, consent-checked and approved for publication.
- See pending review, corrections, reports and out-of-date items.
- Validate every field on the server; show unsaved and saved states; prevent accidental deletion; log important editorial actions.
- Only database-backed authorized admin/moderator roles may perform privileged operations. Do not trust a client-provided role, editable user metadata, hidden buttons, page-level-only checks or a UI flag. Check authorization in every server action/API/data-access operation.
- If no Supabase credentials are configured, the public site still runs with demo content, and the admin feature must explain how to configure it rather than pretending to authenticate. Do not create a default admin password or expose an admin bypass.

---

## 5. INFORMATION ARCHITECTURE AND DATA MODEL

Keep content normalized enough to be maintainable, but avoid over-engineering. Use typed schemas/validation. Design the content layer so a role, session or knowledge item can be rendered consistently in cards, search results, detail pages and related-content links.

Suggested domain entities, adapted as needed:

- `profiles`: private/basic member profile data with deliberate public fields only.
- `user_roles`: authoritative role assignments such as admin/moderator/member, inaccessible for user self-promotion.
- `speakers`: public profile, claimed role/experience context, verification/review state, consent state, publication status.
- `roles`: slug, title, category, summary, entry-level notes, state and editorial timestamps.
- `role_sections` or structured role content: responsibilities, day-to-day, skills, tools, trade-offs, preparation, projects, interview topics, evidence labels.
- `skills` and role/skill relation data, if it supports real navigation and recommendations.
- `sessions`: title, slug, description, topics/role relation, start/end, timezone, status, confirmed speakers, RSVP settings, recording/consent state, safe public content, private meeting access field if needed.
- `rsvps`: session, minimal attendee fields, status and timestamps; never publish private attendee data.
- `session_questions`: question text, moderation state and whether the asker consents to public display; do not expose personal information.
- `recordings`: safe URL/provider ID, transcript/chapter references, consent/publishing state and approval metadata.
- `knowledge_items`: type, slug, body/structured blocks, source references, contributor links, evidence label, review date, publication state and tags.
- `resources`: title, type, URL, who it suits, rationale, free/paid status only if checked, availability-check date.
- `opportunities`: real source, eligibility/role/location, post/check/expiry times, referral consent where applicable, publication/moderation status.
- `suggestions`/`contribution_submissions`: minimal validated incoming forms, spam state, moderation state and retention controls.
- `feedback_votes`: one-tap session signals without public display of individual identities.
- `reports`/`corrections`: type, content reference, reason, triage state, resolution and timestamps.
- `audit_log`: essential privileged content and moderation actions, with no secrets or unnecessary personal data.

Use stable IDs/slugs, indexes for common lookups, constraints against duplicate RSVPs/votes where appropriate, valid foreign keys, timestamps in UTC and clear display timezone conversion. Migrations must be committed and repeatable. Include seed data only for clearly non-deceptive editorial starter content. Public queries must only return published, approved records.

---

## 6. TECHNICAL ARCHITECTURE

### Default stack, subject to security/support verification

- Next.js App Router with the currently supported, patched stable version; React and TypeScript compatible with that version.
- TypeScript strict mode. Avoid `any`; type external values as `unknown` until validated.
- Tailwind CSS, using the currently supported version appropriate to the project.
- shadcn/ui and its accessible primitives only where useful. Customize the design substantially; do not display untouched default shadcn demo screens as the product.
- Lucide icons or a consistent maintained open-source equivalent.
- Zod (or a comparable maintained schema library) for runtime validation of forms, environment and external/server data.
- Vitest and Testing Library for unit/component tests where suitable.
- Playwright for browser-level end-to-end and responsive checks.
- axe-core integration for automated accessibility checks.
- Supabase PostgreSQL/Auth only as an optional production backend, using the current official Next.js SSR recommendations and publishable key conventions.
- GitHub Actions CI, npm (unless the existing repository uses a different package manager), and current supported Node.js LTS.

Do not blindly force the stack into an existing healthy repository. If a comparable secure tool is already installed and appropriate, reuse it. Explain deviations in `docs/DECISIONS.md`.

### Project organization
Use a predictable separation such as:

- `src/app/` routes/layouts/error/loading/not-found/route handlers.
- `src/components/` shared navigation, footer, cards, form primitives, states and editorial UI.
- `src/features/` role explorer, sessions, library, opportunities, contribution forms, moderation.
- `src/content/` typed editorial/demo seed content.
- `src/lib/` data access, validation, URL safety, date/time, metadata, errors and utilities.
- `src/lib/supabase/` browser/server clients and server-only access helpers, if configured.
- `src/styles/` tokens and global styles as useful.
- `supabase/migrations/` schema/policies/functions and safe seeds if Supabase is chosen.
- `tests/` unit/integration/e2e helpers and fixtures.
- `public/` local assets and icons.

Structure need not match exactly if the existing codebase uses a better coherent structure. Do not create dozens of tiny files without a useful boundary.

### Server/client boundaries
- Default to Server Components for static/read-only rendering; use Client Components only when interaction is needed.
- Keep privileged access, secrets and authorization checks server-side. Mark secret-using modules appropriately server-only. Never import privileged environment variables into client bundles.
- Use parameterized database queries and schema validation. Never build SQL by concatenating untrusted input.
- If using Next.js Server Actions or route handlers, repeat authentication/authorization and input validation inside every privileged operation. A protected layout alone is insufficient.
- Return minimal data from server to client. Do not accidentally serialize tokens, private meeting URLs, attendee emails or admin metadata into page props, logs, RSC payloads or public JSON.

### Production/development modes
Support three clear states:
1. **Static/editorial mode:** app can build and run without external credentials using typed non-deceptive starter content.
2. **Demo mode:** visible forms explain that submissions are not transmitted/persisted unless the backend is configured. Never show a fake successful submission. Do not save sensitive information to browser localStorage as a substitute for a real backend.
3. **Configured production mode:** real form persistence and admin functions operate via the configured backend, with access policies and tests. Fail closed for operations requiring a backend.

Define an explicit, documented mode; do not silently swallow backend errors and fall back to fake success. A public read of published content may use a graceful cache/fallback where safe, but label stale/demo content clearly and log/observe the failure without leaking private data.

### Environment variables
Create `.env.example` with comments. Only browser-safe values may use `NEXT_PUBLIC_`. The exact names should follow current official provider guidance; likely examples include:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_SECRET_KEY` (server only, optional, never exposed to the client)
- `NEXT_PUBLIC_WHATSAPP_COMMUNITY_URL`
- `NEXT_PUBLIC_TELEGRAM_CHANNEL_URL`
- `NEXT_PUBLIC_DISCORD_INVITE_URL`
- `NEXT_PUBLIC_PUBLIC_EVENT_REGISTRATION_URL` only if there really is a public registration link
- Optional email/analytics provider variables only if implemented and documented.

Validate environment variables at startup/build for the selected mode; errors must name the missing variable without printing its value. Do not invent real social invite links or place secrets in Git. Add `.env*` ignore rules as appropriate while explicitly allowing `.env.example`.

### Supabase and database rules, if enabled
- Follow current official Supabase Next.js SSR/auth guidance. Use safe cookie/session handling and the current recommended key names.
- Enable Row Level Security for all tables exposed through the data API. Create restrictive policies: public/anon can read only published approved public rows; private submissions/attendee data is not publicly selectable; members can access only permitted records; only authorized moderators/admins can mutate published content; self-service profile updates cannot promote privileges.
- A secret key / service-role key bypasses normal RLS safeguards. It must remain server-only, never be exposed to browser code, NEXT_PUBLIC variables, screenshots, sample data, error messages or logs. Prefer the provider's current recommended secret-key scheme where supported.
- Do not rely only on UI hiding or middleware/layout checks. Enforce authorization at each data access / mutation boundary.
- Use migrations and, when feasible, automated RLS policy tests for anon, authenticated ordinary member and admin roles.
- Public submission endpoints need server-side validation, conservative payload limits, abuse/rate controls, duplicate handling and moderation states. Add a honeypot or other low-friction spam mitigation if appropriate, but never represent honeypots as complete security.
- Minimize personal data. No advertising tracking, browser fingerprinting or public member directory by default. Document what data is collected and why, how it can be deleted, who can access it, and any third-party processing.

---

## 7. SECURITY AND PRIVACY THREAT MODEL

Use the **current OWASP Top 10** and current framework/provider security docs as a baseline. Explicitly consider broken access control, security misconfiguration, vulnerable dependencies/supply chain, cryptographic failures, injection, insecure design, authentication/session failures, data-integrity issues, logging/alerting gaps and unsafe error handling.

Required defenses:
- Validate and normalize all untrusted form input on both client and server. Enforce maximum lengths and file/type/URL restrictions.
- Encode untrusted text and never use unsafe raw HTML rendering. If rich text is required, use a vetted sanitizer and a limited content schema.
- Defend privileged state changes with correct authorization and framework-appropriate CSRF/origin controls. Avoid unsafe redirect destinations.
- Add sensible security headers including a considered Content Security Policy, `X-Content-Type-Options`, a frame-ancestors policy, an appropriate Referrer Policy and safe permissions policy. Ensure headers are compatible with the chosen hosting environment; document any CSP exceptions. Do not add a `unsafe-eval`/wide-open CSP just to hide a broken implementation.
- Use HTTPS in production. Set cookies with secure attributes through the provider/framework's supported auth implementation. Do not store authentication tokens in localStorage.
- Avoid leaking stack traces or secrets in client errors. Add useful server logs with redaction and correlation/request IDs where suitable. Do not log raw emails, question text, tokens, meeting credentials or secret values unnecessarily.
- Rate-limit public submissions, RSVP, feedback and costly endpoints. If a durable shared rate limiter needs provider config, document/configure it clearly; do not pretend in-memory limits are robust across serverless instances.
- Set request body limits and handle exceptional states safely. Do not build an open proxy or accept arbitrary remote image URLs without allowlisting.
- Use strict redirect/external-URL validation and allow only expected schemes such as HTTPS for public external links. No `javascript:` URLs.
- Scan dependencies with the current package manager audit tooling and GitHub dependency alerts where available. Investigate high/critical findings rather than hiding or suppressing them without a documented reason.
- Keep the package lockfile committed. Configure Dependabot or an equivalent safe dependency update process if suitable.
- Check the Git diff before completion. Never include secrets, `.env.local`, build caches, user data or generated artifacts accidentally.
- Do not add unneeded analytics, ad pixels or trackers. If analytics is added, make it privacy-conscious, optional/configurable and documented.

Privacy/recording rules:
- Consent to participate in a call is not consent to record or publish it.
- Store speaker/participant recording consent and publication state. Provide a visible policy and admin checklist before publishing recordings or transcripts.
- No company-private code, confidential customer data, personal contact information or leaked interview materials should be requested or published.
- Clearly mark an individual's first-hand claim versus official public information. Provide a correction path, review dates, and a way to report privacy or safety issues.

---

## 8. SEARCH, CONTENT, AND TRUST MODEL

### Search and discovery
Start with fast, reliable local/DB full-text search; do not make an LLM or external search provider mandatory for basic use. Search should work with keyboard, provide useful result context, support an empty state, preserve shareable filters where possible, and return only published/approved content. Add `Cmd/Ctrl+K` quick search only if it is genuinely accessible and does not interfere with inputs; display the shortcut affordance honestly.

### Structured evidence labels
Implement a reusable typed system—not just colored decorative badges—for content provenance. Suggested label definitions:
- **Firsthand account:** this specific claim is supplied by a contributor describing their own experience; it does not necessarily represent the whole industry.
- **Corroborated experience:** multiple independent contributors support a similar pattern; show sample size/context only if real and recorded.
- **Public source:** based on a linked public source; include publisher and checked date.
- **Editorial summary:** a summary created by the platform; identify its supporting sources where available.
- **Opinion:** clearly presented as a personal view.
- **Needs review / Outdated:** a visible caution requiring editorial follow-up.

Do not conflate identity verification, employment verification, content-source quality and usefulness feedback. These are separate signals.

### Feedback and moderation
- Emoji feedback should tell a viewer how useful or actionable a session felt, not certify truth.
- Avoid public leaderboards of members, popularity contests for advice, and one-number “genuineness scores” that can be manipulated or unfairly damage a speaker.
- Provide a structured report/correction flow for misinformation, a broken link, privacy/confidentiality risk or behavior concerns.
- Moderators need clear statuses, timestamps, resolution notes and limited access to private submission data.
- Corrections should leave a transparent update history where appropriate rather than silently rewriting material in a way that misleads readers.

### Recommendations
A first release can provide transparent rules-based related content: same role, overlapping skills, related sessions, adjacent roles and recently reviewed resources. Do not implement a neural network just to sound advanced. Add AI-assisted search/summaries only as a later opt-in feature grounded in approved content, with source citations/timestamps and a human review step for any published content.

---

## 9. INTEGRATIONS

Treat third-party services as external destinations/integrations; AfterOfficeClub itself should remain the source of truth for its own event metadata and knowledge pages.

- **WhatsApp:** use a configured community/group invite or a join-information page. Explain whether it is announcements or discussion. Never invent an invite.
- **Telegram:** optional broadcast channel, only render if configured.
- **Discord:** optional discussion space, only render if configured. If the invite is unavailable, show the community page without a broken link.
- **Zoom:** record actual date/time and safe public registration details. Keep private meeting links and host credentials out of publicly indexed pages and unauthenticated payloads. Do not assume Zoom APIs are available without credentials.
- **Calendar:** generate a valid `.ics` for published events and test timezone, characters, URLs and daylight-saving behavior. Default site timezone to Asia/Kolkata but preserve the event's chosen timezone.
- **Email:** optional. If email delivery is not configured, state that the form was not sent; do not claim an email was dispatched. Avoid relying on a client-side `mailto:` as the only submission workflow.
- **Analytics:** begin without third-party tracking. If needed, make the integration optional, disclose it and measure only events needed to improve the product.
- **Domain:** use `NEXT_PUBLIC_SITE_URL` as configuration and generate metadata/sitemap canonicals from it. Do not buy/register a domain or claim a name is legally clear. Domain and trademark research remain a separate owner action.

---

## 10. PERFORMANCE, SEO, AND OPERABILITY

Follow the current official Next.js production checklist. Build with the mindset of a public site on slow devices and unpredictable connections.

### Performance goals
- Aim for lab Lighthouse scores around 90+ for Performance, Accessibility, Best Practices and SEO on the principal public routes where practical; these are goals, not a guarantee. Fix material issues instead of obsessively manipulating the score.
- Target Core Web Vitals at the “good” thresholds where measurable: LCP <= 2.5 seconds, INP <= 200 milliseconds, CLS <= 0.1 at the 75th percentile. Explain that real field results require production traffic and cannot be guaranteed by local Lighthouse alone.
- Avoid large client bundles, unnecessary client components, multiple animation packages, heavy video backgrounds and giant unoptimized images.
- Use local/self-hosted fonts, `next/image` for suitable local images, lazy-loading for below-the-fold media, appropriate sizes and no layout shift.
- Measure bundle size and identify avoidable large dependencies. Avoid loading a full icon library if individual imports are supported.
- Use caching only where correct. Do not publicly cache personalized or private responses. Avoid cross-user cache leaks for sessions, RSVP status and admin content.
- Ensure the initial page remains usable if optional integrations fail.

### SEO and social sharing
- Meaningful unique metadata title/description for every public route.
- Canonical URLs based on configured site URL.
- Open Graph/Twitter-style metadata and a locally generated branded social preview where practical.
- `robots.txt`, XML sitemap, favicon/app icons and semantic heading hierarchy.
- Appropriate JSON-LD such as `Organization`, `BreadcrumbList` and `Event` only where data is truthful, published and eligible. Never publish fake events or unsupported ratings/reviews in structured data.
- Useful internal links and descriptive anchor text. No indexing of admin, private RSVP pages, login callback routes or unpublished drafts.
- Custom not-found/error pages and safe redirect behavior.

### Reliability and maintainability
- Add meaningful loading, empty, error and retry states.
- Avoid `catch {}` / empty fallback branches that hide failures.
- Use structured logging in server-side paths without exposing private content.
- Add a health/readiness route only if it provides useful checks and does not disclose secrets or operational internals.
- CI should run deterministic checks and be reproducible on a clean checkout.
- Document how to deploy to a supported free/low-cost host as an option without implying every provider's free tier will remain free or suit every scale. Make provider-specific constraints clear.

---

## 11. TESTING — REQUIRED, NOT OPTIONAL

Do not stop when the homepage renders. Build a layered automated test suite and execute it. Prefer tests that prove behavior and accessibility over brittle snapshots of every DOM node.

### Required automated checks
1. Format/lint check using the project's configured tool.
2. TypeScript type check with strict settings.
3. Unit tests for search/filter/sort, date/time display, `.ics` generation, URL allowlisting, schema validation, slug functions, evidence-label rules, opportunity expiry and submission-state handling.
4. Component/integration tests for mobile navigation, accessible dialogs/menus, search filters, empty/error states and forms.
5. Playwright E2E tests for key routes and user journeys.
6. axe-core checks on representative pages and interactive states.
7. Production build using the actual production command.
8. Dependency/security audit and review of findings. If an audit requires internet access or the registry is unavailable, mark it **NOT RUN** with the real reason.
9. Check browser console errors and failed network requests in E2E where feasible.
10. Verify production bundle/client code contains no secret environment values.

### Minimum E2E journeys
- A visitor opens home and every public nav link routes correctly.
- Mobile menu opens, closes with Escape, closes after navigation and is keyboard accessible.
- Search returns correct role/library results; filters combine correctly; clear-all works; no results has a helpful state; URL state can be shared when implemented.
- A Role Reality Passport renders the right content, evidence labels, related items and metadata.
- Upcoming/past session filtering respects publish status and timezone. Draft/unconfirmed sessions never appear publicly.
- `.ics` download is parseable and includes the right event title/start/end/timezone/URL.
- RSVP and contribution forms validate invalid input, disable duplicate submission while pending, display accurate success/error/demo-mode states and do not expose private attendee details.
- Feedback interactions work and do not falsely claim to verify truth.
- Opportunities correctly handle future, active, closing-soon and expired dates without fabricated entries.
- Missing integrations produce clear non-broken states; configured links open safely.
- Unauthenticated and ordinary users cannot access admin/private resources; changing client data/URLs does not bypass authorization; unpublished/private rows do not appear in public responses.
- Missing backend credentials do not crash the public site, and forms never pretend to have persisted data.
- Unknown slugs show a polished 404; network/server failures show an understandable error and retry path where appropriate.
- Reduced-motion preference is respected; keyboard-only flow and visible focus work; axe checks are reviewed and critical/serious findings fixed.
- Every external link is real/configured and uses safe URL handling. No broken `href="#"` or inert buttons.

### Responsive and visual QA
Use Playwright projects or a systematic viewport loop for these CSS viewport widths: **320, 360, 390, 430, 768, 1024, 1280, 1440, 1920**. At minimum assert:
- `document.documentElement.scrollWidth <= document.documentElement.clientWidth` on each primary route, with exceptions explained rather than ignored.
- Header/menu/CTA never overlap, and card/grid layouts reflow naturally.
- Text remains readable and controls stay reachable at narrow widths.
- Long role titles, long words/URLs, empty results, large counts and errors do not break layout.
- Modals, forms and menus fit within viewport and have appropriate scrolling.
- Main route screenshots can be captured to a test artifact folder for manual comparison. If visual-regression tooling is added, keep baselines deterministic and avoid platform-dependent font/image noise.

Also test at desktop/laptop browser dimensions and one narrow viewport approximating 200% browser zoom/reflow. Browser/device testing cannot literally cover every make/model of laptop; make the coverage explicit rather than claiming universal verification.

### Test discipline
- Fix discovered bugs before reporting completion. Repeat relevant tests after fixes and then rerun all final release checks.
- Never delete a failing test just to get green. If a test is invalid, fix and document the reason.
- Do not skip lint/type errors with `any`, `@ts-ignore`, disabled rules or `test.skip` unless there is a documented, justified platform limitation.
- Record every final command, exit status and concise outcome in `IMPLEMENTATION_STATUS.md` and summarize it in the final response.
- If a real test cannot run because an external account, credential, browser binary or service is missing, provide the exact manual step to enable it and mark it NOT RUN. Do not claim that a third-party integration works end-to-end without testing it.

---

## 12. ACCEPTANCE CRITERIA — DEFINITION OF DONE

The implementation is complete only when all applicable items below are true and evidenced in `IMPLEMENTATION_STATUS.md`.

### Product/content
- [ ] The first viewport explains the product and provides useful next actions.
- [ ] All required public routes exist and share a consistent navigation/design system.
- [ ] Role explorer, role detail, sessions, library, opportunities, contribute and community interactions work with the available data mode.
- [ ] No fake testimonial, person, company endorsement, session, opportunity, referral, count or verification claim is present.
- [ ] Demo/illustrative content is clearly identified and never masquerades as real firsthand input.
- [ ] Missing social/event integrations have graceful states without fabricated links.
- [ ] All visible controls work or are disabled with an explanation.
- [ ] Content is clear, edited, spell-checked and consistent in tone.

### Design/responsive/accessibility
- [ ] Visual hierarchy, spacing, typography, color tokens and interaction states are consistent.
- [ ] No horizontal overflow at required responsive breakpoints on core routes.
- [ ] Mobile navigation and key flows work with keyboard and touch.
- [ ] Accessible headings, landmarks, labels, focus states and meaningful alt text exist.
- [ ] Reduced motion and color contrast are checked.
- [ ] Representative axe checks have no unresolved critical/serious issue; remaining issues documented.
- [ ] Loading/empty/error states are designed, not browser-default accidents.

### Technical/security
- [ ] Strict typecheck, lint, unit/integration tests and production build pass.
- [ ] E2E coverage includes the required journeys that can run in this environment.
- [ ] No secrets are present in source, public build, logs or repository changes.
- [ ] Supabase RLS and role authorization are implemented and tested if Supabase is enabled.
- [ ] All privileged mutations authorize on the server, not just at the UI layer.
- [ ] Public forms have server-side validation and abuse controls.
- [ ] Production error messages do not reveal stack traces/secrets.
- [ ] Security headers, metadata, sitemap, robots, dependency lockfile and environment documentation are in place.
- [ ] High/critical dependency audit findings are fixed or explicitly documented with mitigations and a release blocker where appropriate.
- [ ] No private meeting link/attendee information/admin data is publicly exposed.
- [ ] Legal copy is flagged for owner/legal review; no compliance guarantee is asserted.

### Delivery
- [ ] `README.md` includes exact commands for clean setup, development, tests, build and deployment.
- [ ] `.env.example` lists required and optional variables without real secrets.
- [ ] CI workflow is valid and uses available commands.
- [ ] `IMPLEMENTATION_STATUS.md` records actual results, not aspirations.
- [ ] Final summary lists what was implemented, what commands were run, tests that passed/failed/not run, security caveats, external setup steps still required and exact run command.

Do not claim “world-first”, “perfect”, “bug-free”, “fully secure” or “production-ready” as an absolute. The standard is a careful, tested, maintainable release with known limitations clearly disclosed.

---

## 13. AUTONOMOUS EXECUTION PLAN

Execute these phases in order. Do not stop after describing a phase.

### Phase 0 — Reconnaissance and threat-aware plan
- Inspect workspace structure, runtime/tool versions, scripts, dependencies, `.gitignore`, current git status and existing conventions.
- Review current official docs/advisories for selected framework/auth/database libraries, and record important links.
- Determine whether the project is existing or greenfield; protect existing user work.
- Create/update required project docs and a concise implementation checklist.

### Phase 1 — Design system and public shell
- Implement brand tokens, responsive typography, accessible navigation/mobile menu, footer, buttons/links, cards, badges, skeletons, empty/error states, and custom not-found/error views.
- Build the homepage with complete layout and original visual motifs.
- Confirm the primary routes and responsive shell before adding backend complexity.

### Phase 2 — Content model and public routes
- Define typed role/session/library/opportunity structures and publish-state/evidence semantics.
- Populate accurate starter role guide content with transparent provenance; no fake contributors or opportunities.
- Implement explore/search/filter, role passports, sessions/calendar/archive, library detail, opportunities, community, contribute, about/guidelines/legal starter pages.
- Check all links, navigation and empty states.

### Phase 3 — Real forms and optional backend
- Implement server/client validation and accurate demo mode.
- Add Supabase SSR/auth, migrations, RLS policies and protected admin only if chosen/configured, with all secrets server-only.
- Add waitlist/topic/speaker/nomination/RSVP/question/feedback/correction workflows as appropriate. If backend credentials are missing, preserve public site functionality and clearly document that persistence is unavailable.
- Add moderator workflow and recording/publication consent checks.

### Phase 4 — SEO, accessibility, security and performance
- Add metadata, sitemap/robots, social preview assets, structured data for truthful published entities, headers, safe URL handling and dependency checks.
- Run axe and keyboard/manual checks, responsive tests, bundle/performance review, and fix findings.

### Phase 5 — Full automated validation and polish
- Implement and run tests from Section 11. Inspect screenshots at all required widths.
- Test no-credentials mode, no-content mode, invalid forms, network/backend failure, draft/unpublished data, expired opportunities, missing integrations and unauthorized admin access.
- Run lint, typecheck, unit tests, E2E tests, accessibility checks, security audit and production build, fixing problems and rerunning relevant tests.
- Inspect the final diff for accidental generated files, secrets, console errors, dead links, empty handlers, fake copy and unrelated changes.

### Phase 6 — Final handoff
- Ensure the app is actually runnable and include exact commands for the repository's OS/tooling. Prefer cross-platform scripts. The user works on Windows, so make README commands work in PowerShell where practical, and mention macOS/Linux variants only where different.
- Update docs and `IMPLEMENTATION_STATUS.md` with truthful test results, limitations and configuration steps.
- Final response must be concise but specific: what exists, how to run it, what was tested with actual results, anything NOT RUN, exact environment setup needed, and remaining release blockers. Do not claim to have registered a domain or deployed the app unless actually done with explicit authorization.

---

## 14. OFFICIAL REFERENCES TO CONSULT DURING IMPLEMENTATION

Use these as starting points and verify they still match the installed versions:

- Next.js App Router: https://nextjs.org/docs/app
- Next.js production checklist: https://nextjs.org/docs/app/guides/production-checklist
- Next.js testing guidance: https://nextjs.org/docs/app/guides/testing
- Next.js security advisories: https://github.com/vercel/next.js/security/advisories
- Supabase Next.js quickstart: https://supabase.com/docs/guides/getting-started/quickstarts/nextjs
- Supabase server-side auth: https://supabase.com/docs/guides/auth/server-side
- Supabase Row Level Security: https://supabase.com/docs/guides/database/postgres/row-level-security
- OWASP Top 10: https://owasp.org/www-project-top-ten/
- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- GitHub Copilot repository instructions: https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instructions/add-repository-instructions
- VS Code agent approvals and sandbox: https://code.visualstudio.com/docs/agents/run/approvals
- Vercel production checklist (use only if Vercel is selected): https://vercel.com/docs/production-checklist

Do not blindly follow an outdated snippet from a blog. Prefer current official documentation and current patched package releases.

---

## 15. START NOW

Begin with **Phase 0**. Inspect the actual workspace, then implement every phase you can complete in this environment. Do not ask me to choose between routine technical options. Make the best documented decision, continue, test it, correct defects and keep `IMPLEMENTATION_STATUS.md` truthful. If you hit a genuine account/credential/legal/domain dependency, continue the rest of the implementation using the safe, explicit unconfigured state and document the exact step that only the owner can perform.

**The product must make people feel:** “This is what I have been looking for. I can finally understand what a job or business is really like before making my next move.”

**The engineering must make maintainers feel:** “The structure is understandable, the evidence is honest, the failure states are considered, the tests are real, and the team can extend this without rebuilding everything.”

Build the experience, not just the page.
