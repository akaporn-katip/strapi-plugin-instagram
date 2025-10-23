"use strict";

module.exports = ({ strapi }) => {
  // bootstrap phase
  strapi.cron.add({
    // runs every second
    myJob: {
      task: async ({ strapi }) => {
        console.log("start refresh token");
        await strapi
          .plugin("instagram")
          .service("instagramToken")
          .checkTokenExpiration();
      },
      options: {
        rule: "0 0 */5 * * *",
      },
    },
  });
};
