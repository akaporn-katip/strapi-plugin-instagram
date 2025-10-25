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
      const res = await strapi
        .plugin("instagram")
        .service("instagramToken")
        .checkTokenExpiration();
      strapi.log.info(`check token status : ${res?.status}`);
      strapi.log.info(`refresh status : ${res?.refreshed}`);
      // Download new images if necessary
      if (res && res.status !== 400) {
      strapi.log.info(`start download`, );
        await strapi
          .plugin("instagram")
          .service("instagramBasicApi")
          .downloadImages(true);
        strapi.log.info(`download done`, );
      }
      // Return images from database
      const params = ctx.query;
      strapi.log.info(`params: ${JSON.stringify(params)}`);

      ctx.body = await strapi
        .plugin("instagram")
        .service("instaimage")
        .find(params);
    } catch (err) {
      ctx.throw(500, err);
    }
  },
});
