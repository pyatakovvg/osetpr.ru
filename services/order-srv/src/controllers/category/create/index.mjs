
import { sendEvent } from "@sys.packages/rabbit";
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  const { Category } = models;
  const formData = ctx['request']['body'];

  const { id } = await Category.create(formData);

  const result = await Category.findOne({
    attributes: ['id', 'value', 'description'],
    where: { id },
  });

  await sendEvent(process.env['EXCHANGE_CATEGORY_CREATE'], JSON.stringify(result.toJSON()));

  ctx.body = {
    success: true,
    data: result.toJSON(),
  };
};
