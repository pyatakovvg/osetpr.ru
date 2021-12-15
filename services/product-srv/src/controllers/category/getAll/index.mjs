
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  const { Category } = models;

  let where = {};

  const { uuid = null } = ctx['request']['query'];

  if (uuid) {
    where['uuid'] = uuid;
  }

  const result = await Category.findAll({
    order: [
      ['order', 'asc']
    ],
    attributes: ['uuid', 'value', 'order'],
    where: { ...where },
  });

  ctx.body = {
    success: true,
    data: result.map((category) => category.toJSON()),
  };
};
