# Backend-first full-stack refresh

Implemented 13 October 2026 against the local checkout. The older published site
was not used as the design baseline. No publishing workflow was dispatched.

## Presentation

- The opening explicitly presents Backend Engineer & Full-Stack Developer, with
  backend technologies, React/browser integrations, and CareerNexus leadership.
- Professional experience precedes selected projects. Existing internship titles,
  dates, team attribution, and measurement boundaries are retained.
- Experience uses a vertical timeline; skills include evidence-linked React and
  browser integrations. Education remains in About.
- Selected projects include engineering highlights and interactive source-derived
  architecture previews. Case studies retain implementation limits and sources,
  with longer project context in a native secondary disclosure.
- The navy/cyan palette is retained. Shared CSS is consolidated, with responsive
  typography, reading widths, controls, diagrams, and timelines.
- Document metadata and both SVG/PNG social-preview assets use the new positioning.

## Motion and interactions

MotionProvider combines device and saved user preferences, sharing the effective
policy with MotionConfig, CSS, smooth scrolling, and Three.js. The existing
portfolio-motion storage key is preserved, including unavailable-storage handling
and cross-tab updates. The control now appears in navigation.

Content renders visibly on the server and before preference initialization.
Sections reveal once with a 12-pixel movement over 400ms; related entries stagger
by 60ms, capped at 180ms. Navigation includes a scroll-linked progress line.
Reduced motion stops spatial animation and removes the progress line.

Request tracing reports its stage as the packet moves, then announces completion.
Layer selection, resets, offscreen cancellation, reduced-motion changes, and
disposal share one tested lifecycle. Mobile starts with the static diagram;
tracing there provides the result immediately without requiring WebGL.

## Verification

Verified locally on the production artifact:

- 13 Node tests pass, including contact validation, preference persistence and
  blocked storage, request-stage timing, cancellation, and immediate reduction.
- ESLint, production build/prerender, and release artifact checks pass.
- Release verification checks both role descriptions, experience order, unique
  IDs, fragment destinations, asset existence, source links, and gzip budgets.
- Initial JavaScript is approximately 111.5 KiB gzip. The lazy Three.js chunk is
  approximately 131.8 KiB gzip, within the existing 250 KiB per-chunk budget.
  Vite still reports the Three.js chunk above its 500 kB uncompressed advisory.
- The in-app browser loaded the updated production preview without captured
  JavaScript errors. A desktop screenshot was visually inspected. Subsequent
  screenshot capture was initially unavailable; the final navbar refinement now
  includes saved desktop and mobile screenshots.
- DOM layout checks at 320, 390, 768, 1024, and 1440 pixels found no horizontal
  overflow; an expanded mobile case study also remained within the viewport.
- Request tracing begins at Client and finishes at Database. Motion reduction
  removes the progress line and survives reload. Architecture selection updates
  its explanation. Case-study links expand their destinations and Work remains
  the active navigation section.
- Mobile menu Escape returns focus to Menu. Invalid contact submission preserves
  typed content and focuses the email error. No real contact message was submitted.

The sandbox preview was inaccessible to the app browser. An approved preview
server outside the sandbox, bound to 127.0.0.1 on port 4174, resolved connectivity.

## Remaining release checks

Navigation refinement: the desktop bar now prioritizes Work, Experience, Contact,
and Resume. Skills, About, and motion preferences sit under More; mobile exposes
all destinations inside its existing menu. The header uses a softer translucent
surface, subtle active backgrounds, and a rounded resume action. ESLint, rebuild,
and release checks pass. In-app checks verified More opens, Escape returns focus,
and the mobile menu exposes all links without horizontal overflow.

The final navigation has a rounded floating shell, ST brand mark, consistent SVG
icons, and a 900px menu breakpoint shared by CSS and JavaScript. Browser checks
at 375px, 900px, and 901px confirmed that the brand and controls fit without
overflow, that the menu switches at the expected boundary, and that Escape
returns focus. See [desktop navbar](navbar-desktop.jpg) and
[mobile preview](navbar-mobile.jpg).

