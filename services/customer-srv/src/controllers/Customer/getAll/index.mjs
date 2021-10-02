
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  const where = {};
  let offset = {};
  let options = {};

  const { Customer, Legal, Individual } = models;
  const {
    uuid = null,
    userUuid = null,
    limit = null,
    skip = null,
    take = null,
  } = ctx['request']['query'];

  if (uuid) {
    where['uuid'] = uuid;
  }

  if (userUuid) {
    where['userUuid'] = userUuid;
  }

  if (limit) {
    options['limit'] = Number(limit);
  }

  if (skip && take) {
    offset['offset'] = Number(skip);
    offset['limit'] = Number(take);
  }

  const result = await Customer.findAndCountAll({
    where: { ...where, },
    ...options,
    ...offset,
    distinct: true,
    order: [['uuid', 'desc']],
    attributes: ['uuid', 'userUuid', 'type', 'createdAt', 'updatedAt'],
    include: [
      {
        model: Legal,
        required: false,
        as: 'legal',
        attributes: ['name', 'address', 'phone']
      },
      {
        model: Individual,
        required: false,
        as: 'individual',
      },
    ]
  });

  ctx.body = {
    success: true,
    data: result['rows'],
    meta: {
      total: result['count'],
    },
  };
};
