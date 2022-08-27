'use strict';

/**
 * review controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::review.review', ({strapi}) => ({
    async findOne(ctx) {
      const { slug } = ctx.params;

    const entity = await strapi.db.query('api::review.review').findOne({
      where: { slug }
    })

    const sanitizedEntity = await this.sanitizeOutput(entity);

      return this.transformResponse(sanitizedEntity);
    }


}));
