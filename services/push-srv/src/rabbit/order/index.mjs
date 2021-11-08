
import { consumer } from '@sys.packages/rabbit';

import { orderUpdated } from '../../actions/order';


export default async function() {

  await consumer(process.env['QUEUE_PUSH_ORDER_UPDATE'], async (data, cb) => {
    const result = JSON.parse(data);
    await orderUpdated(result);
    cb(true);
  });
}
