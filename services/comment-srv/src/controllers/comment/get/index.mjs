
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  const {
    limit = null,
    skip = null,
    take = null,
  } = ctx['query'];
  const { Comment } = models;
  let where = {};
  let offset = {};
  let options = {};

  if (limit) {
    options['limit'] = Number(limit);
  }

  if (skip && take) {
    offset['offset'] = Number(skip);
    offset['limit'] = Number(take);
  }

  const result = await Comment.findAndCountAll({
    ...options,
    ...offset,
    distinct: true,
    where: { ...where },
    order: [
      ['createdAt', 'desc']
    ],
    attributes: ['uuid', 'userUuid', 'user', 'content', 'createdAt'],
  });

  ctx.body = {
    success: true,
    data: result['rows'],
    meta: result['meta'],
  };
};
