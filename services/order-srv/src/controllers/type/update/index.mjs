
import { models } from '@sys.packages/db';
import {sendEvent} from "@sys.packages/rabbit";


export default () => async (ctx) => {
  const { Type } = models;
  const { id } = ctx['params'];
  const data = ctx['request']['body'];

  await Type.update(data, { where: { id }});

  const result = await Type.findOne({
    where: { id },
    include: [],
  });

  const type = result.toJSON();

  await sendEvent(process.env['EXCHANGE_TYPE_UPDATE'], JSON.stringify(type));

  ctx.body = {
    success: true,
    data: type,
  };
};
