
import { consumer } from '@sys.packages/rabbit';

import { semySmsSend } from '../../actions';


export default async function() {
  await consumer(process.env['QUEUE_SEMYSMS_SEND'], async (data, cb) => {
    const result = JSON.parse(data);
    await semySmsSend(result);
    cb(true);
  });
}
