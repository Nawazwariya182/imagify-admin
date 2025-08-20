// Small script to verify config/server.js exports and resolves host/port
const path = require('path');
const configPath = path.resolve(__dirname, '..', 'config', 'server.js');

// Minimal env helper that delegates to process.env when possible
const env = (key, defaultValue) => {
  if (key in process.env) return process.env[key];
  return defaultValue;
};
env.int = (key, defaultValue) => {
  const val = process.env[key];
  if (typeof val !== 'undefined') return parseInt(val, 10);
  return defaultValue;
};
env.array = (key, defaultValue) => {
  const val = process.env[key];
  if (typeof val === 'string') return val.split(',');
  return defaultValue;
};
env.bool = (key, defaultValue) => {
  const val = process.env[key];
  if (typeof val !== 'undefined') return String(val).toLowerCase() === 'true';
  return defaultValue;
};

try {
  const cfgFactory = require(configPath);
  const cfg = cfgFactory({ env });
  console.log('Resolved server config:');
  console.log('host:', cfg.host);
  console.log('port:', cfg.port);
  process.exit(0);
} catch (err) {
  console.error('Error loading server config:', err);
  process.exit(2);
}
