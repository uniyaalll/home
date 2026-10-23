# UNIYAALLL — Complete Visual Identity & Implementation Spec

> **Purpose:** Hand this file (and the accompanying font + JSON) to another agent so they can recreate the UNIYAALLL website with pixel-faithful visual identity. This site is a replica of [tr.af](https://tr.af) with branding renamed from TRAF → **UNIYAALLL**.
>
> Pack contents:
> - `UNIYAALLL_DESIGN_SYSTEM.md` (this file)
> - `design-tokens.json` (machine-readable tokens)
> - `departure_mono-s.p.29iafaar4mfrt.woff2` (exact font file from tr.af)

---

## 1. Product summary

| Item | Value |
|------|--------|
| Brand name | **UNIYAALLL** |
| Handle | `@uniyaalll` |
| Genre | Personal portfolio / “finder” filesystem UI |
| Reference | https://tr.af |
| Stack used | Next.js App Router, React, Tailwind CSS |
| Default route | `/` → redirects to `/odyssey` |
| Skin | Flat window (`data-skin="flat"`): no outer window chrome inset, 0 radius |

### Information architecture / routes

```
/                    → redirect /odyssey
/works               → same as Odyssey preview
/odyssey             Works
/deximal
/life
/siphon
/streamius
/labs
/aeons               Artifacts
/anti
/based
/checks
/editions
/100                 Notes
/6
/music
/system
/lofi                Sounds (YouTube radio)
/soul
/ambient
```

Sidebar also has **links** (external, not pages):
- x.com → https://x.com/traf
- Instagram → https://instagram.com/traf
- GitHub → https://github.com/traf

---

## 2. Theme & color system

Two themes via `html[data-theme="dark"|"light"]`. Persist in `localStorage` key: `uniyaalll-theme`.

### Dark (default)

| Token | CSS variable | Value | Usage |
|-------|--------------|-------|--------|
| Background | `--color-bg` | `#000000` | Page / panels |
| Foreground | `--color-fg` | `#ffffff` | Active text, headings, brand |
| Muted | `--color-muted` | `#ffffffa3` ≈ `rgba(255,255,255,0.64)` | Inactive nav, body notes, breadcrumbs |
| Online | `--color-online` | `#00ff66` (`#0f6`) | Presence indicator |
| Line | `--color-line` | `#282828` | Borders, tree lines |
| Record line | `--color-record-line` | `#ffffff1f` | Radio concentric rings |
| Fill | `--color-fill` | `#ffffff0d` | Subtle fills / code chips |
| Glass | `--color-glass` | `#0a0a0a47` | Glass overlays |

### Light

| Token | Value |
|-------|--------|
| `--color-bg` | `#f4f4f4` |
| `--color-fg` | `#0a0a0a` |
| `--color-muted` | `#0a0a0aa3` ≈ `rgba(10,10,10,0.64)` |
| `--color-online` | `#00aa44` |
| `--color-line` | `#d0d0d0` |
| `--color-record-line` | `#0000001f` |
| `--color-fill` | `#0000000d` |
| `--color-glass` | `#ffffffa8` |

### Selection

```css
::selection {
  background: var(--color-fg);
  color: var(--color-bg);
}
```

### Color rules

- Inactive sidebar / breadcrumbs / captions secondary text → `muted`
- Active page / open folder summary / brand / note headings → `fg`
- Hover on muted text → `fg`
- Borders everywhere use `line` and **dashed** (global `* { border-style: dashed }`) unless explicitly solid

---

## 3. Typography — Departure Mono (exact)

### Font file (REQUIRED — do not substitute)

| Property | Value |
|----------|--------|
| Name | **Departure Mono** |
| Family CSS name | `departure` |
| File | `departure_mono-s.p.29iafaar4mfrt.woff2` (included in this pack) |
| Source on tr.af | `/_next/static/media/departure_mono-s.p.29iafaar4mfrt.woff2` |
| Format | WOFF2 / CFF |
| Size | 13912 bytes |
| Magic | `wOF2` |

**Do not use Inter, Roboto, Arial, system-ui, Geist, JetBrains Mono, or any other substitute as the primary face.** If the file fails to load, use the metric-matched fallback below so layout does not jump — but the real woff2 must ship.

### @font-face (copy exactly)

```css
@font-face {
  font-family: departure;
  src: url("/media/departure_mono-s.p.29iafaar4mfrt.woff2") format("woff2");
  font-display: swap;
}
@font-face {
  font-family: departure Fallback;
  src: local(Arial);
  ascent-override: 71.7%;
  descent-override: 19.56%;
  line-gap-override: 0%;
  size-adjust: 139.46%;
}
```

### Font stack

```css
--font-departure-mono: "departure", "departure Fallback";
--font-departure: var(--font-departure-mono);
font-family: var(--font-departure);
```

### Global type scale (body = entire UI)

| Property | Value | Notes |
|----------|--------|--------|
| `font-size` | `0.875rem` (**14px** at 16px root) | All UI text |
| `line-height` | `1.625` (**22.75px** at 14px) | Relaxed |
| `font-weight` | `400` | No bold UI; weight inherited |
| `letter-spacing` | `0` / `normal` | |
| `text-transform` | **`uppercase`** | Applied on `body` and inherited by ALL children |
| `font-style` | `normal` | |
| Antialiasing | `-webkit-font-smoothing: antialiased` | |
| Text rendering | `optimizeLegibility` | |

```css
body {
  font-family: var(--font-departure);
  font-size: 0.875rem;
  line-height: 1.625;
  font-weight: 400;
  letter-spacing: 0;
  text-transform: uppercase;
}
body * {
  font: inherit;
  letter-spacing: inherit;
  text-transform: inherit;
}
```

**Critical:** Source HTML may be sentence case; CSS `text-transform: uppercase` makes it display as ALL CAPS. Notes body is muted gray + uppercase (not white sentence case).

### Notes typography specifics

| Element | Color | Size | Margins |
|---------|-------|------|---------|
| Article body / `li` / `p` | `muted` (`#ffffffa3` dark) | 14px / 1.625 | `p/ol/ul` margin-block `1.5rem` (24px); `li` margin-block `0.75rem` (12px) |
| `h1` | `fg` (white/black) | same 14px (no size bump) | margin-bottom `2rem` (32px) |
| `h2+` | `fg` | same 14px | margin-top `3rem` (48px), margin-bottom `1.5rem` (24px) |
| Lists | | | `padding-left: 1.25rem` (20px); `ol` decimal, `ul` disc; markers muted |
| Links in notes | underline, offset 4px, decoration muted; hover → fg | | |

---

## 4. Layout geometry

### Shell

```
┌────────────────────────────────────────────────────────────┐
│ main > .desktop (h-dvh flex-col)                           │
│  └─ .finder-shell (flex-1)                                 │
│      └─ .finder (md:flex-row, h-full, overflow hidden)     │
│          ├─ aside.finder-sidebar                           │
│          │    ├─ nav (scrollable tree)                     │
│          │    └─ footer controls (pinned bottom)           │
│          └─ .finder-preview (flex-1 grid 1x1)              │
│               ├─ breadcrumb (overlay row 1 / col 1)        │
│               └─ .finder-content (scroll, same cell)       │
└────────────────────────────────────────────────────────────┘
```

### Spacing tokens

| Token | Value | Approx |
|-------|--------|--------|
| `--preview-pad` | `clamp(1rem, 3vw, 3rem)` | 16–48px |
| `--content-bottom` | `2.5rem` | 40px |
| `--bar-height` | `clamp(4rem, 7vw, 6rem)` | 64–96px |
| `--preview-fade` | `6rem` | 96px (top fade mask height) |
| `--sidebar-width` | `18rem` | **288px** desktop |
| `--window-radius` | `0px` (flat skin) | |
| `--row-radius` | `0px` (flat skin) | |
| Tailwind spacing unit | `0.25rem` | 4px |

### Desktop sidebar (≥768px)

| Property | Value |
|----------|--------|
| Width | `18rem` (288px) |
| Padding left | `1.5rem` (24px / `pl-6`) |
| Padding top | `1.125rem` (18px) |
| Padding bottom | `1.5rem` (24px) |
| Border | bottom on mobile; none on desktop right edge (content separates visually by layout) |
| Tree indent | `ml-2.5` (10px) + `pl-[calc(0.25rem*5.5-1px)]` ≈ 21px |
| Hierarchy lines | 1px vertical dashed via repeating gradient: `line` 0–3px, transparent 3–6px |
| Elbow connectors | 12px (`0.75rem`) horizontal dashed stubs at row midpoints |

### Sidebar row / folder summary

| Property | Value |
|----------|--------|
| Min height | `3rem` (**48px** / `min-h-12`) |
| Gap icon↔label | `0.75rem` (**12px** / `gap-3`) |
| Vertical padding (rows) | `0.75rem` (12px) py |
| Left padding (items) | `0.75rem` (12px / `pl-3`) |
| Icon size | `20×20` (`h-5 w-5`, viewBox 0 0 24 24) |
| Label optical nudge | `translate-y: 1px` on text spans |
| Default color | muted |
| Hover / current page | fg |
| Cursor | pointer |

### Brand header (sidebar top)

| Property | Value |
|----------|--------|
| Min height | 48px |
| Gap | 12px |
| Logo mark | 20×20 square with diagonal slash (filled fg) |
| Brand text | `UNIYAALLL` uppercase, fg |

### Sidebar footer controls

Pinned with `mt-auto`, not scrolled away.

| Control | Size | Style |
|---------|------|--------|
| Privacy `/` button | `24×24` (`size-6`) | 1px dashed border `line`, bg `bg`, text muted → hover fg |
| Theme toggle | `32×32` (`size-8`) | same; sun icon in dark mode, moon in light |
| Online badge (when privacy off) | green plus-shaped 10×10 + `{n} online` tabular nums | |

### Main preview / breadcrumb

| Property | Value |
|----------|--------|
| Breadcrumb min-height | `--bar-height` (64–96px) |
| Horizontal padding | `--preview-pad` |
| Vertical padding | `0.75rem` (12px) |
| Gap between crumbs | `0.75rem` (12px) |
| Color | muted; current page / hover → fg |
| Crumb hit area | min-height 44px (`min-h-11`) |
| Info `[i]` button | 44×44 square |
| External link e.g. `[View app]` | right-aligned (`ml-auto`), bracketed label |
| Content top offset | first child `margin-top: calc(var(--preview-fade) + 0.375rem)` ≈ 102px |

### Content fade

Top of `.finder-preview` uses dual backdrop-blur masks (`--blur-header: 6px`) and `.finder-content` uses a mask-image fade from transparent → bg over `--preview-fade`.

### Media gallery

| Property | Value |
|----------|--------|
| Grid | 1 col mobile; 2 cols desktop; gap = `--preview-pad` |
| Frame border | 1px dashed `line` |
| Radius | `--window-radius` (0 flat) |
| Aspect ratio | **16:9** (`1.777…`) for images/videos |
| Full-bleed span | first item and videos / artifact frames → `md:col-span-2` |
| Video controls bar | border-top 1px dashed, bg `bg`, padding 8px; buttons 44×44 |
| Caption under first artifact | flex row desktop; title `fg` left, subtitle `muted` right; padding 20px (`p-5`) |

### Stats grid (artifacts / siphon)

| Property | Value |
|----------|--------|
| Container | 1px dashed border, radius 0 |
| Cells | 2-col mobile; 3–4 col desktop |
| Cell padding | 24px mobile / 32px desktop |
| Label (`dt`) | muted |
| Value (`dd`) | fg, `tabular-nums` |

### Radio / Sounds

| Property | Value |
|----------|--------|
| Stage | centered, min-height 256px |
| Frame | max-width 28rem–32rem, aspect square, 1px dashed border, padding 40px |
| Disc | 192px / 224px (md), concentric rings using `--color-record-line` |
| Play button | 56×56 circle, border line, bg bg |
| Bloom | radial gradients: colorful `#ff4d6a55`, sunset `#ff8a3d55`, ocean `#3dd6ff55` |
| Spin | `record 8s linear infinite` when playing |
| Streams | YouTube IDs: lofi `rFZHOHl-L8A`, soul `E2vONfzoyRI`, ambient `S_MOd40zlYU` |

---

## 5. Components inventory

### A. Finder sidebar (file tree)

- Native `<details>` / `<summary>` folders
- Icons: closed/open chevron + closed/open folder (swap via CSS when `[open]`)
- Item icons (custom 24×24 SVG strokes, currentColor):
  - Works: odyssey (4-point star), deximal (dot grid), life (figure), siphon (yin swirl), streamius (rings), labs (flask)
  - Artifacts: aeons (+ circle), anti (X box), based (B), checks (badge check), editions (seal/star)
  - Notes: document/file
  - Sounds: vinyl/record
  - Links: X / Instagram / GitHub marks
- Logo: filled square with slash
- Expand state: folder containing current route auto-opens

### B. Breadcrumb + info popover

Format: `UNIYAALLL / {SECTION} / {PAGE}` + optional info button + optional external `[Label]`

Info dialog: absolute under button, border `line`, bg `bg`, padding 16px, muted text, small plus icon, links in `[brackets]` as `fg`.

### C. Media / video player

- `<video>` muted loop playsInline; poster image
- Overlay click toggles play
- Controls: Play/Pause + Mute/Unmute SVGs (stroke 1.5, square caps)

### D. Notes article

- Wrapper class pattern from tr.af: muted article, fg headings
- `/100` → `<ol>` of 100 truths
- Other notes → paragraphs + section `h2`s

### E. Theme toggle

- Square button bottom-left sidebar
- Aria: “Switch to light mode” / “Switch to dark mode”
- Sets `data-theme` on `<html>` + localStorage
- Inline boot script prevents flash (read localStorage / prefers-color-scheme before paint)

### F. Privacy `/` button

- Toggles online count visibility (`{n} online` + green indicator)

### G. Mobile

- Sidebar collapses to 64px-tall bar; hamburger (fg square with two bars) expands tree
- Brand + `[@uniyaalll]` link on mobile header
- Theme toggle visible when menu open / always in footer on desktop

---

## 6. Motion

| Token | Value |
|-------|--------|
| `--transition` | `0.2s ease-out` |
| `.motion-app` | transition bg/color/border/opacity/width/height/transform |
| Record spin | 8s linear infinite |
| Reduced motion | `--transition: 0s` when `prefers-reduced-motion: reduce` |

No purple glows, no multi-layer drop shadows, no rounded-full pills in chrome (except radio play circle).

---

## 7. Borders & shape language

- **Default border style globally: dashed**
- Color: `--color-line`
- Width: 1px
- Radius: **0** in flat skin (hard corners everywhere in chrome)
- No card shadows; media frames are bordered boxes only

---

## 8. Iconography rules

- Stroke icons, `currentColor`, typically `stroke-width: 1.5`
- Caps: `square` or `round` per icon (match source SVGs)
- Optical size 20px in nav (`size-5`)
- Do not mix emoji into UI

---

## 9. Content tone / copy patterns

- UI labels UPPERCASE via CSS
- External actions wrapped in brackets: `[View app]`, `[deximal.com]`, `[View on OpenSea]`
- Breadcrumb section names: Works, Artifacts, Notes, Sounds, links (links folder lowercase like tr.af)
- Brand always **UNIYAALLL** (never TRAF)

---

## 10. Page-type templates

### Work page
Breadcrumb + optional about + external link → media grid (video first often full width) → optional stats.

### Artifact page
Same + caption under first media + stats grid + special blocks (e.g. Aeons live iframe simulator).

### Note page
Breadcrumb with filename + date (right) → article muted uppercase body, fg title.

### Sound page
Breadcrumb → centered radio visualizer / YouTube audio backend.

---

## 11. Breakpoints

| Name | Width | Behavior |
|------|-------|----------|
| Mobile | `< 768px` | Stacked finder; collapsible tree; full-width sidebar bar |
| Desktop | `≥ 768px` (`md:`) | Side-by-side; 288px sidebar; 2-col media grid |

---

## 12. Implementation checklist for another agent

1. Ship **exact** `departure_mono-s.p.29iafaar4mfrt.woff2` and the two `@font-face` rules (including Fallback metrics).
2. Set body to 14px / 1.625 / weight 400 / **uppercase** / Departure Mono.
3. Implement CSS variables for dark + light; toggle via `data-theme`.
4. Build finder shell: 288px sidebar + preview with breadcrumb overlay + fade.
5. Tree with dashed hierarchy lines and 48px rows / 20px icons / 12px gaps.
6. Notes: muted body, fg headings, uppercase (via inherit), proper list spacing.
7. Media 16:9 dashed frames; video control bar 44px buttons.
8. Square theme toggle 32×32 at sidebar bottom.
9. Brand string **UNIYAALLL** everywhere.
10. No Inter/Roboto/system UI fonts; no purple gradient aesthetic; no card shadows.

---

## 13. Quick CSS starter (canonical)

```css
:root {
  --color-bg: #000;
  --color-fg: #fff;
  --color-muted: #ffffffa3;
  --color-online: #0f6;
  --color-line: #282828;
  --color-record-line: #ffffff1f;
  --color-fill: #ffffff0d;
  --font-departure: "departure", "departure Fallback";
  --preview-pad: clamp(1rem, 3vw, 3rem);
  --sidebar-width: 18rem;
  --window-radius: 0px;
  --blur-header: 6px;
  --transition: 0.2s ease-out;
}
html[data-theme="light"] {
  --color-bg: #f4f4f4;
  --color-fg: #0a0a0a;
  --color-muted: #0a0a0aa3;
  --color-online: #00aa44;
  --color-line: #d0d0d0;
  --color-record-line: #0000001f;
  --color-fill: #0000000d;
}
* { border-style: dashed; }
body {
  background: var(--color-bg);
  color: var(--color-fg);
  font-family: var(--font-departure);
  font-size: 0.875rem;      /* 14px */
  line-height: 1.625;       /* 22.75px */
  font-weight: 400;
  letter-spacing: 0;
  text-transform: uppercase;
}
body * { font: inherit; letter-spacing: inherit; text-transform: inherit; }
```

---

## 14. Reference measurements (desktop 1440×900)

Derived from implementation (flat skin):

| Element | Width | Height |
|---------|-------|--------|
| Sidebar | 288px | 100dvh |
| Theme button | 32×32 | |
| Privacy button | 24×24 | |
| Nav row | full sidebar content width | min 48px |
| Icon | 20×20 | |
| Body text | — | 14px / lh 22.75px |
| Breadcrumb bar | remaining viewport | min ~64–96px |
| Media aspect | width of content column | height = width × 9/16 |
| Content top spacer | — | ~102px |

---

## 15. What “done” looks like (acceptance)

- [ ] Inspected computed `font-family` is `departure, "departure Fallback"` and `document.fonts.check('14px departure') === true`
- [ ] All UI text renders UPPERCASE
- [ ] Notes body is gray (`muted`), headings white/black (`fg`)
- [ ] Sidebar tree dashed lines + 48px rows
- [ ] Light/dark square toggle works and persists
- [ ] Brand reads UNIYAALLL, not TRAF
- [ ] No default Inter/system font visible anywhere in the chrome

---

*Generated for agent handoff from the UNIYAALLL / tr.af replica project.*
