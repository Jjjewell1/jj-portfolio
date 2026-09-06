# OpenCode task: deploy jj-portfolio to Coolify

This repo is a Next.js 14 portfolio site (standalone output, Docker-ready).
Your job is to get it from this folder to a live deployment at jj.jewellcore.com,
following JJ's existing GitHub → Coolify → Unraid pipeline.

## Step 1 — Local sanity check

```bash
npm install
npm run build
```

Fix any type errors or missing deps before moving on. If `npm run build` fails
on `lucide-react` imports, confirm it installed correctly (`npm ls lucide-react`).

## Step 2 — Push to GitHub

If this isn't already a repo:

```bash
git init
git add .
git commit -m "Initial commit: kickass portfolio site"
```

Create a new repo under Jjjewell1 (or reuse the existing jj.jewellcore.com repo
if this is meant to replace it) and push:

```bash
gh repo create Jjjewell1/jj-portfolio --private --source=. --push
```

If `gh` isn't authenticated, fall back to manually creating the repo on
github.com and adding it as `origin` before pushing.

## Step 3 — Wire up Coolify

Coolify needs a new resource pointed at this repo. Do this via the Coolify UI
on Venus (Unraid), or the Coolify API if a token is available:

1. New Resource → Application → GitHub repo → select `jj-portfolio`.
2. Build pack: **Dockerfile** (this repo ships one — do not use Nixpacks,
   the standalone output needs the multi-stage build).
3. Port: `3000`.
4. Branch: `main`.
5. Enable "Auto Deploy" on push so future commits redeploy automatically.

If using the Coolify API instead, the general shape is:

```bash
curl -X POST https://<coolify-host>/api/v1/applications \
  -H "Authorization: Bearer $COOLIFY_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "jj-portfolio",
    "git_repository": "https://github.com/Jjjewell1/jj-portfolio",
    "git_branch": "main",
    "build_pack": "dockerfile",
    "ports_exposes": "3000"
  }'
```

(Check Coolify's current API docs for the exact endpoint/schema — this varies
by version. Confirm the token has the right scope before running.)

## Step 4 — Domain + Cloudflare Tunnel

This replaces (or sits alongside) the existing jj.jewellcore.com deployment:

1. In Coolify, set the application domain to `jj.jewellcore.com`.
2. On the Cloudflare side, confirm the tunnel's public hostname for
   `jj.jewellcore.com` points at the Coolify app's internal service
   (same pattern as JJ's other subdomains — reuse the existing tunnel,
   just repoint or add the route if this is a new service).
3. If this is replacing the current site 1:1, no DNS changes should be
   needed — only the tunnel's ingress rule (if it points at a different
   container/port) or the Coolify proxy config.

## Step 5 — Verify

```bash
curl -I https://jj.jewellcore.com
```

Confirm a `200` and that the page renders the new hero section (grep for
"Jeffrey JJ Jewell" in the response body if curl-only verification is needed).

## Notes for whoever (human or agent) picks this up

- Contact form and email links currently use a placeholder
  `mailto:[email protected]` — swap in the real address before going live.
- LinkedIn link is a placeholder `https://linkedin.com` — update to the
  real profile URL.
- Project card links marked `#` (PickFlick, Wishlist, Homelab, AI Stack)
  have no live URL yet — either point them at real subdomains once
  those projects are deployed, or remove the "View Live" hover state
  for projects without a public URL.
- This was built for JJ's stack specifically: GitHub → Coolify → Unraid
  ("Venus"), Cloudflare Tunnels, domain jewellcore.com.
