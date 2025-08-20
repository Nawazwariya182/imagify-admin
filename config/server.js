module.exports = ({ env }) => ({
  // Prefer runtime HOST and PORT (e.g., Render) if provided, fall back to Strapi env helper
  host: process.env.HOST || env('HOST', '0.0.0.0'),
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
});
