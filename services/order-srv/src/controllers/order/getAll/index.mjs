
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  let offset = {};
  let options = {};

  const { Order, Status } = models;

  const {
    limit = null,
    skip = null,
    take = null,
  } = ctx['request']['query'];

  if (limit) {
    options['limit'] = Number(limit);
  }

  if (skip && take) {
    offset['offset'] = Number(skip);
    offset['limit'] = Number(take);
  }

  const result = await Order.findAndCountAll({
    ...options,
    ...offset,
    distinct: true,
    order: [['createdAt', 'asc']],
    attributes: ['uuid', 'userUuid', 'title', 'description', 'dateTo', 'createdAt', 'updatedAt'],
    include: [
      {
        model: Status,
        as: 'status',
      },
    ],
  });

  ctx.body = {
    success: true,
    data: result['rows'],
    meta: result['meta'],
  };
};
