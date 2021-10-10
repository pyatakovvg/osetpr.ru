
import { models } from '@sys.packages/db';

import productBuilder from './builder/product.mjs';


export default () => async (ctx) => {
  let where = {};
  let offset = {};
  let options = {};

  const { Plan, PlanProduct, Product, Currency } = models;

  const {
    limit = null,
    skip = null,
    take = null,
    uuid = null,
    userUuid = null,
    isUse = null,
  } = ctx['request']['query'];

  if (uuid) {
    where['uuid'] = uuid;
  }

  if (userUuid) {
    where['userUuid'] = userUuid;
  }

  if (isUse !== null) {
    where['isUse'] = isUse;
  }

  if (limit) {
    options['limit'] = Number(limit);
  }

  if (skip && take) {
    offset['offset'] = Number(skip);
    offset['limit'] = Number(take);
  }

  const result = await Plan.findAndCountAll({
    ...options,
    ...offset,
    distinct: true,
    where: { ...where },
    order: [
      ['createdAt', 'desc'],
    ],
    attributes: ['uuid', 'name', 'createdAt', 'updatedAt'],
    include: [
      {
        model: PlanProduct,
        as: 'products',
        include: [
          {
            model: Product,
            as: 'mode',
            include: [
              {
                model: Currency,
                attributes: ['code', 'value'],
                as: 'currency',
              }
            ],
          }
        ],
      }
    ],
  });

  ctx.body = {
    success: true,
    data: result['rows'].map((item) => productBuilder(item.toJSON())),
    meta: {
      totalRows: result['count'],
    },
  };
};
