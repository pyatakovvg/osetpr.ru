
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  let where = {};
  let offset = {};
  let options = {};

  const { Order, Status } = models;

  const {
    limit = null,
    skip = null,
    take = null,
    uuid = null,
    userUuid = null,
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

  const result = await Order.findAndCountAll({
    ...options,
    ...offset,
    distinct: true,
    where: { ...where },
    order: [['createdAt', 'desc']],
    attributes: ['uuid', 'userUuid', 'title', 'description', 'dateTo', 'address', 'createdAt', 'updatedAt'],
    include: [
      {
        model: Status,
        required: true,
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
