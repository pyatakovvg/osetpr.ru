
import { sendEvent } from "@sys.packages/rabbit";
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  const { Unit } = models;
  const { id } = ctx['request']['body'];

  await Unit.destroy({
    where: { id },
  });

  await sendEvent(process.env['EXCHANGE_UNIT_DELETE'], JSON.stringify(id));

  ctx.body = {
    success: true,
    data: id,
  };
};
