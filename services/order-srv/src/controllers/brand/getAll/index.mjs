
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  const { Brand } = models;

  const result = await Brand.findAll({
    attributes: ['id', 'value', 'description'],
    order: [['value', 'asc']],
  });

  ctx.body = {
    success: true,
    data: result,
  };
};
