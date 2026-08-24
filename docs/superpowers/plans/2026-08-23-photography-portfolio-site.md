# Photography Portfolio Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page static photography portfolio site (HTML/CSS/JS, no build tooling) that markets the user for real-estate photography gigs while showcasing existing travel photography as proof of skill.

**Architecture:** One `index.html` with anchor-linked scroll sections (Hero, Portfolio, Services, About, Contact, Footer), styled by one `styles.css`, with a small `script.js` handling the mobile nav toggle and smooth-scroll navigation. No framework, no package manager, no build step. Deployed later via GitHub Pages; a Formspree endpoint handles the contact form without a backend.

**Tech Stack:** Plain HTML5, CSS3 (custom properties, Flexbox/Grid), vanilla JS (no dependencies). Formspree (free tier, external, config-only) for form submission.

**Spec:** `docs/superpowers/specs/2026-08-23-photography-portfolio-design.md`

## Global Constraints

- No build tools, no npm dependencies, no JS framework — plain static HTML/CSS/JS only.
- No lightbox/zoom, blog/CMS, client-side routing, or analytics in v1.
- No real photo files exist yet — every gallery/headshot image must render as a labeled placeholder `div` (never a `<img src>` pointing at a nonexistent file, never a borrowed stock photo).
- The Formspree form ID is a literal `YOUR_FORM_ID` placeholder, clearly marked inline and in the README as something the user must replace before go-live.
- Personalized copy (name, bio, social handle) uses bracket placeholders like `[Your Name]`, called out in the README as "personalize before launch" — this is copy content, not a plan placeholder, and is intentional per spec.
- Mobile breakpoint: layouts collapse to single-column / hamburger nav below `640px` viewport width.
- Every interactive JS behavior (nav toggle, smooth scroll) must degrade gracefully if JS fails to load (plain anchor links still work).

---

## Design Reference (shared across tasks)

**Color/type system (defined in Task 1, used everywhere after):**
```css
:root {
  --color-bg: #fdfdfb;
  --color-bg-alt: #f4f3ef;
  --color-text: #1a1a1a;
  --color-muted: #6b6b6b;
  --color-border: #e2e0da;
  --color-placeholder-bg: #dedad2;
  --color-placeholder-text: #6b6b6b;
  --font-body: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  --max-width: 1100px;
}
```

**Placeholder image pattern (used in Portfolio and About tasks):**
```html
<div class="placeholder-img" role="img" aria-label="Placeholder photo — Santorini, Greece">
  <span class="placeholder-label">Santorini, Greece — replace me</span>
</div>
```
```css
.placeholder-img {
  background-color: var(--color-placeholder-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: var(--color-placeholder-text);
  font-size: 0.85rem;
  padding: 1rem;
}
```
This pattern is documented in the README so the user can later delete the `.placeholder-img` div and drop in `<img src="images/gallery/santorini.jpg" alt="Santorini, Greece">` in its place, keeping the surrounding `<figure>`/`<figcaption>` untouched.

---

### Task 1: Project Scaffold

**Files:**
- Create: `index.html`
- Create: `styles.css`
- Create: `script.js`
- Create: `images/gallery/.gitkeep`
- Create: `.gitignore`

**Interfaces:**
- Consumes: nothing (first task)
- Produces: base HTML document with `<head>`, empty `<main>`, `<script src="script.js">` at end of `<body>`; CSS reset + custom properties (`--color-bg`, `--color-text`, `--font-body`, etc. from Design Reference above) applied globally; empty `script.js` file ready for later tasks to append to.

- [ ] **Step 1: Create the HTML skeleton**

Create `index.html`:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[Your Name] Photography</title>
  <meta name="description" content="Photography portfolio and real estate photography services.">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <main>
  </main>
  <script src="script.js"></script>
