# my-resume

A personal resume website for **Leonhail L. Paypa**, built with Next.js 15 + MUI v6.
Public view-only homepage, private admin edit page (GitHub OAuth, single-user),
and a "Download PDF" button that generates a PDF identical in style to the website.

## Features

- Single-page resume styled to match the printed PDF design
- View-only public page at `/`
- Private edit page at `/admin` (only your GitHub account can sign in)
- Profile photo upload (Vercel Blob)
- Edit every section in a friendly form (skills, work history, education, projects)
- PDF download via `/api/resume-pdf` — same layout, colors, and fonts as the web page
- All content stored in Vercel Postgres — edits go live without redeploying

## Tech stack

- **Next.js 15** (App Router) + **TypeScript**
- **MUI v6** with Emotion
- **Auth.js v5** (`next-auth@beta`) — GitHub provider, single admin lock
- **Drizzle ORM** + **Vercel Postgres**
- **Vercel Blob** for photo storage
- **@react-pdf/renderer** for the PDF
- **react-hook-form** for the admin form
- Fonts: **EB Garamond** (serif) + **Inter** (sans), via `next/font`

---

## 1. Local setup

```bash
cd my-resume
npm install
cp .env.local.example .env.local
```

Fill in `.env.local` (see "Environment variables" below).

Then run the dev server:

```bash
npm run dev
```

Open http://localhost:3000 — you'll see the resume rendered with the seeded default content (your existing PDF data).

> **Note:** without a database configured, the page falls back to in-memory defaults so you can still preview the layout. You won't be able to save edits until Postgres is wired up.

---

## 2. Set up GitHub OAuth (for admin login)

1. Go to https://github.com/settings/developers → **New OAuth App**
2. Fill in:
   - **Application name**: `my-resume (local)`
   - **Homepage URL**: `http://localhost:3000`
   - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`
3. Click **Register application**, then **Generate a new client secret**
4. Copy the **Client ID** and **Client Secret** into `.env.local`:
   ```
   AUTH_GITHUB_ID=...
   AUTH_GITHUB_SECRET=...
   ```
5. Set your GitHub username (lowercase) so only you can sign in:
   ```
   ADMIN_GITHUB_USERNAME=leonhail-nell
   ```
6. Generate `AUTH_SECRET`:
   ```bash
   openssl rand -base64 32
   ```

For production, repeat with a second OAuth app pointing at your real domain
(e.g., `https://your-domain.com/api/auth/callback/github`).

---

## 3. Set up Vercel Postgres (local + prod)

### In production (Vercel)
1. Push this repo to GitHub
2. Import it in Vercel
3. In the project's **Storage** tab → **Create** → **Postgres** → connect it
4. Vercel auto-injects `POSTGRES_URL` and friends. No manual env vars needed.

### For local development
1. In your Vercel project → Storage → your Postgres → **`.env.local`** tab
2. Copy the snippet into your local `.env.local`
3. Push the schema to the DB:
   ```bash
   npm run db:push
   ```
   This creates the `resume` table.

---

## 4. Set up Vercel Blob (for photo upload)

1. In Vercel project → **Storage** → **Create** → **Blob** → connect it
2. `BLOB_READ_WRITE_TOKEN` is auto-injected in production
3. For local dev, copy the token from the Blob dashboard into `.env.local`

---

## 5. Environment variables (full list)

```
AUTH_SECRET=<openssl rand -base64 32>
AUTH_URL=http://localhost:3000
AUTH_GITHUB_ID=...
AUTH_GITHUB_SECRET=...
ADMIN_GITHUB_USERNAME=leonhail-nell

POSTGRES_URL=...
POSTGRES_URL_NON_POOLING=...

BLOB_READ_WRITE_TOKEN=...
```

In Vercel production, set the same vars in **Project Settings → Environment Variables**
(except `POSTGRES_*` and `BLOB_READ_WRITE_TOKEN`, which are auto-injected).
Don't forget to set `AUTH_URL` to your production domain.

---

## 6. Editing your resume

1. Go to `/admin/login`
2. Click **Sign in with GitHub** → only your configured GitHub account is allowed in
3. Edit any field, upload a photo, click **Save**
4. Public `/` page reflects the changes immediately

The admin link is **not** shown anywhere on the public page — go to `/admin` directly when you want to edit.

---

## 7. Deploy to Vercel

```bash
git init
git add .
git commit -m "initial commit"
git remote add origin git@github.com:<you>/my-resume.git
git push -u origin main
```

Then in Vercel: **New Project → Import Git Repository → my-resume**.
Set env vars (see above), deploy. Add a custom domain in **Settings → Domains** when ready.

---

## File structure

```
src/
├── app/
│   ├── layout.tsx              MUI ThemeProvider + fonts
│   ├── page.tsx                public view page (/)
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts
│   │   ├── resume-pdf/route.tsx        PDF generation
│   │   └── admin/
│   │       ├── save/route.ts           save resume content (auth required)
│   │       └── upload/route.ts         photo upload (auth required)
│   └── admin/
│       ├── layout.tsx
│       ├── page.tsx                    edit form
│       └── login/page.tsx              "Sign in with GitHub"
├── components/
│   ├── view/                           public resume rendering
│   └── admin/                          edit form sections
├── lib/
│   ├── auth.ts          Auth.js config (GitHub provider + lock)
│   ├── db.ts            Drizzle client
│   ├── schema.ts        Drizzle schema (single `resume` row)
│   ├── resume.ts        getResume() / saveResume()
│   ├── blob.ts          uploadPhoto()
│   └── theme.ts         MUI theme + fonts
├── pdf/
│   └── ResumePDF.tsx    @react-pdf/renderer document
├── types/
│   └── resume.ts        ResumeData type + DEFAULT_RESUME seed
└── middleware.ts        protects /admin/* routes
```

---

## Useful scripts

```bash
npm run dev          # local dev server
npm run build        # production build
npm run start        # run prod build locally
npm run db:generate  # generate a Drizzle migration from schema.ts
npm run db:push      # push schema to the configured Postgres
npm run db:studio    # open Drizzle Studio (DB browser)
```

---

## Troubleshooting

- **"Sign-in failed"** → Your GitHub username doesn't match `ADMIN_GITHUB_USERNAME`. Check it's lowercase.
- **Page shows seeded defaults instead of your edits** → DB isn't configured or the row hasn't been written yet. Run `npm run db:push` and try saving from `/admin`.
- **PDF download fails** → Most likely the EB Garamond font URL is unreachable. Check Vercel function logs.
- **Photo upload fails** → `BLOB_READ_WRITE_TOKEN` is missing. Add it to env vars.
