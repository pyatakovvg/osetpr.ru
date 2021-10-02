
import logger from '@sys.packages/logger';
import { connection as connectToRabbit } from '@sys.packages/rabbit';

import path from 'path';
import nunjucks from 'nunjucks';

import rabbit from './rabbit';


(async () => {
  try {
    await connectToRabbit(process.env['RABBIT_CONNECTION_HOST']);

    await rabbit();

    nunjucks.configure(path.resolve(process.cwd(), 'src/templates'), {
      autoescape: true,
      watch: true,
    });

    logger.info('Server started on port: ' + process.env['PORT']);
  }
  catch(error) {

    logger['error'](error);
  }
})();
