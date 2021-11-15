
import logger from '@sys.packages/logger';
import { emitToRoom } from '@sys.packages/socket.io';
import { bindToExchange } from '@sys.packages/rabbit';


export default async function() {
  const salt = Date.now();

  await bindToExchange(process.env['QUEUE_ORDER_UPDATE'] + '_' + salt, process.env['EXCHANGE_ORDER_UPDATE'], (data, cb) => {
    try {
      const result = JSON.parse(data);

      emitToRoom(result['userUuid'], process.env['SOCKET_ORDER_UPDATE'], result);
      cb(true);
    }
    catch(error) {

      logger.error(error);
      cb(false);
    }
  });
}
