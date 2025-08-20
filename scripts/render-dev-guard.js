// Guard for npm run dev: in production environments (Render) we should not start dev servers.
// If NODE_ENV=production, delegate to the production start wrapper. Otherwise run `strapi develop` for local dev.

'use strict';

const { spawn } = require('child_process');
const path = require('path');

const isProd = process.env.NODE_ENV === 'production' || process.env.RENDER === 'true';

function run(cmd, args, env) {
  const child = spawn(cmd, args, { stdio: 'inherit', env: Object.assign({}, process.env, env) });
  child.on('close', (code) => process.exit(code));
  child.on('error', (err) => {
    console.error('Failed to run command', cmd, err);
    process.exit(1);
  });
}

if (isProd) {
  // In production, start Strapi directly via npx to avoid relying on internal module paths.
  // This ensures the runtime on Render runs the same command as a user would locally.
  if (process.env.RENDER_DEV_GUARD_DRY === '1') {
    console.log('RENDER_DEV_GUARD_DRY=1 set — would run: npx strapi start');
    process.exit(0);
  }
  run('npx', ['strapi', 'start'], {});
} else {
  // Local development: run strapi develop
  run('npx', ['strapi', 'develop'], {});
}
