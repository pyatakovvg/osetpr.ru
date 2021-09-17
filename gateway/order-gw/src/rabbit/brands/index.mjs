
import { emit } from '@sys.packages/socket.io';
import { bindToExchange } from '@sys.packages/rabbit';


export default async function() {
  const salt = Date.now();

  await bindToExchange(process.env['QUEUE_BRAND_CREATE'] + '_' + salt, process.env['EXCHANGE_BRAND_CREATE'], (data, cb) => {
    const result = JSON.parse(data);
    emit(process.env['SOCKET_BRAND_CREATE'], result);
    cb(true);
  });

  await bindToExchange(process.env['QUEUE_BRAND_UPDATE'] + '_' + salt, process.env['EXCHANGE_BRAND_UPDATE'], (data, cb) => {
    const result = JSON.parse(data);
    emit(process.env['SOCKET_BRAND_UPDATE'], result);
    cb(true);
  });

  await bindToExchange(process.env['QUEUE_BRAND_DELETE'] + '_' + salt, process.env['EXCHANGE_BRAND_DELETE'], (data, cb) => {
    const result = JSON.parse(data);
    emit(process.env['SOCKET_BRAND_DELETE'], result);
    cb(true);
  });

}
