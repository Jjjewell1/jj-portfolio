# OpenCode task: finish + deploy jj-portfolio ("The Grid")

This repo is JJ's Next.js 14 portfolio, rebuilt around **The Grid** concept: a
low-poly, dark server-room 3D scene (React Three Fiber) with amber/teal accent
lighting and a scroll-driven camera that moves through four fixed "stations"
(Hero → Projects → Stack → Contact), inspired by jordan-breton.com-style
fixed-camera portfolio sites. HTML content is overlaid on top of the canvas
and fades in/out in sync with whichever station is active.

**Status: this already builds clean.** `npm run build` was verified in a
sandbox (Next 14.2.35, patched against the Dec 2025 RSC CVEs — do not
downgrade). What's below is real polish + deployment work, not a rescue job.

## What's already implemented

- `components/Experience.tsx` — mounts the R3F `<Canvas>`, client-only (no
  SSR — WebGL needs the browser). Detects small screens, `prefers-reduced-motion`,
  and low `navigator.deviceMemory` and swaps in a CSS-only static fallback
  (`StaticGridFallback`) instead of paying the WebGL cost. Check this logic
  still feels right once you've got it running on your actual 5060 rig vs a
  phone — thresholds are reasonable guesses, not measured.
- `components/GridScene.tsx` — the scene: infinite grid floor (`drei`'s
  `<Grid>`), two rows of low-poly server racks with pulsing emissive amber/teal
  strips, a floating rotating "data column" for the Stack station, `<Sparkles>`
  for ambient particles, fog for depth.
- `components/CameraRig.tsx` — the four camera stations live in the
  `STATIONS` array at the top of this file. Re-block any shot by editing
  `position`/`lookAt`/`fov` there — everything else (damped lerp, scroll
  mapping) is generic.
- `lib/scroll-store.ts` + `lib/useScrollTracker.ts` — a small Zustand store
  fed by a scroll listener. `progress` (0..1) drives the camera every frame
  via `getState()` (no React re-renders); `activeSection` (0..3) drives HTML
  opacity and only re-renders on actual section change.
- `app/page.tsx` — real content, not placeholders, for 5 of 6 projects
  (Vortex, PickFlick, Christmas Wishlist, Family Adventures, AnythingLLM Study
  Assistant), the skills/stack grid, and a contact station.
- Design tokens in `app/globals.css` / `tailwind.config.ts` under the `grid-*`
  namespace (`grid-bg #05070a`, `grid-amber #f59e0b`, `grid-teal #2dd4bf`,
  plus soft variants) — reuse these, don't hardcode new hex values elsewhere.

## What's genuinely left to do

1. **The Golden Ticket project card is a placeholder.** I don't have real
   details on this project in memory — `app/page.tsx` has a `golden-ticket`
   entry with honest placeholder copy flagged `TBD`. Replace `subtitle`,
   `description`, and `tech` with the real pitch, and set `link` if it's live
   somewhere.
2. **Contact info is still placeholder:**
   - `mailto:[email protected]` → real address.
   - `https://linkedin.com` → real profile URL, or drop the LinkedIn button
     entirely if that's not the preferred contact channel.
   - Decide the actual preferred contact method for the contact station (a
     `mailto:` link is the current default — a real contact form posting to a
     self-hosted endpoint, or a link to a Discord/Cal.com booking page, are
     both easy swaps in the `#contact` section of `app/page.tsx`).
3. **Dead project links.** `PickFlick`, `Christmas Wishlist`, and
   `AnythingLLM Study Assistant` all have `link: '#'` — the "view_live" link
   only renders when `link !== '#'`. Point them at real subdomains once
   deployed, or leave as-is if they're staying private.
4. **Optional: project thumbnails via ComfyUI.** If you want visual texture
   on the project cards or rack labels instead of pure icon+text, generate
   screenshots/renders locally with ComfyUI and drop them in `public/`, then
   reference them from the `projects` array in `app/page.tsx` (e.g. add an
   `image` field and render it above the icon). Not required — the card
   design works fine icon-only — but it's the natural next visual upgrade.
5. **Optional: bloom / post-processing.** The glow on the rack strips and
   data column right now is emissive-material-only (cheap, no extra
   dependency). If you want a stronger glow, `@react-three/postprocessing`
   + `<EffectComposer><Bloom /></EffectComposer>` around `<GridScene />`'s
   contents is the standard move — but it's a real perf cost on an 8GB-VRAM
   laptop viewer, so benchmark on lower-end hardware before committing. I
   deliberately left this out to keep the baseline light.
6. **Content pass on the "Stack" section.** The certifications listed
   (CompTIA A+, Azure AZ-900) came from an earlier scaffold — confirm they're
   still accurate and add any newer in-progress certs.
7. **Favicon / OG image.** `public/` currently only has a `.gitkeep`. Add a
   real favicon and an Open Graph image (referenced from `app/layout.tsx`'s
   `metadata.openGraph`) so link previews on Discord/Slack/etc. look right.

## Local sanity check

```bash
npm install
npm run dev      # http://localhost:3000 — scroll through all 4 stations
npm run build    # must stay clean before pushing
```

If `npm run build` fails on a `three` / `@react-three/fiber` version
mismatch, pin exact versions rather than loosening the range — R3F is
sensitive to the installed `three` major/minor.

## Deploy — same pipeline as everything else on jewellcore.com

This follows JJ's existing GitHub → Coolify → Unraid ("Venus") → Cloudflare
Tunnels pattern. Don't introduce a different hosting approach for this one.

1. **Push to GitHub** (new repo, or replace the existing jj.jewellcore.com
   repo if this supersedes it):
   ```bash
   git init
   git add .
   git commit -m "Rebuild jj.jewellcore.com as The Grid (R3F scroll experience)"
   gh repo create Jjjewell1/jj-portfolio --private --source=. --push
   ```
   If `gh` isn't authenticated, create the repo on github.com manually and
   add it as `origin` before pushing.

2. **Coolify** (on Venus): New Resource → Application → GitHub repo →
   `jj-portfolio`.
   - Build pack: **Dockerfile** (this repo ships one, multi-stage,
     `output: 'standalone'` — do not switch to Nixpacks).
   - Port: `3000`.
   - Branch: `main`.
   - Enable Auto Deploy on push.
   - Consider standing this up as a **preview/staging deployment** first if
     you've since added Coolify staging environments — this is a full visual
     rebuild, worth eyeballing on a preview URL before it replaces the live
     domain.

3. **Cloudflare Tunnel**: set the Coolify app domain to
   `jj.jewellcore.com`; confirm the tunnel's public hostname for that
   subdomain routes to this app's container (same pattern as your other
   `*.jewellcore.com` services — reuse the existing tunnel, just repoint the
   ingress rule if this replaces the current container).

4. **Verify**:
   ```bash
   curl -I https://jj.jewellcore.com
   ```
   Confirm `200`, and open it in a real browser to check the 3D scene loads
   and the camera moves through all four stations on scroll (curl can't
   verify WebGL — this one needs an actual look).

## Notes

- Built for: GitHub → Coolify → Unraid ("Venus") → Cloudflare Tunnels,
  domain `jewellcore.com`. Don't deviate from this deployment pattern for
  consistency with the rest of the stack.
- If Uptime Kuma is wired up by the time this ships, add a monitor for
  `jj.jewellcore.com` alongside the other subdomains.
