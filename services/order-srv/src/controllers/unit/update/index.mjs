
import { sendEvent } from '@sys.packages/rabbit';
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  const { Unit } = models;
  const { id } = ctx['params'];
  const data = ctx['request']['body'];

  await Unit.update(data, {
    where: { id },
  });

  const result = await Unit.findOne({
    attributes: ['id', 'value', 'description'],
    where: { id },
  });

  await sendEvent(process.env['EXCHANGE_UNIT_UPDATE'], JSON.stringify(result.toJSON()));

  ctx.body = {
    success: true,
    data: result.toJSON(),
  };
};