These checks have not been established by this refresh:

- Field Core Web Vitals, production Lighthouse measurements, and a complete
  accessibility audit. Targets remain LCP <= 2.5s, INP <= 200ms, and CLS <= 0.1.
- Real contact submission, deployed Firestore policy, notification delivery,
  current external demo availability, and resume access/currency.
- Device-level reduced-motion changes in a browser; combination semantics are
  covered by unit tests, while the manual browser check used the site control.
- A recruiter usability study and public deployment. Use the existing publishing
  workflow and release gates when publication is requested.

## Design references

### Hero action hierarchy and icon cleanup

The left hero's View my work and View resume are grouped together, with one
filled primary action and a quieter secondary action. They share a 48px minimum
height, 160px minimum width, and 16px gap on desktop; narrow layouts stack them.
Contact me, GitHub, and LinkedIn form an underlined secondary navigation row.
All arrow characters and SVG arrows are removed from this left-side area. Resume
icons in the header and About retain their previous presentation. New-tab hints
remain available to screen readers and through link titles.

This applies GOV.UK's descriptive action labels, primary/secondary grouping, and
research on unnecessary external-link icons to the existing portfolio styling.
It does not change the right-hand interactive diagram.

ESLint, production build, and release verification pass. The in-app development
preview confirmed zero arrow characters or SVG icons in hero-copy, equal desktop
button dimensions, stacked actions at a measured 400px CSS viewport, side-by-side
actions at 600px, and no horizontal overflow. Work and Contact links navigate to
their intended fragment targets. Browser zoom affected the measured viewport
widths, so these are the actual CSS widths rather than requested viewport sizes.
See [refined hero actions](hero-actions.jpg).

