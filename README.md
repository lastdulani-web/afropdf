# AfroPDF

Free PDF reader with a Shona interface. Works offline after the first visit.

Developed by Last Dulani.

## Files
- `index.html` – the app
- `locales/sn.json`, `locales/en.json` – all interface text (edit these to fix or add wording)
- `manifest.webmanifest` + `icons/` – lets students install the app on their home screen
- `sw.js` – makes the app open with no internet

## Put it online for free (GitHub Pages)
1. Create a free account at github.com.
2. Click **+ → New repository**. Name it `afropdf`, keep it **Public**, click **Create repository**.
3. Click **uploading an existing file**. Drag in everything from this folder (index.html, sw.js, manifest.webmanifest, README.md and the `locales` and `icons` folders). Click **Commit changes**.
4. Go to **Settings → Pages**. Under "Branch" choose **main** and **/ (root)**, then **Save**.
5. After 1–2 minutes your app is live at `https://YOUR-USERNAME.github.io/afropdf/`

## Test offline (on a phone, in Chrome)
1. Open your link once while online and wait until it finishes loading.
2. Open a PDF to check it works.
3. Turn on airplane mode, close the tab, open the link again. AfroPDF should still open.
4. Chrome menu (⋮) → **Install app** (or **Add to Home screen**).

## Updating the app later
Change the files in GitHub, then in `sw.js` change `afropdf-v1` to `afropdf-v2` (and so on).
Phones pick up the new version the next time they open the app online, usually on the second open.

## Adding a language
1. Copy `locales/en.json` to `locales/xx.json` and translate the values (not the keys).
2. In `index.html`, add the language to the `LANGS` line, e.g. `{sn:"chiShona", en:"English", ny:"Chichewa"}`.
3. Add `"locales/xx.json"` to the `APP` list in `sw.js` and bump the version.
