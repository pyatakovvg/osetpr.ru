
import { models } from '@sys.packages/db';
import { sendEvent } from "@sys.packages/rabbit";


export default () => async (ctx) => {
  const { Comment, Product, Brand } = models;
  const { id } = ctx['params'];
  const { ...formData } = ctx['request']['body'];

  const comment = await Comment.create({
    productId: id,
    ...formData,
  }, {
    attributes: ['id', 'evaluation', 'person', 'comment', 'createdAt'],
  });

  const result = await Comment.findOne({
    where: { id: comment['id'] },
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

  await sendEvent(process.env['EXCHANGE_COMMENT_CREATE'], JSON.stringify(result.toJSON()));

  ctx.body = {
    success: true,
    data: result.toJSON(),
  };
};