</body>
</html>
```

- [ ] **Step 2: Create the CSS reset + design tokens**

Create `styles.css`:
```css
:root {
  --color-bg: #fdfdfb;
  --color-bg-alt: #f4f3ef;
  --color-text: #1a1a1a;
  --color-muted: #6b6b6b;
  --color-border: #e2e0da;
  --color-placeholder-bg: #dedad2;
  --color-placeholder-text: #6b6b6b;
  --font-body: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  --max-width: 1100px;
}

*, *::before, *::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: var(--font-body);
  background-color: var(--color-bg);
  color: var(--color-text);
  line-height: 1.5;
}

h1, h2, h3 {
  line-height: 1.2;
  margin: 0 0 0.5em;
}

p {
  margin: 0 0 1em;
}

a {
  color: inherit;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

- [ ] **Step 3: Create empty script.js and folder structure**

Create `script.js`:
```js
document.addEventListener('DOMContentLoaded', () => {
});
```

Create `images/gallery/.gitkeep` (empty file, keeps the folder in git until real photos are added).

Create `.gitignore`:
```
.DS_Store
```

- [ ] **Step 4: Verify structure**

Run: `ls index.html styles.css script.js images/gallery/.gitkeep .gitignore`
Expected: all five paths listed, no "No such file" errors.

Run: `python3 -m http.server 8000 --directory "/Users/mitchellgenova/Documents/GitHub/Photography Site"` (leave running), then open `http://localhost:8000` in a browser.
Expected: blank off-white (`#fdfdfb`) page, browser tab title reads "[Your Name] Photography", no console errors.

- [ ] **Step 5: Commit**

```bash
git add index.html styles.css script.js images/gallery/.gitkeep .gitignore
git commit -m "Scaffold static site: base HTML shell, CSS tokens, empty JS"
```

---

### Task 2: Header, Nav, Mobile Menu Toggle, Hero

**Files:**
- Modify: `index.html` (inside `<main>`, and add `<header>` before `<main>`)
- Modify: `styles.css` (append)
- Modify: `script.js` (append inside the `DOMContentLoaded` handler)

**Interfaces:**
- Consumes: `--color-*`/`--font-body`/`--max-width` tokens from Task 1; `DOMContentLoaded` handler shell from Task 1.
- Produces: header element id `siteHeader`; nav toggle button `#navToggle` with `aria-expanded`; nav element `#siteNav` containing anchor links to `#portfolio`, `#services`, `#about`, `#contact`; hero section `#top`. Later tasks (Portfolio, Services, About, Contact) must use those exact anchor ids as their section `id` attributes so nav links resolve. Task 7 (smooth scroll) attaches click listeners to `.site-nav a`.

- [ ] **Step 1: Add header + nav + hero markup**

In `index.html`, replace:
```html
<body>
  <main>
  </main>
  <script src="script.js"></script>
</body>
```
with:
```html
<body>
  <header class="site-header" id="siteHeader">
    <div class="header-inner">
      <a href="#top" class="logo">[Your Name] Photography</a>
      <button class="nav-toggle" id="navToggle" aria-expanded="false" aria-controls="siteNav">
        <span class="nav-toggle-bar"></span>
        <span class="nav-toggle-bar"></span>
        <span class="nav-toggle-bar"></span>
        <span class="sr-only">Menu</span>
      </button>
      <nav class="site-nav" id="siteNav">
        <a href="#portfolio">Portfolio</a>
        <a href="#services">Services</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </nav>
    </div>
  </header>

  <main>
    <section id="top" class="hero">
      <h1>[Your Name]</h1>
      <p class="tagline">Photography for real estate &amp; beyond</p>
      <a href="#portfolio" class="scroll-cue">Scroll to see the work &darr;</a>
    </section>
  </main>
  <script src="script.js"></script>
</body>
```

- [ ] **Step 2: Style header, nav, mobile toggle, hero**

Append to `styles.css`:
```css
.site-header {
  position: sticky;
  top: 0;
  background-color: var(--color-bg);
  border-bottom: 1px solid var(--color-border);
  z-index: 10;
}

.header-inner {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-weight: 600;
  text-decoration: none;
  font-size: 1.1rem;
}

.nav-toggle {
  display: none;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
}

.nav-toggle-bar {
  width: 22px;
  height: 2px;
  background-color: var(--color-text);
}

.site-nav {
  display: flex;
  gap: 1.5rem;
}

.site-nav a {
  text-decoration: none;
  color: var(--color-text);
  font-size: 0.95rem;
}

.site-nav a:hover {
  color: var(--color-muted);
}

@media (max-width: 640px) {
  .nav-toggle {
    display: flex;
  }

  .site-nav {
    display: none;
    flex-direction: column;
    gap: 0;
    width: 100%;
    padding: 0.5rem 1.5rem 1rem;
  }

  .site-nav.is-open {
    display: flex;
  }

  .site-nav a {
    padding: 0.6rem 0;
    border-top: 1px solid var(--color-border);
  }

  .header-inner {
    flex-wrap: wrap;
  }
}

.hero {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 6rem 1.5rem 4rem;
  text-align: center;
}

.hero h1 {
  font-size: 2.5rem;
}

.hero .tagline {
  color: var(--color-muted);
  font-size: 1.1rem;
  margin-bottom: 2rem;
}

.hero .scroll-cue {
  text-decoration: none;
  color: var(--color-muted);
  font-size: 0.9rem;
}
```

- [ ] **Step 3: Add mobile nav toggle JS**

In `script.js`, replace:
```js
document.addEventListener('DOMContentLoaded', () => {
});
```
with:
```js
document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('navToggle');
  const siteNav = document.getElementById('siteNav');

  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
});
```

- [ ] **Step 4: Verify**

Run: `grep -c 'id="navToggle"' index.html && grep -c 'id="siteNav"' index.html && grep -c 'id="top"' index.html`
Expected: each command prints `1`.

With the local server still running (`python3 -m http.server 8000`), reload `http://localhost:8000`.
Expected: sticky header with logo + 4 nav links visible on desktop width; resizing the browser below 640px hides the nav links and shows a hamburger icon; clicking the hamburger toggles the nav links open/closed; hero shows "[Your Name]" heading, tagline, and a scroll-cue link.

- [ ] **Step 5: Commit**

```bash
git add index.html styles.css script.js
git commit -m "Add sticky header, mobile nav toggle, and hero section"
```

---

### Task 3: Portfolio Gallery Section

**Files:**
- Modify: `index.html` (insert new `<section id="portfolio">` inside `<main>`, after the hero `</section>`)
- Modify: `styles.css` (append)

**Interfaces:**
- Consumes: `.placeholder-img` pattern and `--color-placeholder-bg`/`--color-placeholder-text` tokens from Design Reference; `#portfolio` anchor target expected by Task 2's nav link.
- Produces: `<section id="portfolio">` containing `.gallery-grid` of `.gallery-card` `<figure>` elements, each with a `.placeholder-img` + `<figcaption>`. This exact `figure > .placeholder-img + figcaption` structure is what the README (Task 8) instructs the user to edit when swapping in real photos.

- [ ] **Step 1: Add gallery markup**

In `index.html`, insert immediately after the hero section's closing `</section>` (still inside `<main>`, before `</main>`):
```html
    <section id="portfolio" class="portfolio">
      <h2>Portfolio</h2>
      <div class="gallery-grid">
        <figure class="gallery-card">
          <div class="placeholder-img" role="img" aria-label="Placeholder photo — Santorini, Greece">
            <span class="placeholder-label">Santorini, Greece — replace me</span>
          </div>
          <figcaption>Santorini, Greece</figcaption>
        </figure>
        <figure class="gallery-card">
          <div class="placeholder-img" role="img" aria-label="Placeholder photo — Rome, Italy">
            <span class="placeholder-label">Rome, Italy — replace me</span>
          </div>
          <figcaption>Rome, Italy</figcaption>
        </figure>
        <figure class="gallery-card">
          <div class="placeholder-img" role="img" aria-label="Placeholder photo — Paris, France">
            <span class="placeholder-label">Paris, France — replace me</span>
          </div>
          <figcaption>Paris, France</figcaption>
        </figure>
        <figure class="gallery-card">
          <div class="placeholder-img" role="img" aria-label="Placeholder photo — Bangkok, Thailand">
            <span class="placeholder-label">Bangkok, Thailand — replace me</span>
          </div>
          <figcaption>Bangkok, Thailand</figcaption>
        </figure>
        <figure class="gallery-card">
          <div class="placeholder-img" role="img" aria-label="Placeholder photo — Chiang Mai, Thailand">
            <span class="placeholder-label">Chiang Mai, Thailand — replace me</span>
          </div>
          <figcaption>Chiang Mai, Thailand</figcaption>
        </figure>
        <figure class="gallery-card">
          <div class="placeholder-img" role="img" aria-label="Placeholder photo — Phi Phi Islands, Thailand">
            <span class="placeholder-label">Phi Phi Islands, Thailand — replace me</span>
          </div>
          <figcaption>Phi Phi Islands, Thailand</figcaption>
        </figure>
      </div>
    </section>
```

- [ ] **Step 2: Style the gallery grid**

Append to `styles.css`:
```css
.portfolio {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 3rem 1.5rem;
}

.portfolio h2 {
  margin-bottom: 1.5rem;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1.25rem;
}

.gallery-card {
  margin: 0;
}

.gallery-card .placeholder-img {
  aspect-ratio: 4 / 3;
  border-radius: 4px;
}

.gallery-card figcaption {
  margin-top: 0.5rem;
  font-size: 0.85rem;
  color: var(--color-muted);
}
```

Also append the shared placeholder rule from the Design Reference (not yet added in Task 1, needed now):
```css
.placeholder-img {
  background-color: var(--color-placeholder-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: var(--color-placeholder-text);
  font-size: 0.85rem;
  padding: 1rem;
}
```

- [ ] **Step 3: Verify**

Run: `grep -c 'class="gallery-card"' index.html`
Expected: `6`.

Reload `http://localhost:8000` in the browser.
Expected: a 6-card grid of gray placeholder boxes, each labeled with a location and "— replace me", each with a caption underneath; grid reflows to fewer columns as the window narrows; no broken image icons anywhere (there are no `<img>` tags yet, only styled `div`s).

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "Add portfolio gallery section with labeled placeholder photos"
```

---

### Task 4: Services Section

**Files:**
- Modify: `index.html` (insert new `<section id="services">` after the portfolio section's closing `</section>`)
- Modify: `styles.css` (append)

**Interfaces:**
- Consumes: `--max-width`, `--color-muted` tokens; `#services` anchor target expected by Task 2's nav link.
- Produces: `<section id="services">` with a primary real-estate block, secondary block, and `.cta-button` linking to `#contact` (the `#contact` id is produced by Task 6).

- [ ] **Step 1: Add services markup**

In `index.html`, insert immediately after the portfolio section's closing `</section>`:
```html
    <section id="services" class="services">
      <h2>Services</h2>
      <div class="service-primary">
        <h3>Real Estate Photography</h3>
        <p>Now booking — interior, exterior, and listing-ready photos to help your property stand out. Whether it's a single room or a full walkthrough, I'll work around your schedule to get shots that make listings pop.</p>
      </div>
      <div class="service-secondary">
        <h3>Also available</h3>
        <p>Travel, event, and portrait-style photography — see examples in the portfolio above.</p>
      </div>
      <a href="#contact" class="cta-button">Get in touch</a>
    </section>
```

- [ ] **Step 2: Style the services section**

Append to `styles.css`:
```css
.services {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 3rem 1.5rem;
  background-color: var(--color-bg-alt);
}

.service-primary,
.service-secondary {
  margin-bottom: 1.5rem;
}

.service-secondary p {
  color: var(--color-muted);
}

.cta-button {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: var(--color-text);
  color: var(--color-bg);
  text-decoration: none;
  border-radius: 4px;
  font-size: 0.95rem;
}

.cta-button:hover {
  opacity: 0.85;
}
```

- [ ] **Step 3: Verify**

Run: `grep -c 'id="services"' index.html`
Expected: `1`.

Reload `http://localhost:8000`.
Expected: a shaded section below the gallery with a "Real Estate Photography" heading and booking copy, a lighter "Also available" block underneath, and a dark "Get in touch" button; clicking the button jumps to (currently empty) `#contact` location.

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "Add services section leading with real estate photography"
```

---

### Task 5: About Section

**Files:**
- Modify: `index.html` (insert new `<section id="about">` after the services section's closing `</section>`)
- Modify: `styles.css` (append)

**Interfaces:**
- Consumes: `.placeholder-img` pattern; `#about` anchor target expected by Task 2's nav link.
- Produces: `<section id="about">` with a `.placeholder-headshot` (using the same `.placeholder-img` base class) and bio copy. The headshot placeholder follows the same swap pattern documented for the gallery.

- [ ] **Step 1: Add about markup**

In `index.html`, insert immediately after the services section's closing `</section>`:
```html
    <section id="about" class="about">
      <h2>About</h2>
      <div class="about-inner">
        <div class="placeholder-img placeholder-headshot" role="img" aria-label="Placeholder headshot photo">
          <span class="placeholder-label">Headshot — replace me</span>
        </div>
        <p>[Write a short bio here — who you are, how long you've been shooting, and what makes your eye for a property or a scene different. A couple of sentences is plenty.]</p>
      </div>
    </section>
```

- [ ] **Step 2: Style the about section**

Append to `styles.css`:
```css
.about {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 3rem 1.5rem;
}

.about-inner {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: flex-start;
}

.placeholder-headshot {
  width: 160px;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
}

@media (min-width: 640px) {
  .about-inner {
    flex-direction: row;
    align-items: center;
  }
}
```

- [ ] **Step 3: Verify**

Run: `grep -c 'id="about"' index.html`
Expected: `1`.

Reload `http://localhost:8000`.
Expected: circular gray placeholder headshot next to bio placeholder text; stacked vertically on narrow viewports, side-by-side above 640px.

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "Add about section with bio and headshot placeholder"
```

---

### Task 6: Contact Section + Footer

**Files:**
- Modify: `index.html` (insert new `<section id="contact">` after the about section's closing `</section>`, and add `<footer>` after `</main>`)
- Modify: `styles.css` (append)

**Interfaces:**
- Consumes: `#contact` anchor target expected by Task 2's nav link and Task 4's CTA button.
- Produces: `<section id="contact">` containing `.contact-form` (`name`, `email`, `message` fields + honeypot `_gotcha` field, `action="https://formspree.io/f/YOUR_FORM_ID"`); `<footer class="site-footer">` with a social link and copyright line. `YOUR_FORM_ID` and the Instagram href are the literal placeholder strings the README (Task 8) tells the user to replace.

- [ ] **Step 1: Add contact form + footer markup**

In `index.html`, insert immediately after the about section's closing `</section>` (still inside `<main>`):
```html
    <section id="contact" class="contact">
      <h2>Contact</h2>
      <!-- Replace YOUR_FORM_ID below with your own Formspree form ID.
           Sign up free at https://formspree.io, create a form, and copy its ID here. -->
      <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST" class="contact-form">
        <label for="name">Name</label>
        <input type="text" id="name" name="name" required>

        <label for="email">Email</label>
        <input type="email" id="email" name="email" required>

        <label for="message">Message</label>
        <textarea id="message" name="message" rows="5" required></textarea>

        <input type="text" name="_gotcha" class="honeypot" tabindex="-1" autocomplete="off" aria-hidden="true">

        <button type="submit">Send message</button>
      </form>
    </section>
```
Then, immediately after `</main>` (before `<script src="script.js"></script>`), add:
```html
  <footer class="site-footer">
    <!-- Replace with your real Instagram (or other) handle -->
    <a href="https://instagram.com/yourhandle" class="social-link">Instagram</a>
    <p>&copy; 2026 [Your Name]. All rights reserved.</p>
  </footer>
```

- [ ] **Step 2: Style the contact form and footer**

Append to `styles.css`:
```css
.contact {
  max-width: 500px;
  margin: 0 auto;
  padding: 3rem 1.5rem;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.contact-form label {
  font-size: 0.9rem;
  font-weight: 600;
  margin-top: 0.6rem;
}

.contact-form input,
.contact-form textarea {
  font-family: inherit;
  font-size: 1rem;
  padding: 0.6rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
}

.contact-form button {
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background-color: var(--color-text);
  color: var(--color-bg);
  border: none;
  border-radius: 4px;
  font-size: 0.95rem;
  cursor: pointer;
  align-self: flex-start;
}

.contact-form button:hover {
  opacity: 0.85;
}

.honeypot {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}

.site-footer {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 2rem 1.5rem 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-muted);
  font-size: 0.85rem;
}

.social-link {
  text-decoration: none;
  color: var(--color-text);
}
```

- [ ] **Step 3: Verify**

Run: `grep -c 'id="contact"' index.html && grep -c 'name="_gotcha"' index.html && grep -c 'class="site-footer"' index.html`
Expected: each prints `1`.

Reload `http://localhost:8000`.
Expected: contact form with Name/Email/Message fields and a "Send message" button (honeypot field not visibly on screen); footer below it with an Instagram link and copyright line. Tabbing through the form with the keyboard should skip the hidden honeypot field.

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "Add contact form (Formspree) and footer"
```

---

### Task 7: Smooth Scroll for Nav and CTA Links

**Files:**
- Modify: `script.js` (append inside the `DOMContentLoaded` handler)

**Interfaces:**
- Consumes: `.site-nav a` links from Task 2; `.cta-button` link from Task 4; section ids `#top`, `#portfolio`, `#services`, `#about`, `#contact` produced by Tasks 2–6.
- Produces: click-driven smooth scrolling for any in-page anchor link with a matching section id; no new ids/classes for later tasks to depend on (this is the last interactive behavior).

- [ ] **Step 1: Add smooth scroll JS**

In `script.js`, inside the existing `DOMContentLoaded` handler, after the `navToggle.addEventListener(...)` block, add:
```js
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href');
      const target = document.querySelector(targetId);
      if (!target) {
        return;
      }
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      if (siteNav.classList.contains('is-open')) {
        siteNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
```

The full `script.js` should now read:
```js
document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('navToggle');
  const siteNav = document.getElementById('siteNav');

  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href');
      const target = document.querySelector(targetId);
      if (!target) {
        return;
      }
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      if (siteNav.classList.contains('is-open')) {
        siteNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
});
```

- [ ] **Step 2: Verify**

Run: `grep -c "scrollIntoView" script.js`
Expected: `1`.

Reload `http://localhost:8000`. With the browser's DevTools console open:
Expected: clicking each nav link (Portfolio, Services, About, Contact) and the "Get in touch" button smoothly scrolls to the matching section with no console errors; on a narrow (mobile) viewport, clicking a nav link also closes the open mobile menu.

Then verify graceful degradation: comment out `<script src="script.js"></script>` in `index.html` temporarily, reload, and confirm clicking a nav link still jumps (instantly, not smoothly) to the right section via native anchor behavior. Restore the `<script>` tag afterward.
Expected: navigation still works without JS, just without the smooth animation.

- [ ] **Step 3: Commit**

```bash
git add script.js
git commit -m "Add smooth-scroll behavior for nav and CTA links"
```

---

### Task 8: README Documentation

**Files:**
- Create: `README.md`

**Interfaces:**
- Consumes: final file structure and placeholder patterns from all prior tasks (`.placeholder-img` swap pattern, `YOUR_FORM_ID`, `[Your Name]`/bio/Instagram placeholders, `images/gallery/` folder).
- Produces: nothing consumed by other tasks (final task).

- [ ] **Step 1: Write the README**

Create `README.md`:
```markdown
# [Your Name] Photography — Portfolio Site

A single-page static portfolio site: no build tools, no dependencies. Open
`index.html` in a browser or serve it locally to preview.

## Preview locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000 in a browser.

## Before you launch: things to personalize

Search the project for these placeholders and replace them:

- `[Your Name]` — appears in `index.html` (page title, header logo, hero
  heading, footer copyright) and in `README.md`'s title.
- The About section bio text in `index.html` (`<section id="about">`) —
  replace the bracketed placeholder paragraph with your real bio.
- `YOUR_FORM_ID` in the contact form's `action` attribute in `index.html`
  (`<section id="contact">`) — sign up for a free account at
  https://formspree.io, create a form, and paste its ID in place of
  `YOUR_FORM_ID`. Until you do this, the contact form will not deliver
  messages anywhere.
- `https://instagram.com/yourhandle` in the footer (`<footer
  class="site-footer">`) — replace with your real social link, or remove
  the `<a>` entirely if you don't want to link one.

## Swapping placeholder photos for real ones

The portfolio gallery and About headshot currently show labeled gray boxes
instead of real photos (there weren't any ready yet when this site was
built). To replace one:

1. Add your image file to `images/gallery/` (for gallery photos) — pick any
   filename, e.g. `santorini.jpg`.
2. In `index.html`, find the matching `<figure class="gallery-card">` block
   in the `<section id="portfolio">` section.
3. Delete its `<div class="placeholder-img" ...>...</div>` and replace it
   with:
   ```html
   <img src="images/gallery/santorini.jpg" alt="Santorini, Greece">
   ```
   Leave the surrounding `<figure>` and `<figcaption>` as they are — the
   existing CSS (`.gallery-card`, `figcaption`) will style the real photo
   the same way it styled the placeholder.
4. For the About section headshot, do the same inside `<section
   id="about">`: replace the `.placeholder-img.placeholder-headshot` div
   with an `<img>` tag pointing at your headshot file.

To add more gallery photos than currently exist, copy an existing
`<figure class="gallery-card">...</figure>` block in the portfolio section
and edit its image/caption — the CSS grid will automatically reflow to fit
more cards.

## Real estate gallery

There's no real-estate-specific gallery yet since no real estate photos
exist. Once you've shot some listings, you can either mix them into the
existing Portfolio grid or duplicate the `<section id="portfolio">` pattern
into a second section (and add a nav link for it) — whichever you'd
rather do at that point.

## Deploying to GitHub Pages

1. Create a new repository on GitHub and push this project to it:
   ```bash
   git remote add origin <your-repo-url>
   git push -u origin main
   ```
2. In the repository on GitHub, go to **Settings → Pages**.
3. Under "Build and deployment", set **Source** to "Deploy from a branch",
   branch `main`, folder `/ (root)`.
4. GitHub will publish the site at `https://<username>.github.io/<repo>/`
   within a minute or two.
```

- [ ] **Step 2: Verify**

Run: `grep -c 'YOUR_FORM_ID' README.md && grep -c 'python3 -m http.server' README.md`
Expected: both print at least `1`.

Read through `README.md` once against the actual `index.html` structure to confirm every referenced section id (`#about`, `#contact`, `#portfolio`), class (`.gallery-card`, `.placeholder-img`, `.placeholder-headshot`), and placeholder string (`YOUR_FORM_ID`, `[Your Name]`, `yourhandle`) still matches what's in the file.
Expected: no mismatches.

- [ ] **Step 3: Commit**

```bash
git add README.md
git commit -m "Add README with setup, personalization, and deploy instructions"
```

---

## Post-Plan (not part of this plan, user-initiated)

- Create the GitHub repository and push (`git remote add origin` + `git push`) — deliberately left to the user per the spec's Deployment section.
- Sign up for Formspree and replace `YOUR_FORM_ID`.
- Personalize `[Your Name]`, bio text, and social links.
- Shoot and swap in real travel and (later) real estate photos.
