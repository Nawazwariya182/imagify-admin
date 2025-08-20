'use strict';

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(ctx = {}) {
    const strapi = ctx.strapi;
    try {
      const host = process.env.HOST || (typeof strapi !== 'undefined' && strapi?.config?.get ? strapi.config.get('server.host') : undefined) || '0.0.0.0';
      const port = process.env.PORT || (typeof strapi !== 'undefined' && strapi?.config?.get ? strapi.config.get('server.port') : undefined) || '1337';
      const message = `Strapi resolving host=${host} port=${port}`;
      if (strapi && strapi.log && typeof strapi.log.info === 'function') {
        strapi.log.info(message);
      } else {
        console.log(message);
      }
    } catch (err) {
      // Non-fatal: don't break startup if logging fails
      console.error('Error while logging startup host/port:', err);
    }
  },
};
