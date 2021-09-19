
import { emit } from '@sys.packages/socket.io';
import { bindToExchange } from '@sys.packages/rabbit';


export default async function() {
  const salt = Date.now();

  await bindToExchange(process.env['QUEUE_CATEGORY_CREATE'] + '_' + salt, process.env['EXCHANGE_CATEGORY_CREATE'], (data, cb) => {
    const result = JSON.parse(data);
    emit(process.env['SOCKET_CATEGORY_CREATE'], result);
    cb(true);
  });

  await bindToExchange(process.env['QUEUE_CATEGORY_UPDATE'] + '_' + salt, process.env['EXCHANGE_CATEGORY_UPDATE'], (data, cb) => {
    const result = JSON.parse(data);
    emit(process.env['SOCKET_CATEGORY_UPDATE'], result);
    cb(true);
  });

  await bindToExchange(process.env['QUEUE_CATEGORY_DELETE'] + '_' + salt, process.env['EXCHANGE_CATEGORY_DELETE'], (data, cb) => {
    const result = JSON.parse(data);
    emit(process.env['SOCKET_CATEGORY_DELETE'], result);
    cb(true);
  });

}
