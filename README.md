# Mitchell Genova Photography — Portfolio Site

A single-page static portfolio site: no build tools, no dependencies. Open
`index.html` in a browser or serve it locally to preview.

## Preview locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000 in a browser.

## Before you launch: things to personalize

Search the project for these placeholders and replace them:

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
