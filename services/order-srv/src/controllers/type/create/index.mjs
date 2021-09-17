
import {sendEvent} from "@sys.packages/rabbit";
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  const { Type } = models;
  const data = ctx['request']['body'];

  const { id } = await Type.create(data);

  const result = await Type.findOne({
    where: { id },
    include: [],
  });

  const type = result.toJSON();

  await sendEvent(process.env['EXCHANGE_TYPE_CREATE'], JSON.stringify(type));

  ctx.body = {
    success: true,
    data: type,
  };
};
