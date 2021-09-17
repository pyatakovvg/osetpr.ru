
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  const where = {};
  const offset = {};
  const options = {};

  const { Comment, Product, Brand } = models;
  const { limit = null, take = null, skip = null, id = null, uuid = null, evaluation = null, person = null, createAt = null } = ctx['request']['query'];

  if (id) {
    where['id'] = id;
  }

  if (uuid) {
    where['uuid'] = uuid;
  }

  if (evaluation) {
    where['evaluation'] = evaluation;
  }

  if (person) {
    where['person'] = person;
  }

  if (createAt) {
    where['createAt'] = createAt;
  }

  if (limit) {
    options['limit'] = limit;
  }

  if (skip && take) {
    offset['offset'] = skip;
    offset['limit'] = take;
  }

  const result = await Comment.findAndCountAll({
    attributes: ['id', 'evaluation', 'person', 'comment', 'createdAt'],
    distinct: false,
    ...options,
    ...offset,
    where: { ...where },
    order: [['createdAt', 'desc']],
    include: [{
      model: Product,
      as: 'product',
      attributes: ['uuid', 'name'],
      include: [
        {
          model: Brand,
          as: 'brands',
        }
      ]
    }],
  });

  ctx.body = {
    success: true,
    data: result['rows'],
    meta: {
      total: result['count'],
    },
  };
};
