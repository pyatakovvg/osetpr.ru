
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  const { Category } = models;

  const categories = await Category.findAll({
    attributes: ['id', 'value', 'description'],
    order: [['value', 'asc']],
  });

  ctx.body = {
    success: true,
    data: [ ...categories ],
  };
};
