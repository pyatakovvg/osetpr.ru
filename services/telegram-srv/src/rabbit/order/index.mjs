
import logger from '@sys.packages/logger';
import { consumer } from '@sys.packages/rabbit';

export default async function() {

  await consumer(process.env['QUEUE_ORDER_CREATED'],async(message, cb) => {
    try {
      console.log(JSON.parse(message));
      cb(true);
    }
    catch(error) {
      logger['error'](error['message']);
      cb(false);
    }
  });
}