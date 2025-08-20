// Render start wrapper: ensures Strapi binds to the PORT Render provides and starts only Strapi
'use strict';

const path = require('path');
const { spawn } = require('child_process');

const nodeArgs = [];
const script = path.join(__dirname, '..', 'node_modules', '@strapi', 'strapi', 'dist', 'main.js');

// Ensure PORT is set
if (!process.env.PORT) {
  console.warn('Warning: process.env.PORT is not set. Falling back to 1337.');
  process.env.PORT = process.env.PORT || '1337';
}

// Use spawn to start Strapi in the same process tree
const child = spawn(process.execPath, [script, ...nodeArgs], {
  stdio: 'inherit',
  env: process.env,
});

child.on('close', (code) => {
  process.exit(code);
});

child.on('error', (err) => {
  console.error('Failed to start Strapi:', err);
  process.exit(1);
});
