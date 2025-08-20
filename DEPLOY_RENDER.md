Render deployment checklist for Imagify Strapi backend

1. Service type: Web Service
2. Environment: Node (match the Node version in package.json engines)
3. Branch: main (or your deployment branch)

Build & Start commands
- Build command:
  npm ci; npm run build
- Start command:
  npm run start

Environment variables
- Do NOT set PORT. Remove any manual PORT value so Render injects its runtime port.
- Required env vars (copy from your .env, replace secrets with placeholders):
  DATABASE_CLIENT=postgres
  DATABASE_HOST=... 
  DATABASE_PORT=5432
  DATABASE_NAME=Imagify
  DATABASE_USERNAME=...
  DATABASE_PASSWORD=...
  DATABASE_SSL=true
  JWT_SECRET=...
  CLOUDINARY_NAME=...
  CLOUDINARY_KEY=...
  CLOUDINARY_SECRET=...
  APP_KEYS=... (comma-separated)

Notes
- Do not use `npm run dev` on Render. It runs Strapi in develop mode and can spawn admin dev servers (Vite) that open extra ports (e.g., 5173). The repo contains a guard so `npm run dev` will run production start when NODE_ENV=production, but it's best to set Start command to `npm run start` explicitly.
- The repository includes `scripts/render-start.js` and `scripts/render-dev-guard.js` to help Render run the correct commands.

Troubleshooting
- If Render still reports "No open ports detected" after these changes, copy the log lines that say "Detected a new open port HTTP:<port>" — they often include the PID; paste them here and we'll trace the process.
