
import { models } from '@sys.packages/db';
import { sendEvent } from "@sys.packages/rabbit";


export default () => async (ctx) => {
  const { Comment, Product, Brand } = models;
  const { id } = ctx['params'];
  const formData = ctx['request']['body'];

  await Comment.update(formData, {
    where: { id },
  });

  const result = await Comment.findOne({
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
    where: { id },
  });

  await sendEvent(process.env['EXCHANGE_COMMENT_UPDATE'], JSON.stringify(result.toJSON()));

  ctx.body = {
    success: true,
    data: result.toJSON(),
  };
};
