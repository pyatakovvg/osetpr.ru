
import { models } from '@sys.packages/db';
import request from '@sys.packages/request';
import { sendEvent } from '@sys.packages/rabbit';


export default () => async (ctx) => {
  const { Attribute } = models;
  const { id } = ctx['request']['body'];

  await Attribute.destroy({
    where: { id },
  });

  await sendEvent(process.env['EXCHANGE_ATTRIBUTE_DELETE'], JSON.stringify(id));

  ctx.body = {
    success: true,
    data: id,
  };
};
