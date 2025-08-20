module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  // Prefer the actual runtime PORT (e.g., Render) if provided, fall back to Strapi env helper
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
});
