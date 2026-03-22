# TBN Website

Simple multi-page static website built with Vite (vanilla HTML/CSS/JS).

## Run locally

```bash
npm install
npm run dev
```

If you don't have Node/npm available, you can still serve the static files directly:

```bash
python3 -m http.server 8000
```

## Python environment (optional)

This project includes a Python virtual environment setup for any future backend/tools.

```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -U pip
pip install -r requirements.txt
```

## Build

```bash
npm run build
```

Output will be written to `dist/`.

## Customize

Most editable copy and links live in **`src/siteConfig.js`**:

- **`brandName`**, **`contact`** — logo text, mailto for the Contact button
- **`home`** — hero title/subtitle, “View Events” link, and the three highlight cards on `index.html`
- **`supportGroups.nav`** — Support Groups dropdown on every page (labels + `href`s)
- **`supportGroups.quote`**, **`sharedIntro`**, **`venue`**, **`whatToExpectHeading`** — shared banner/intro/address for all support pages
- **`supportGroups.pages.general` / `womens` / `mens`** — per-page titles, meeting copy, “What to expect”, and the detail card (schedule + anchor `id` for deep links)

`src/site.js` fills `[data-support-groups-nav]`, `[data-sg="…"]` slots, and home placeholders from that config. **With JavaScript disabled**, those areas stay empty; other pages (`about.html`, etc.) keep their copy in HTML.

- Pages: `index.html`, `about.html`, `people.html`, `events.html`, `support-groups-general.html`, `support-groups-womens.html`, `support-groups-mens.html`, `pride.html`
- Shared styles: `src/styles.css`

