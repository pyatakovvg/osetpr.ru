
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  const {
    uuid = null,
    limit = null,
    skip = null,
    take = null,
  } = ctx['query'];

  const { Comment, Theme, Customer } = models;

  let where = {};
  let offset = {};
  let options = {};

  if (uuid) {
    where['uuid'] = uuid;
  }

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
    where: {
      parentUuid: null,
      ...where,
    },
    order: [
      ['createdAt', 'desc']
    ],
    attributes: ['uuid', 'userUuid', 'user', 'content', 'isAdmin', 'createdAt'],
    include: [
      {
        model: Theme,
        as: 'theme',
      },
      {
        model: Comment,
        as: 'comments',
        include: [
          {
            model: Comment,
            as: 'comments',
            include: [
              {
                model: Comment,
                as: 'comments',
              },
            ]
          },
        ]
      },
      {
        model: Customer,
        as: 'customer',
      }
    ]
  });

  ctx.body = {
    success: true,
    data: result['rows'],
    meta: result['meta'],
  };
};
