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
