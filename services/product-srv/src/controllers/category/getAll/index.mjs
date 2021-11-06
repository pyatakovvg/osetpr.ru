
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  const { Category } = models;

  let where = {};

  const { id = null } = ctx['request']['query'];

  if (id) {
    where['id'] = id;
  }

  const result = await Category.findAll({
    order: [
      ['order', 'desc']
    ],
    attributes: ['id', 'value', 'order'],
    where: { ...where },
  });

  ctx.body = {
    success: true,
    data: result.map((category) => category.toJSON()),
  };
};
