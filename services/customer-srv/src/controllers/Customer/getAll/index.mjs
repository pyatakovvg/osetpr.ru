
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  const where = {};
  let offset = {};
  let options = {};

  const { Customer } = models;
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
    order: [
      ['createdAt', 'desc'],
    ],
    attributes: ['uuid', 'userUuid', 'type', 'name', 'phone', 'email', 'createdAt', 'updatedAt'],
  });

  ctx.body = {
    success: true,
    data: result['rows'],
    meta: {
      total: result['count'],
    },
  };
};
