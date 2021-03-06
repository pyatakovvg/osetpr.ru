
import logger from '@sys.packages/logger';
import { consumer } from '@sys.packages/rabbit';

import { semySmsSend } from '../../actions';


export default async function() {
  await consumer(process.env['QUEUE_SEMYSMS_SEND'], async (data, cb) => {
    try {
      const result = JSON.parse(data);
      await semySmsSend(result);
      cb(true);
    }
    catch(error) {
      logger.error(error['data']['message']);
      cb(true);
    }
  });
}
