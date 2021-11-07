
import logger from '@sys.packages/logger';
import { connection as connectToRabbit } from '@sys.packages/rabbit';

import rabbit from './rabbit';


(async () => {
  try {
    await connectToRabbit(process.env['RABBIT_CONNECTION_HOST']);

    await rabbit();

    logger.info('Server started on port: ' + process.env['PORT']);
  }
  catch(error) {

    logger['error'](error);
  }
})();
