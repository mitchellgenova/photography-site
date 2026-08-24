# Photography Portfolio Site — Design Spec

Date: 2026-08-23

## Purpose

A basic personal photography portfolio site to help the user land side-gig
work, starting with real estate listing photography. The user does not yet
have real estate photos and plans to shoot some once they get a house. They
do have travel photos (Europe, Thailand) but hadn't organized/exported them
yet at the time of this spec.

## Goals

- Present the user as a credible photographer to prospective real estate
  clients, using existing travel work as proof of skill/eye.
- Clearly advertise real estate photography as an offered service, even
  before sample real estate photos exist.
- Be simple to stand up, host for free, and maintain with no build tooling.
- Be easy to update later: swapping in real photos, adding a real estate
  gallery once shots exist, wiring up a real contact form endpoint.

## Non-Goals (v1)

- Image lightbox/zoom interactions
- Blog or CMS-backed content
- Multi-page routing / client-side router
- Analytics/tracking
- A populated real estate gallery (no photos exist yet)

## Tech Stack

- Plain static HTML/CSS/JS — no framework, no build step, no dependencies.
- Hosting: GitHub Pages, serving `index.html` from the repo root.
- Contact form: [Formspree](https://formspree.io) free tier — form POSTs
  directly to a Formspree endpoint, no backend server required.

## Site Structure

Single-page site (`index.html`) with anchor-linked scroll sections. Style:
minimal & light — white/off-white background, clean sans-serif typography,
generous whitespace, photography-forward layout.

### 1. Header / Nav
- Sticky header, minimal.
- Site title/name on the left, nav links (Portfolio, Services, About,
  Contact) on the right.
- Collapses to a simple toggled mobile menu below a breakpoint (~640px).

### 2. Hero
- User's name, short tagline (e.g. "Photography for real estate & beyond").
- Scroll-down affordance pointing at the Portfolio section.

### 3. Portfolio Gallery
- Responsive CSS grid of photo cards (e.g. `auto-fill`, `minmax`).
- No real photo files exist yet. Each card renders as a **labeled
  placeholder box**: a fixed-aspect-ratio `div` with a muted background
  color and an overlaid caption (e.g. "Santorini, Greece — replace me"),
  NOT a broken `<img>` tag and NOT a borrowed stock photo. This avoids the
  site ever looking "finished" with imagery that isn't the user's own work.
- Markup for each card is deliberately structured so that swapping in a
  real photo later is a small, documented edit (see "Swapping in real
  photos" below) — no CSS/JS changes required.

### 4. Services
- Leads with **Real Estate Photography** as the primary, actively-booked
  service (e.g. "Now booking — interior, exterior & listing-ready photos to
  help your property stand out").
- Secondary services (travel/event/portrait-style work) referenced as
  demonstrated by the portfolio gallery, not necessarily separately booked.
- No fixed pricing table in v1 — copy directs interested clients to the
  contact form.

### 5. About
- Short bio (1–2 paragraphs, placeholder copy for the user to personalize).
- Placeholder headshot box (same placeholder-box pattern as gallery cards).

### 6. Contact
- Real HTML form: name, email, message fields.
- `<form>` `action` points at a Formspree endpoint
  (`https://formspree.io/f/{FORM_ID}`), method `POST`.
- `{FORM_ID}` is a placeholder the user must fill in after creating a free
  Formspree account and form. This is called out clearly in the README and
  as an inline HTML comment near the form.
- Basic honeypot field for spam mitigation (a hidden input real users won't
  fill in; Formspree also has its own spam filtering).

### 7. Footer
- Social links (e.g. Instagram — placeholder href for user to fill in).
- Copyright line.

## Files

```
/
├── index.html
├── styles.css
├── script.js
├── images/
│   └── gallery/        (empty; where real photo files go later)
├── README.md            (setup + how to swap placeholders for real content)
└── docs/superpowers/specs/2026-08-23-photography-portfolio-design.md
```

## JavaScript Scope (kept minimal)

- Mobile nav menu toggle (open/close on small screens).
- Smooth scroll for anchor nav links (progressive enhancement — plain
  anchor links must still work if JS fails to load).
- No other interactivity in v1.

## Swapping In Real Photos Later

Documented in README:
1. Add image files to `images/gallery/`.
2. For each placeholder card in `index.html`, replace the placeholder `div`
   with an `<img>` tag pointing at the new file, keeping the existing
   `<figure>`/caption structure so styling continues to apply unchanged.
3. Same pattern applies to the About section headshot placeholder.

## Deployment

- Repo is git-initialized locally as part of this work.
- GitHub remote creation and `git push` are **not** performed automatically
  — those are user-facing/shared-system actions the user should explicitly
  approve when ready to publish.
- Once pushed to GitHub, the user enables GitHub Pages in repo Settings →
  Pages, source = root of the default branch.

## Testing / Verification

- Since this is static HTML/CSS/JS with no build step, verification is:
  - Serve locally (e.g. `python3 -m http.server`) and visually check layout
    at desktop and mobile widths.
  - Confirm nav links scroll to the correct sections.
  - Confirm mobile menu opens/closes.
  - Confirm the contact form's `action` placeholder is clearly marked as
    needing the user's real Formspree ID before go-live.
  - No broken image icons anywhere (placeholder boxes are pure CSS, not
    `<img src>` pointing at nonexistent files).
