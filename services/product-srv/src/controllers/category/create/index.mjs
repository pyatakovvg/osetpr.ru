
import { models } from '@sys.packages/db';
import { sendEvent } from "@sys.packages/rabbit";


export default () => async (ctx) => {
  const { Product } = models;
  const formData = ctx['request']['body'];

  const { uuid } = await Order.create(formData);

  const result = await Product.findOne({
    where: { uuid },
    attributes: ['uuid', 'userUuid', 'title', 'description', 'dateTo', 'address', 'createdAt', 'updatedAt'],
    include: [
      {
        model: Status,
        required: true,
        as: 'status',
      },
    ],
  });

  await sendEvent(process.env['EXCHANGE_UNIT_CREATE'], JSON.stringify(result.toJSON()));

  ctx.body = {
    success: true,
    data: result.toJSON(),
  };
};
