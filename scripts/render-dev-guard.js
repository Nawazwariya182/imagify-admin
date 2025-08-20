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
  // In production, ensure we start the production wrapper which binds to process.env.PORT
  const script = path.join(__dirname, 'render-start.js');
  // If someone wants a dry-run for testing, they can set RENDER_DEV_GUARD_DRY=1
  if (process.env.RENDER_DEV_GUARD_DRY === '1') {
    console.log('RENDER_DEV_GUARD_DRY=1 set — would run:', process.execPath, script);
    process.exit(0);
  }
  run(process.execPath, [script], {});
} else {
  // Local development: run strapi develop
  run('npx', ['strapi', 'develop'], {});
}
