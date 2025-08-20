'use strict';

/**
 * image-upload service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::image-upload.image-upload');
