"use strict";

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   */
  bootstrap(options = {}) {
    const { strapi } = options;
    try {
      const host =
        process.env.HOST || (strapi && strapi.config && typeof strapi.config.get === 'function' ? strapi.config.get('server.host') : undefined) || '0.0.0.0';
      const port =
        process.env.PORT || (strapi && strapi.config && typeof strapi.config.get === 'function' ? strapi.config.get('server.port') : undefined) || '1337';
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
