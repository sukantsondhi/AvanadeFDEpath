# The Avanade FDE Journey

A four-page static redesign of [The FDE Journey](https://fde-avanade.nl-dot.com/journey.html#anchors). Original FDE terminology and content are preserved. Light mode uses Avanade orange and frosted white; dark mode pairs dark blue with orange accents. A futuristic liquid-glass treatment adds translucent surfaces, fine grid textures, refractive highlights, and illuminated edges. Built with HTML, CSS, and vanilla JavaScript using the repository's frontend craftsmanship skill.

## Open the Site

Open [index.html](index.html) directly in a browser. No installation, build step, backend, or development server is required. The same files can be published to any static web host.

## Pages

- [index.html](index.html): the two routes, mandatory anchors, competency overview, proposed Credly badge, and Redmond operating model.
- [competencies.html](competencies.html): all six competency domains, route-specific starting points, learning steps, and proof exercises.
- [hve.html](hve.html): all eight HVE stages, delivery comparison, four fluency milestones, and extension resources.
- [catalog.html](catalog.html): all 37 original courses, searchable by text, tier, and source, with completion tracking.

Dark mode is the default. The sun/moon switch saves your preferred theme in local storage; an explicit saved choice takes precedence over the default. Progress is stored only in the current browser's local storage. The progress dialog exports a JSON report and offers a confirmed reset. File-based local storage may be isolated per page in some browsers; a static host gives consistent shared storage. The site never issues a credential.

## Content and Provenance

Source captured on 2026-10-08 in [assets/source-journey.html](assets/source-journey.html), an untouched reference snapshot rather than a redesigned page. All six detailed competency records and 37 course records match the original verbatim in [assets/data.js](assets/data.js): 12 mandatory, 19 recommended, and six informational. All 68 original static headings and paragraphs are preserved across the four pages. Original wording, credential names, durations, route descriptions, proof exercises, HVE stages, fluency milestones, and caveats are unchanged. The source's two-anchor narrative and separately mandatory catalog entries are both retained. Functional route names and the proposed Avanade FDE Certified capstone remain unofficial.

No direct course URLs are invented where the source provides none. Those resources have a details dialog linking back to the original catalog. Source headings that looked like URLs but were not clickable are linked to their official LevelUp and HVE resources.

## Assets and Accessibility

- Workshop photograph: [Unsplash / photo-1521737711867-e3b97375f902](https://images.unsplash.com/photo-1521737711867-e3b97375f902), downloaded locally for reliable rendering.
- Icons: local Lucide 0.468.0 (ISC); motion: local GSAP 3.12.7 (its bundled license applies).
- Motion: staggered entrances and section reveals, pointer-responsive reflections, button glints, animated catalog filters and dialogs, and a reading-progress line. Decorative animations are finite; no continuously looping effects. Reduced-motion changes are respected immediately, including removal of pointer effects and active animation cleanup. Touch devices do not run pointer reflections. Glass surfaces have opaque fallbacks for browsers without backdrop filtering.
- Typography: Manrope and DM Sans through Google Fonts, with sans-serif fallbacks. An internet connection is needed for these fonts only; site content, image, icons, and interactions are local.
- Keyboard-accessible controls, native disclosure elements and modal dialogs, visible focus, skip links, labeled search and filters, responsive layouts, and reduced-motion support.
- JavaScript enables shared navigation, competency and catalog rendering, and local progress. Without JavaScript, the overview and HVE content remain readable, and competency/library pages link to the original source.

## Checks

Install verification-only dependencies with `npm install`, then run `npm test` for exact source parity, content counts, original headings and paragraphs, local links and assets, page structure, and JavaScript syntax. `node tests/verify.cjs --sync` mechanically regenerates shared data from the downloaded source snapshot before running those checks. These tools are not required to view or host the website.

Browser validation covers both themes at 320, 390, 768, 1440, and 1920 pixels; filters, route choices, disclosure panels, saved theme and progress, reset confirmation, and dialogs. Motion checks cover pointer reflections without overflow and live reduced-motion cleanup with no remaining active animations.