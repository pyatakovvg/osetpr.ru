
import { models } from '@sys.packages/db';

export default () => async (ctx) => {
  const { Product } = models;
  const body = ctx['request']['body'];
  const { uuid } = ctx['params'];

  await Product.update(body, {
    where: { uuid },
  });

  ctx.body = {
    success: true,
    data: null,
  };
};
