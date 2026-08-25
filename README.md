# Mitchell Genova Photography — Portfolio Site

A single-page static portfolio site: no build tools, no dependencies. Open
`index.html` in a browser or serve it locally to preview.

## Preview locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000 in a browser.

## Adding more gallery photos

Every portfolio card currently shows a real photo (`images/gallery/`), and
the About section headshot is a real photo too (`images/headshot.jpg`). To
add another gallery card:

1. Add your image file to `images/gallery/` — pick any filename, e.g.
   `santorini.jpg`.
2. In `index.html`, copy an existing `<figure class="gallery-card">...
   </figure>` block in the `<section id="portfolio">` section and edit its
   image `src`/`alt` and `<figcaption>`:
   ```html
   <figure class="gallery-card">
     <button class="gallery-card-trigger" type="button">
       <img src="images/gallery/santorini.jpg" alt="Santorini, Greece">
     </button>
     <figcaption>Santorini, Greece</figcaption>
   </figure>
   ```
   The `gallery-card-trigger` button is what makes the photo open in the
   fullscreen lightbox — a `<figure>` without it (like a placeholder) stays
   inert and won't open on click.

   The CSS grid reflows automatically to fit however many cards you add.

   To make a card stand out as a larger "featured" tile in the grid, add
   `gallery-card--featured` alongside `gallery-card` on its `<figure>` (see
   the Rome and Barcelona cards for examples). It spans 2 grid columns at
   viewports 640px and wider; keep it to 1-2 cards at a time so the grid
   doesn't get lopsided, and note `grid-auto-flow: dense` on `.gallery-grid`
   will reorder cards visually to fill gaps around featured tiles.

## Hero background

The hero photo (`images/hero-rome.jpg`) is a separate, higher-resolution
export (2400px) from the same Colosseum shot used in the gallery
(`images/gallery/rome.jpg`), since it needs to look sharp full-bleed on
large screens. To swap it for a different photo, replace that file (same
name) or update the `url(...)` in `.hero::before` in `styles.css`. The dark
gradient overlay and light-colored hero text (`.hero h1`, `.hero .tagline`,
`.hero .scroll-cue`) are intentionally NOT theme variables — the hero always
uses a dark photo backdrop regardless of site theme, so its text stays
fixed light colors rather than following light/dark mode.

## Dark mode

The site has a light/dark toggle (sun/moon icon in the header). Colors live
as CSS custom properties in `styles.css` (`:root` for light, `:root[data-
theme="dark"]` for dark) — add or adjust a color there and it applies
everywhere it's used. A first-time visitor gets whichever theme matches
their system setting; once they click the toggle, their choice is saved in
`localStorage` and wins from then on. The small inline script in
`index.html`'s `<head>` sets the theme before the page renders, so there's
no flash of the wrong theme on load — don't move it or make it `async`.

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
