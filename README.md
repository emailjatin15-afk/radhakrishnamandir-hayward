# Hari Om Shri Radha Krishna Mandir Hayward — Website

A responsive, bilingual (English / हिंदी) static website for the Hayward Hindu Temple.
It uses plain HTML, CSS, and vanilla JavaScript, with no framework and no build step.

```
/
├── index.html        Home
├── about.html        History, mission, deities, values, management
├── events.html       Weekly programs + upcoming festivals (rendered from JS data)
├── activities.html   Aarti/darshan timings, weekly schedule, services
├── gallery.html      Filterable photo grid + lightbox
├── donate.html       Donation form UI (payment integration point)
├── contact.html      Address, phone, hours, Google Map, contact form
├── css/styles.css    All styles (colour tokens at the top)
├── js/script.js      Translations, events data, menu, lightbox, animations, forms
└── assets/images/    Placeholder artwork + decorative motifs (SVG)
```

## Preview locally

**Option 1: open the file.** Double-click `index.html`. Everything works from `file://`, including the language toggle, lightbox, events, and forms. The Google Map and web fonts need an internet connection.

**Option 2: run a local server.** This is closer to how the live site behaves. From the project folder, run any one of these:

```bash
python -m http.server 8080
```

```bash
npx serve .
```

Then open http://localhost:8080.

To deploy, upload the whole folder to any static host, such as Netlify, Vercel, GitHub Pages, Cloudflare Pages, or a regular web host.

---

## Content the temple committee needs to fill in

Search the project for **`[PLACEHOLDER`** and **`[REPLACE WITH`**. On the page, placeholders show as dashed orange labels. Items to fill in:

- Aarti times, and times for Ramayan Path, Bhajans, and Katha
- Founding year, founders, history, and milestones (About page)
- Trustee and committee names (About page and the footer on every page)
- Which murtis are installed, beyond Radha Krishna
- Services offered, availability, and dakshina
- Temple email, parking, and photography policy
- Legal name for checks, Zelle details, and tax-exempt status/EIN
- Instagram and YouTube links (footer). Facebook is already linked.
- **Festival dates.** Dates in `EVENTS` are approximate and marked `tentative: true`. Check them against the panchang and set `tentative: false` once confirmed.

### Editing text and translations

Every translatable piece of text has a `data-i18n="key"` attribute in the HTML. Both languages live in the `TRANSLATIONS` object at the top of `js/script.js`.

- **To change wording,** update the English text in the HTML (what visitors without JavaScript see) **and** the matching key in `TRANSLATIONS.en` and `TRANSLATIONS.hi`.
- **To add a language,** add it to `LANGUAGES`, then add a `TRANSLATIONS.<code>` object with the same keys. Missing keys fall back to English. The header toggle cycles through all languages.

The header and footer are copied into each of the 7 pages, so the site works with no build step or server. If you change the nav or footer, make the same change in every page.

### Events

Edit the `EVENTS` array in `js/script.js`. Each entry has a `date` (`'YYYY-MM-DD'`, or `null` for "to be announced"), a `type` (`'festival'` or `'special'`), and `title`/`desc` in both languages. Past events are hidden automatically. The Home page shows the next 4 festivals.

### Photos

Replace the SVG placeholders in `assets/images/` with real photos, either with the same file names or by updating the `src` attributes:

| Where | File(s) | Suggested size |
|---|---|---|
| Home hero | `hero.svg` | 1920×1080, landscape |
| Home welcome | `welcome-altar.svg` | 1000×1200, portrait |
| About / deities | `about-temple.svg`, `deity-*.svg` | 800×1000, portrait |
| Gallery | `gallery-01…12` | ~800px thumbnails; set `data-full` to a ~1800px version |

Use compressed JPEG or WebP files. Gallery images already use `loading="lazy"`. Update each image's `alt` text to describe the real photo. To add a gallery photo, copy one `<button class="gallery-item">` block in `gallery.html`. Instructions are in a comment there.

---

## Integration points

### 1. Payments (Donate page)

The site **does not process payments** today. Submitting the form shows a message asking people to give in person or call. The hook is `PaymentGateway.startCheckout(donation)` in `js/script.js`, section 9. It receives:

```js
{ amount, currency: 'USD', frequency: 'one-time' | 'monthly', purpose, name, email, dedication, anonymous, language }
```

**Stripe (recommended):**
1. Create a serverless function, e.g. `POST /api/create-checkout-session`, that calls `stripe.checkout.sessions.create(...)` with your **secret key**. Store the key as an environment variable on the host, **never in `script.js`**.
2. In `startCheckout`, `fetch` that endpoint and redirect to the returned `session.url`.
3. Use `mode: 'subscription'` for monthly gifts.

Full example code is in the comments in section 9.

**PayPal:** load the PayPal JS SDK with your public `client-id` on `donate.html`, then render `paypal.Buttons()` using `donation.amount`. Keep the PayPal secret on a server.

Also confirm the example tier amounts and labels in `donate.html`, and the tax wording, with the committee.

### 2. Contact form

Messages are **not sent** today. The form validates the input, then tells the visitor to call. To connect it, set `ContactFormHandler.endpoint` in `js/script.js`, section 10, to a form service:

- **Formspree / Getform / Basin:** paste the endpoint URL. It works as-is, since the form data is sent as JSON.
- **Netlify Forms:** add `data-netlify="true" name="contact"` to the `<form>`.
- **Your own function:** email the committee through SendGrid, Mailgun, or SES, with API keys kept server-side.

### 3. Google Map

`contact.html` embeds `https://www.google.com/maps?q=29490+Mission+Blvd,+Hayward,+CA+94544&output=embed`, which needs no API key. To switch to the official Maps Embed API, replace the iframe `src` with
`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=29490+Mission+Blvd,Hayward,CA+94544`
and restrict the key to your domain in Google Cloud Console.

---

## Design and accessibility notes

- **Palette:** saffron/marigold and maroon, gold accents on a cream background, with teal and lotus-pink as secondary accents. Colours are defined as CSS variables at the top of `styles.css`.
- **Fonts:** Cormorant Garamond for headings, Mukta for body text (supports Devanagari), and Tiro Devanagari Hindi for Hindi headings. All load from Google Fonts, with system fallbacks.
- **Breakpoints:** 1024px (hamburger menu), 768px (single column), 480px (compact phone layout).
- **Accessibility:** skip link, semantic landmarks, `aria-current` on nav, keyboard-operable menu and lightbox (Esc, arrow keys, focus trap), labelled form fields with inline errors, and visible focus rings.
- **Motion:** scroll animations stay light. They turn off automatically for visitors who set "reduce motion" in their OS.
