
import { emit } from '@sys.packages/socket.io';
import { bindToExchange } from '@sys.packages/rabbit';


export default async function() {
  const salt = Date.now();

  await bindToExchange(process.env['QUEUE_PROMOTION_CREATE'] + '_' + salt, process.env['EXCHANGE_PROMOTION_CREATE'], (data, cb) => {
    const result = JSON.parse(data);
    emit(process.env['SOCKET_PROMOTION_CREATE'], result);
    cb(true);
  });

  await bindToExchange(process.env['QUEUE_PROMOTION_UPDATE'] + '_' + salt, process.env['EXCHANGE_PROMOTION_UPDATE'], (data, cb) => {
    const result = JSON.parse(data);
    emit(process.env['SOCKET_PROMOTION_UPDATE'], result);
    cb(true);
  });

  await bindToExchange(process.env['QUEUE_PROMOTION_DELETE'] + '_' + salt, process.env['EXCHANGE_PROMOTION_DELETE'], (data, cb) => {
    const result = JSON.parse(data);
    emit(process.env['SOCKET_PROMOTION_DELETE'], result);
    cb(true);
  });

}
