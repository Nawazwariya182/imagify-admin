// Render start wrapper: ensures Strapi binds to the PORT Render provides and starts only Strapi
'use strict';

const { spawn } = require('child_process');

// Ensure PORT is set
if (!process.env.PORT) {
  console.warn('Warning: process.env.PORT is not set. Falling back to 1337.');
  process.env.PORT = '1337';
}

// Use npx to start Strapi so we avoid assuming internal paths in node_modules
const child = spawn('npx', ['strapi', 'start'], {
  stdio: 'inherit',
  env: process.env,
});

child.on('close', (code) => {
  process.exit(code);
});

child.on('error', (err) => {
  console.error('Failed to start Strapi via npx:', err);
  process.exit(1);
});
