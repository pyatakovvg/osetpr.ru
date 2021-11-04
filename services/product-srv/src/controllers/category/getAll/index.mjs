
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  const { Category } = models;

  let where = {};

  const { id = null } = ctx['request']['query'];

  if (id) {
    where['id'] = id;
  }

  const result = await Category.findAll({
    attributes: ['id', 'value'],
    where: { ...where },
  });

  ctx.body = {
    success: true,
    data: result.map((category) => category.toJSON()),
  };
};
