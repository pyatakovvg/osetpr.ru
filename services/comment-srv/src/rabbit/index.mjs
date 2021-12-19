
import logger from "@sys.packages/logger";
import { bindToExchange } from "@sys.packages/rabbit";

import { customerCreate, customerUpdate } from '../actions/customer';


export default async function() {
  const salt = Date.now().toString(32);

  await bindToExchange(process.env['QUEUE_CUSTOMER_CREATE'] + '_' + salt, process.env['EXCHANGE_CUSTOMER_CREATE'], async (data, cb) => {
    try {
      const result = JSON.parse(data);

      logger.info('Обработка события на создание клиента: ' + result['uuid']);

      await customerCreate(result);

      cb(true);
    }
    catch(error) {

      logger.error(error['message']);

      cb(false);
    }
  });

  await bindToExchange(process.env['QUEUE_CUSTOMER_UPDATE'] + '_' + salt, process.env['EXCHANGE_CUSTOMER_UPDATE'], async (data, cb) => {
    try {
      const result = JSON.parse(data);

      logger.info('Обработка события на обновление клиента: ' + result['uuid']);

      await customerUpdate(result);

      cb(true);
    }
    catch(error) {

      logger.error(error['message']);

      cb(false);
    }
  });
}
