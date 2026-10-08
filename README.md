# Sai Teja Venkata Vinay Adapa portfolio

A shared backend engineering portfolio built with React, Vite, and Tailwind CSS.
Recent Computer Science graduate, CGPA 8.04/10. Featured work includes CareerNexus,
DevBridge IDE, and IntelliAgents AutoAuth.

[Live portfolio](https://22a31a0525.github.io/Sai-Teja-Venkata-Vinay-Adapa/)

## Development

Use Node.js 20 or newer and install the locked dependencies:

```sh
npm ci
npm run dev
```

Vite serves the app under `/Sai-Teja-Venkata-Vinay-Adapa/`.
An optional Firebase public-key override is documented in `.env.example`.

## Checks and production output

```sh
npm test
npm run lint
npm run build
npm run verify:release
npm run preview
```

The build creates a Vite bundle, then prerenders the portfolio into `dist/index.html`.
React hydrates that content in the browser. Project and case-study fragments share
the same page and work under the GitHub Pages base path. Production build and
hydration verification are pending; see the phase notes before deployment.

## Architecture

The application shell lives in `src/app`. Feature components live in
`src/features`, shared layout in `src/components/layout`, content records in
`src/content`, contact integration in `src/services`, and design tokens and CSS
in `src/styles`. Firebase loads on submission rather than during initial reading.

## Content and implementation records

- [Phase 0 evidence audit](docs/phase-0/README.md)
- [Phase 1 shared information hierarchy](docs/phase-1/README.md)
- [Phase 2 case studies](docs/phase-2/README.md)
- [Phase 3 visual system](docs/phase-3/README.md)
- [Phases 4 and 5 architecture and accessibility](docs/phase-4-5/README.md)
- [Phases 6 through 8 and release gates](docs/release/README.md)

Numerical outcome claims need measurement evidence. Individual module ownership,
employment dates, resume freshness, and demo operation are documented with their
verification status.

## Contact service

The form saves validated messages to the existing Firestore contacts collection.
A direct email link remains available. Saving a message does not establish email
notification delivery.

`firestore.rules` is a local proposed policy. Existing cloud rules and App Check
enforcement are not verified. Merge and emulator-test the policy before any
deployment; see the phase notes for scope and remaining checks.

## Publishing

GitHub Actions provides a manually dispatched Publish portfolio workflow. It
requires passing lint, tests, production build, artifact checks, and a production
dependency audit. Configure the repository's Pages source to GitHub Actions first.
The latest implementation has not been built or published; see the release gates.

