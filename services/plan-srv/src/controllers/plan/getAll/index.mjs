
import moment from '@packages/moment';
import { models, Op } from '@sys.packages/db';

import planBuilder from './builder/plan.mjs';


export default () => async (ctx) => {
  let where = {};
  let userWhere = {};
  let offset = {};
  let options = {};

  const { Plan, PlanProduct, PlanUser, Product, Currency } = models;

  const {
    limit = null,
    skip = null,
    take = null,
    uuid = null,
    userUuid = null,
    isActual = false,
    isUse = null,
  } = ctx['request']['query'];

  if (uuid) {
    where['uuid'] = uuid;
  }

  if (isUse !== null) {
    where['isUse'] = isUse;
  }

  if (userUuid) {
    userWhere['userUuid'] = userUuid;
  }

  if (isActual) {
    userWhere['createdAt'] = {
      [Op.lte]: moment().format('YYYY-MM-DD 23:59:59.999999 +00:00'),
    };
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
      ['createdAt', 'asc'],
      ['users', 'createdAt', 'desc'],
    ],
    attributes: ['uuid', 'name', 'createdAt', 'updatedAt'],
    include: [
      {
        model: PlanUser,
        attributes: ['userUuid', 'createdAt'],
        required: !! Object.keys(userWhere).length,
        where: userWhere,
        as: 'users',
      },
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

  console.log(result)
  ctx.body = {
    success: true,
    data: result['rows'].map((item) => planBuilder(item.toJSON())),
    meta: {
      totalRows: result['count'],
    },
  };
};
