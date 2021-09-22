
import { models } from '@sys.packages/db';
import { sendEvent } from '@sys.packages/rabbit';


export default () => async (ctx) => {
  const { Order, Status } = models;

  const { uuid } = ctx['params'];
  const data = ctx['request']['body'];

  await Order.update(data, {
    where: { uuid },
  });

  const result = await Order.findOne({
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

  await sendEvent(process.env['EXCHANGE_UNIT_UPDATE'], JSON.stringify(result.toJSON()));

  ctx.body = {
    success: true,
    data: result.toJSON(),
  };
};
