# Updating the website (no coding needed)

This guide is for temple volunteers. You can update the **Activities page** and the
**Photo Gallery** from a phone or a laptop, using a web form. No software to install.

The live site: <https://emailjatin15-afk.github.io/radhakrishnamandir-hayward/>

After you save a change, the website updates itself in about **1–2 minutes**.
Refresh the page in your browser to see it.

---

## First-time setup (once per person, 5 minutes)

1. Create a free GitHub account at <https://github.com> if you don't have one.
   Send your GitHub username to whoever manages the temple website, and ask them to
   add you to the repository (Settings → Collaborators → Add people).
2. Go to **<https://app.pagescms.org>** and click **Sign in with GitHub**.
3. Approve access to the repository **radhakrishnamandir-hayward**.
4. You'll see the temple website listed. Open it. Two sections appear:
   - **Activities page**
   - **Photo gallery**

Bookmark <https://app.pagescms.org> on your phone. That's the only link you need.

---

## Changing aarti times or the weekly schedule

1. Open **Activities page** in Pages CMS.
2. **Daily timings → Timing rows**: each row has a name in English, the same name in
   Hindi, and a time. Change "9:00 AM" to whatever the real time is.
   - **Add a row**: click **Add item**, fill in all three boxes.
   - **Remove a row**: click the **✕**/trash icon on that row.
   - **Reorder rows**: drag them by the handle.
3. **Weekly schedule**: seven entries, one per day. Type the program name in English
   and Hindi. Leave both boxes empty for a day with no special program.
4. **Weekly program cards**: the three large cards (Ramayan Path, Bhajans & Kirtans,
   Katha). Each has: when, title, time, and a description, each in both languages.
5. Click **Save** (top right).

## Changing services

Open **Activities page → Services**. Each service card has a title, a short
description, and bullet points. Put **one bullet point per line** in the "Bullet
points" box — each line becomes a bullet on the website.

The "Button link" boxes are optional. Leave them empty for no button.

## Adding or changing photos

1. Open **Photo gallery** in Pages CMS.
2. Under **Photos**, click **Add item**.
3. Click the **Photo** box, then **Upload** — you can take a photo or pick one from
   your phone. Uploads go into the site's photo folder automatically.
4. Fill in:
   - **Caption (English)** and **Caption (Hindi)** — also read aloud to blind visitors.
   - **Category** — temple, festivals, programs, or community. This controls which
     filter button shows the photo.
   - **Size in the grid** — `normal`, `wide` (double width), or `tall` (double height,
     good for portrait photos).
5. Drag items to reorder. The first photo appears first on the page.
6. Click **Save**.

**Photo tips:** photos straight from a phone are large and slow the page down. If you
can, resize to about 1600 pixels wide before uploading. Avoid photos of people who
haven't agreed to appear on a public website.

---

## What you should NOT change here

- The words `_en` and `_hi` in field names — they mean English and Hindi.
- Anything marked `[PLACEHOLDER: ...]` is text waiting to be written. Replace the
  whole thing, including the square brackets.
- Other pages (Home, About, Events, Donate, Contact) are not in Pages CMS yet. Ask
  whoever manages the site to add them, or edit them on GitHub (below).

---

## If Pages CMS is unavailable

Everything above is stored in two plain files. You can edit them on GitHub directly:

- `data/activities.json` — timings, weekly schedule, programs, services
- `data/gallery.json` — photos and captions

On github.com, open the file, click the **pencil** icon, make the change, then click
**Commit changes**. Keep every quotation mark and comma exactly as they are — a
missing comma will stop the page from loading. If that happens, GitHub's
**History** tab lets you undo the last change.

Festival dates live in `js/script.js`, in the list named `EVENTS`.

---

## Checklist before saving

- [ ] Did you fill in **both** the English and Hindi boxes?
- [ ] Are times written the same way as the others (`9:00 AM`, not `9 am`)?
- [ ] For photos: caption filled in, category chosen?

After saving, open the live site and check the page. If something looks wrong, open
**History** in Pages CMS or GitHub and restore the previous version.
