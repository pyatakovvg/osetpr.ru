
import {sendCommand, sendEvent} from "@sys.packages/rabbit";
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  const { Currency } = models;
  const formData = ctx['request']['body'];

  const { id } = await Currency.create(formData);

  const result = await Currency.findOne({
    where: { id },
    attributes: ['id', 'value', 'code', 'description'],
  });

  const currency = result.toJSON();

  await sendCommand(process.env['QUEUE_CURRENCY_CREATE'], JSON.stringify(currency));
  await sendEvent(process.env['EXCHANGE_CURRENCY_CREATE'], JSON.stringify(currency));

  ctx.body = {
    success: true,
    data: currency,
  };
};
