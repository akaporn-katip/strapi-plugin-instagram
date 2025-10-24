"use strict";

module.exports = ({ strapi }) => ({
  async downloadImages(ctx) {
    const { body } = ctx.request;
    try {
      ctx.body = await strapi
        .plugin("instagram")
        .service("instagramBasicApi")
        .downloadImages(body.force);
    } catch (err) {
      ctx.throw(500, err);
    }
  },
  async getImages(ctx) {
    // const { body } = ctx.request;
    try {
      // Token refresh if necessary
      await strapi
        .plugin("instagram")
        .service("instagramToken")
        .checkTokenExpiration();
      // Download new images if necessary
      await strapi
        .plugin("instagram")
        .service("instagramBasicApi")
        .downloadImages(true);
      // Return images from database
      const params = ctx.request.body || ctx.query;
      ctx.body = await strapi
        .plugin("instagram")
        .service("instaimage")
        .find(params);
    } catch (err) {
      ctx.throw(500, err);
    }
  },
});
