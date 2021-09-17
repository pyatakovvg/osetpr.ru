
import { sendEvent } from '@sys.packages/rabbit';
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  const { Category } = models;

  const { id } = ctx['params'];
  const formDate = ctx['request']['body'];

  await Category.update(formDate, {
    where: { id },
  });

  const result = await Category.findOne({
    attributes: ['id', 'value', 'description'],
    where: { id },
  });

  await sendEvent(process.env['EXCHANGE_CATEGORY_UPDATE'], JSON.stringify(result.toJSON()));

  ctx.body = {
    success: true,
    data: result.toJSON(),
  };
};
