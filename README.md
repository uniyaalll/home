# UNIYAALLL

Link-in-bio homepage + finder-style portfolio (tr.af replica), branded **UNIYAALLL**.

## Live site (GitHub Pages)

After Pages is enabled and this workflow has deployed:

**https://uniyaalll.github.io/home/**

### Edit the link-in-bio

Change brand, tagline, and links in:

**https://github.com/uniyaalll/home/edit/main/src/data/bio.ts**

Pushes to `main` rebuild and redeploy automatically.

## Features

- Responsive link-in-bio at `/` (theme toggle, socials, featured works)
- Finder-style sidebar with Works, Artifacts, Notes, Sounds, and links
- Notes (`100`, `6`, `music`, `system`) and Sounds radio players
- Dark / light mode via `uniyaalll-theme` localStorage

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build (static)

```bash
npm run build   # writes to out/
npx serve out
```

For GitHub Pages builds, set `GITHUB_PAGES=true` (adds basePath `/home`).
