# Ardmore Trailer, Inc. — Website

Next.js 16 site with a built-in admin panel for editing all website content.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

## Admin panel

Open **`/admin`** (e.g. `https://ardmoretrailer.com/admin`).

| | |
|---|---|
| Login email | `waqarriasat@gmail.com` |
| Initial password | the one you were given at hand-over, change it after your first login |

Everything visible on the public site can be edited: headings, sub-headings, paragraphs, buttons and their links, stats, lists (reviews, team, values, steps, features, sizes…), equipment types, services, photos, icons, contact details, SEO text and the 404 page. The layout, fonts and colours stay the same; only the content changes.

- **Save** publishes immediately. **Discard** undoes unsaved edits. **Restore original** resets a page to the original website text.
- The **search box** (top-left) finds any text on the site and jumps to the field that controls it.
- **Smart placeholders** such as `{phone}`, `{email}` or `{address}` can be typed into any text box. Change the phone number once under *Business Info* and every page updates.
- Images can be uploaded (PNG, JPG, WEBP, GIF, AVIF, up to 8 MB) or pasted as a link.

### Passwords

- **Change password:** *Account & Password* → **Email me a password change link**.
- **Forgot password:** on the sign-in page click **Forgot password?** and enter the admin email.

Both send a secure link to the admin email. The link works once and expires after 30 minutes. Changing the password signs out every other session.

## Configuration (environment variables)

| Variable | Needed for | Notes |
|---|---|---|
| `EMAIL_USER`, `EMAIL_PASS` | Password emails, contact/quote forms | Gmail address + [App Password](https://support.google.com/accounts/answer/185833). Already used by the forms. |
| `SITE_URL` | Password emails | Public address, e.g. `https://ardmoretrailer.com`. Used to build the reset link. Recommended. |
| `ADMIN_SESSION_SECRET` | Optional | Long random string for signing login cookies. If unset, one is generated and stored with the admin data. |
| `ADMIN_EMAIL` | Optional | Admin login email for a fresh install (default `waqarriasat@gmail.com`). |
| `SMTP_HOST`, `SMTP_PORT` | Optional | Use a mail server other than Gmail (`smtp.gmail.com:465`). |
| `BLOB_READ_WRITE_TOKEN` | **Required on Vercel** | See *Hosting* below. |
| `BLOB_ACCESS` | Optional | `private` (default) or `public`, matching your Vercel Blob store. |
| `CMS_DATA_DIR` | Optional | Where admin data is stored on disk (default `./data`). |

In development without `EMAIL_USER`/`EMAIL_PASS`, the reset link is printed in the terminal instead of being emailed.

## Hosting

Admin edits (content, uploaded images and the admin login) have to be stored somewhere that survives restarts:

- **A normal Node server / VPS** (`npm run build && npm start`): data is saved to `./data`. Keep that folder when redeploying and include it in backups. It is git-ignored.
- **Vercel:** the server disk is read-only. In the Vercel dashboard go to **Storage → Create → Blob**, connect it to this project (this adds `BLOB_READ_WRITE_TOKEN`), then redeploy. Without it the admin panel shows a message that it cannot save.

## Code map

| Path | What it is |
|---|---|
| `src/app/lib/content/defaults.js` | Original site content. Used until something is saved, and by *Restore original*. |
| `src/app/admin/schema.js` | Admin form definitions (labels, help text, field types). |
| `src/app/admin/editor/` | Admin editor UI. |
| `src/app/lib/server/` | Storage (disk / Vercel Blob), content loading, authentication, email. |
| `src/app/actions/admin.js` | Login, logout, password reset and save actions. |
| `src/app/api/admin/upload`, `src/app/media/[name]` | Image upload and serving. |

To make a new piece of text editable: add a default to `defaults.js`, add a field to `schema.js`, and render it from the content in the component.
