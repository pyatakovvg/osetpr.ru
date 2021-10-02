
import { bindToExchange } from '@sys.packages/rabbit';

import { orderCreated, orderUpdated } from '../../actions/order';


export default async function() {
  const salt = Date.now();

  await bindToExchange(process.env['QUEUE_ORDER_CREATE'] + '_' + salt, process.env['EXCHANGE_ORDER_CREATE'], async (data, cb) => {
    const result = JSON.parse(data);
    await orderCreated(result);
    cb(true);
  });

  await bindToExchange(process.env['QUEUE_ORDER_UPDATE'] + '_' + salt, process.env['EXCHANGE_ORDER_UPDATE'], async (data, cb) => {
    const result = JSON.parse(data);
    await orderUpdated(result);
    cb(true);
  });
}