- [Official button hierarchy and grouping](https://design-system.service.gov.uk/components/button/)
- [Official links guidance](https://design-system.service.gov.uk/styles/links/)
- [External-link icon research](https://designnotes.blog.gov.uk/2016/11/28/removing-the-external-link-icon-from-gov-uk/)

### Left-side hero refinement

The left hero now uses a more restrained title scale, an explicit secondary
full-stack role, and shorter copy: Building APIs, real-time services, and React
interfaces. The two-sentence biography names Java/Spring Boot, React browser work,
Python workflows, and CareerNexus backend leadership. The actions are View my
work, View resume, and Contact me; GitHub and LinkedIn remain a secondary row.

Scoped hero-copy styles align the text to the top of its grid cell and apply
16px, 20px, and 24px spacing between its main groups. The action buttons are at
least 48px tall and stack below 480px. Essential content is visible immediately;
the supporting paragraph has a brief opacity change disabled by reduced motion.
The right-side SystemScene component and its controls were not changed.

ESLint, production build/prerender, and release verification pass. Browser
inspection was blocked by the browser URL security policy in this turn, so this
iteration's visual and responsive behavior still needs a browser check.

### Optional white theme

The footer now offers Use light theme / Use dark theme alongside the motion
control. Dark remains the default for new visitors. The selected theme persists
in portfolio-theme independently of motion; a small pre-paint initializer restores
it before hydration to avoid a dark flash for returning light-theme readers.
Unavailable or invalid storage safely falls back to dark. Other open tabs can
receive updated preferences through the storage event.

Light mode uses white background #ffffff, pale surfaces #f3f5f4, dark text
#17231e, and deeper green accent #126342. Shared color tokens cover navigation,
hover and selected states, inputs, links, code panels, diagrams, and native browser
controls through color-scheme. Three.js updates its materials without rebuilding
the canvas or interrupting a request trace. Layout, keyboard focus, reduced motion,
and the restrained border treatment are retained.

Measured light-mode contrast: body on cards 8.08:1, muted text on raised controls
5.17:1, links on cards 6.64:1, primary button text 7.27:1, error text 6.47:1, and
input boundaries 4.02:1. These are palette checks, not a full conformance audit.
All 17 tests, ESLint, production build, and release verification pass. Browser
checks confirmed both theme directions, saved light mode after reload, independent
motion settings, selected project stages, and mobile navigation without overflow
at 375px. The preview is left in light mode for review.

See [light desktop](light-desktop.jpg) and [light mobile](light-mobile.jpg).

### Footer preferences and direct navigation

At the owner's request, More is removed. Work, Experience, Skills, About, Contact,
and View resume are direct navigation destinations; mobile lists the same links
in its existing Menu. The single Reduce motion control now sits in the footer
beside Back to top. Device preferences, persistence, and the shared global motion
policy are unchanged. Earlier references to a top-level motion control or More
describe prior iterations.

Browser verification found one footer motion control, none in the header, and
no More component. The footer choice updates global motion and persists after
reload. All links fit at 901px, and the mobile menu fits at 375px without overflow.
ESLint, production build, and release verification pass.

### Charcoal and teal visual refinement

The current palette supersedes the initial navy/cyan design: page #101214,
surfaces #191d21, raised controls #252c28, text #f2f3f2, and teal accent #74d7b0.
The blue background glow is removed. Header alignment and navigation behavior
are preserved. Decorative outlines are removed from the navbar, brand badge,
resume action, general cards, tags, code panels, and project dividers. Surface
changes and spacing provide grouping; selected controls, keyboard focus, input
boundaries, and restrained structural dividers retain visible distinctions.
The 3D scene, fallback, favicon, and social artwork use the same palette.

This aesthetic is a design choice informed by Carbon's neutral layering model
and visual-hierarchy guidance. No research establishes that a particular color
signals backend seniority; project ownership and implementation evidence provide
the professional positioning.

Measured contrast: body copy on cards 9.90:1, muted text on raised controls
5.64:1, teal links on cards 9.76:1, primary button text 9.19:1, and input boundaries
3.58:1. These palette checks do not establish full accessibility conformance.
The production build, release verification, ESLint, and all 13 tests pass.
The in-app browser verified the new background, border removal, project-stage
selection, and mobile navigation without horizontal overflow at 375px.
See [desktop preview](charcoal-desktop.jpg) and [mobile preview](charcoal-mobile.jpg).

Resume action refinement: all three destinations use a shared ResumeLink with
the visible label View resume. The label is 16px/600, remains on one line, and
has at least a 44px target height. The navigation uses opaque dark fill and light
text for predictable contrast; the SVG cannot compress the label. A hidden text
suffix and tooltip explain new-tab behavior. Browser checks at 375px and 901px
confirmed readable labels and no horizontal overflow. Lint, production build,
and artifact verification pass.

The UX rules applied throughout are clear action labels, consistent typography,
visible keyboard focus and active location, prioritised primary navigation,
secondary options revealed on demand, and user control over animation. These are
adapted principles for this portfolio, not a claim of complete WCAG conformance
or a copy of another product's branding.

- [Usability heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/)
- [Carbon neutral layers and theme tokens](https://www.carbondesignsystem.com/building-blocks/foundations/color/overview)
- [Visual-design principles](https://www.nngroup.com/articles/principles-visual-design/)
- [W3C contrast guidance](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)
- [Native color-scheme behavior](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/color-scheme)
- [W3C link purpose](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html)
- [GOV.UK links on dark backgrounds and new-tab behavior](https://design-system.service.gov.uk/styles/links/)
- [GOV.UK typography scale](https://design-system.service.gov.uk/styles/type-scale/)
- [Official typography research blog](https://designnotes.blog.gov.uk/2022/12/12/making-the-gov-uk-frontend-typography-scale-more-accessible/)
- [W3C animation control](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html)
- [W3C disclosure pattern](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/)
- [Motion accessibility](https://motion.dev/docs/react-accessibility)
- [Motion scroll animation](https://motion.dev/docs/react-scroll-animations)
- [Animation performance](https://web.dev/articles/animations-guide)
- [Core Web Vitals](https://web.dev/articles/vitals)

### Backend request journey replacement

Replaced the four-cube hero panel with a browser object, a central layered backend service, and a cylindrical database. A four-second introductory journey runs once, following application → backend → database → backend → application. Controls provide pause and replay; object labels provide keyboard-accessible selection and explanations. Both themes recolor the scene. Reduced motion completes playback immediately, while mobile/data-saving/no-WebGL visitors retain a readable static illustration. Rendering stops when offscreen or the document is hidden.

Verified the running dev site: complete return path, pause/replay, light/dark appearance, reduced motion, fresh mobile fallback (487 CSS px because browser zoom), no horizontal overflow, valid case-study anchor, and no browser console errors. Lint and all 18 tests pass, including the new four-second return-path test. No build or release command was run, per user request. Desktop preview: `backend-journey.jpg`.

### Studio backend scene refinement

Further refined the right hero using the shared Shadcn Space Glass Showcase reference as visual inspiration: rounded service layers, a translucent enclosure, processor detail, tone-mapped lighting, soft shadows, curved request/response conduits, and a restrained orbit backdrop. The central backend is larger than the application and database. Floating input/output annotations establish the purpose of the scene.

A new inspector exposes Receive, Validate, Execute, Persist, and Respond through keyboard-accessible buttons, with detailed explanations and synchronized 3D highlights. The 4.8-second introductory round trip separates validation from service execution and runs only once. Pause/replay, offscreen suspension, reduced-motion completion, both themes, and a static mobile fallback remain supported. This is clearly labeled illustrative architecture; no operational metrics or unverified project claims were added.

Verified in the dev browser: keyboard inspector activation, pause/replay, light/dark appearance, reduced-motion immediate completion, fresh narrow-screen fallback at 400 CSS px, no horizontal overflow, and no console errors. No build command was run. Reference: https://shadcnspace.com/animated-blocks/glass-showcase-studio-hero-51 . Preview: `backend-studio.jpg`.

### Compact responsive backend showcase

Shortened the hero scene copy to one sentence per responsibility and reduced the inspector to a single control row. The heading now foregrounds APIs, logic, and data, with Java / Spring Boot / PostgreSQL context. Consolidated accumulated scene CSS. The 3D camera fits both canvas axes, reserves a label strip, and frames the service core across screen shapes. Added API / VALIDATION, BUSINESS LOGIC, and DATA ACCESS plaques to the service layers. Phone-sized screens now load 3D with pixel ratio capped at 1 and shadows disabled; data-saving connections or unavailable WebGL retain the static view.

Dev-browser verification: the entire right showcase fits at 320×640 and 1024×600 CSS pixels, with no horizontal overflow. At the short desktop size it spans y=111.6 to y=593. Pause/replay, keyboard step selection, reduced-motion completion, and light/dark appearances were checked; no console errors observed. Normal viewport and light theme restored. Lint and 19 tests passed. No build command was run. Dev server was restarted as a hidden background process after the browser/app session restarted.

Research: W3C Reflow (https://www.w3.org/WAI/WCAG22/Understanding/reflow.html) and Three.js Responsive Design (https://threejs.org/manual/pages/responsive.html). Previews: `backend-compact-mobile.jpg`, `backend-compact-desktop.jpg`.

### Unified request / response accent

Removed the gold return-path colour. All conduits, the moving packet, and its halo now share one theme-aware flow accent: deep green in light mode and teal in dark mode. Active segments differ only in opacity. Checked the response stage in the dev browser; lint passed. No build ran. Preview: `backend-single-accent.jpg`.

### One clear hero role

Removed the numbered Backend / Frontend / Leadership evidence strip, which duplicated the hero and later experience/project evidence. Simplified the hero headline to Backend Engineer and focused its introduction on APIs, real-time services, and data workflows. React experience and CareerNexus leadership remain in supporting copy and detailed sections. Removed unused role/strip styles. Dev-browser checks confirmed one Backend Engineer headline, no evidence strip, and Experience directly after the hero. Lint passed; no build ran. Preview: `backend-focused-hero.jpg`.

### Hero and navigation clarity

Preserved meaningful skill and contribution evidence while reordering the hero summary to lead with CareerNexus backend work. React browser extensions and Python workflows remain as supporting experience. Renamed Work / View my work to Projects / View projects for a specific destination. Mobile navigation now closes on outside pointer interaction or when keyboard focus leaves it; Escape still returns focus to the menu button. Brand navigation focuses Home consistently. Lightened the mobile menu boundary and contained its internal scroll.

Dev-browser verification covered the Projects anchor, outside-click dismissal, Tab-out dismissal, Escape focus return, responsive overflow, and no console errors. Lint passed; no build ran. Preview: `hero-nav-refinement.jpg`.

### Faster scene startup and complete-frame reveal

The 3D import previously began inside the hero's mount effect. Startup also allocated a material for every mesh and regenerated repeated rounded geometries. A cached development refresh measured 66 ms awaiting the scene module and 437 ms creating/configuring/rendering it. This is a local cached baseline, not a cold-network or production measurement.

A shared retryable loader now starts the nonblocking scene import from the browser entry point before React mounts (skipped for data-saving connections). Materials are shared per architecture node and material type, rounded geometries are cached with a lower bevel subdivision count, and shared GPU resources are disposed once. The static fallback remains visible until the fully rendered canvas is revealed on the next animation frame. DOM diagnostic attributes separate module-wait and setup timings.

Two post-change cached refreshes measured module-wait/setup pairs of 42/201 ms and 64/341 ms. GPU and browser variability remain; these observations do not establish production performance or a guaranteed speedup. Verified complete scene, stage inspection, pause/replay, both themes, and no console errors. Lint and all 19 tests pass. No build ran. Preview: `backend-loading-optimized.jpg`.

Official reference: https://threejs.org/docs/pages/WebGLRenderer.html (GPU resource disposal and shader initialization).

### TaskLabs experience refinement

Removed the Infosys virtual Python internship and its certificate link from the Experience data. Replaced the numbered timeline with a single TaskLabs feature: company and start date, the confirmed Software Developer Intern title, three concise contribution areas, and technologies. Preserved the start-only date because an end date or ongoing status has not been confirmed. No seniority, tenure totals, user counts, or performance metrics were invented.

The three areas cover application interfaces, Chrome storage/messaging/tab integrations, and performance/edge-case debugging. The layout uses the portfolio's existing colours and surfaces, stacks at narrow widths, and adds a one-time card entrance with staggered contribution transitions and restrained hover feedback. Essential content remains visible before animation; reduced-motion preferences disable the new transitions.

Dev-browser checks: TaskLabs content present, Infosys entry absent, no horizontal overflow at 320 CSS pixels, mobile columns stack, reduced-motion animation is none, and no console errors. Lint passed. No build ran. Preview: `experience-refined.jpg`. Official animation guidance: https://motion.dev/docs/react-accessibility . Shared design inspiration: https://shadcnspace.com/animated-blocks .

### Supercommands identity and branded experience

At the user's explicit request, renamed the experience from TaskLabs to Supercommands and changed the displayed title to Software Developer without an internship label. Preserved the existing contribution details and start-only date. Updated the related Skills anchor to #supercommands. Copied the user's supplied logo unchanged into src/assets/supercommands-logo.png and displayed it with a fixed-size, lazy-loaded image.

The new composition pairs a dedicated logo/employer panel with the role and three contribution rows. Restrained purple/blue accents reflect the supplied mark while text and surfaces use the existing light/dark palette. The panel becomes a compact logo header on phones. A one-time logo entrance and subtle shadow feedback respect reduced motion; all content remains visible independently of animations.

Dev-browser verification: logo loads, company and Software Developer wording present, no internship text in Experience, Skills link points to the new experience id, one-column layout and no overflow at 320 CSS px, reduced-motion logo animation/transition disabled, both themes checked, no console errors. Light theme and default viewport restored. Lint passed; no build ran. Preview: `supercommands-experience.jpg`. Official motion guidance: https://motion.dev/docs/react-accessibility .

### Cohesive navigation, hero, and Experience

Refined only the navigation, hero, and professional experience presentation. Standardized neutral surfaces, teal/green accents, corner radii, typography hierarchy, and spacing using the existing theme tokens. Removed purple/blue Experience decoration, logo glow, the hero orbit, the extra Interactive 3D badge, repeated technology text beside the scene, and the repeated Experience introduction. Preserved the supplied Supercommands logo colours and factual content. The right hero now uses a plain From request to response heading; all controls and request/response labels remain available.

Scoped navigation styles reduce visual weight while retaining readable links and 44px targets. Hero grid proportions and text sizing give the explanation and scene a clearer relationship. Experience uses the same subdued surfaces and hierarchy. Remaining site sections were left unchanged.

Verified in the dev browser at 320, 813, and 1280 CSS-pixel widths: no horizontal overflow, appropriate mobile stacking, full desktop navigation, coherent light/dark appearance, no purple/blue panel gradients, and no console errors. Default viewport and light theme restored. No build or new lint/test run was needed for these presentation edits. Previews: `cohesive-hero.jpg`, `cohesive-experience.jpg`.

### Consistent sentence case

Scoped the casing refinement to navigation, hero, and Experience. Hero title now reads Backend engineer; Supercommands role reads Software developer. Removed forced uppercase and wide tracking from hero/Experience eyebrow labels and My role. Changed the 3D layer plaques to Data access, Business logic, and API / validation, preserving API as an acronym. Navigation already uses sentence case. Proper names, logo lettering, and technologies keep their established spelling. Removed trailing full stops from the two affected section headings for consistency.

Verified rendered labels have text-transform none and both role headings use sentence case in the dev browser. No build ran. Preview: `consistent-sentence-case.jpg`.

### Projects restructured for readability

Replaced the dense product/architecture split with a clear project heading and technology row, purpose and verified role, a concise backend implementation summary, a small action row, and optional Explore backend flow disclosure. Removed decorative project numbering, arrows, and the duplicate permalink action. Preserved project anchors, source/demo URLs, source-derived details, and complete case-study routes. CareerNexus retains verified team lead/backend ownership; DevBridge retains individual contributor scope; IntelliAgents is explicitly a shared team implementation.

Projects uses the same theme tokens, sentence case, corner radius, text hierarchy, and restrained card surfaces as the earlier three sections. Main overview columns become one column on mobile; optional flow steps use two columns on mobile with readable text, keyboard-accessible selection, and 44px-or-larger control height. One-time staggered card entrances, disclosure opacity transitions, and link feedback respect reduced motion. No new dependencies or fabricated project imagery were introduced.

Verified in the dev browser: applied styles, readable first project in both themes, keyboard flow selection updates the description, case-study link opens the correct disclosure, no horizontal overflow at 320 CSS px, one-column overview, two-column optional flow, reduced-motion card animation none, and no console errors. Default viewport and light theme restored. No build ran. Preview: `projects-restructured.jpg`.

Primary design references: https://design-system.service.gov.uk/styles/headings/ (consistent hierarchy and sentence case), https://motion.dev/docs/react-use-reduced-motion (adapt or disable motion). Sites presentation-led guidance informed the structure and progressive exploration.

### Engineering case studies refined

Matched case studies to Projects, hero, and Experience using the same theme tokens, sentence case, text scale, surfaces, and rounded corners. Summaries now show the verified role, project name, and a short purpose. One study opens at a time; direct case-study links still open and focus the target.

Expanded content leads with role and problem, selected-stage backend architecture, and implementation decisions. Removed repeated per-stage description blocks and decorative arrows. Tradeoffs, implementation contracts/reliability, limitations/next steps, and source evidence/team attribution use progressively disclosed sections. All source facts, code examples, limitations, team boundaries, and source links remain available. Simplified return navigation to Back to project.

Added restrained entry/disclosure fades with reduced-motion support. Verified in the dev browser: direct-link expansion, initial deep-link reopening on refresh, keyboard architecture stage selection, preserved API contract, one-at-a-time study expansion, one-column mobile reading layout, two-column stage controls at 320 CSS px, no horizontal overflow, reduced-motion animation disabled, both themes, and no console errors. Light theme/default viewport restored. No build ran. Preview: `case-studies-refined.jpg`.
