
import { emit } from '@sys.packages/socket.io';
import { bindToExchange } from '@sys.packages/rabbit';


export default async function() {
  const salt = Date.now();

  await bindToExchange(process.env['QUEUE_CURRENCY_CREATE'] + '_' + salt, process.env['EXCHANGE_CURRENCY_CREATE'], (data, cb) => {
    const result = JSON.parse(data);
    emit(process.env['SOCKET_CURRENCY_CREATE'], result);
    cb(true);
  });

  await bindToExchange(process.env['QUEUE_CURRENCY_UPDATE'] + '_' + salt, process.env['EXCHANGE_CURRENCY_UPDATE'], (data, cb) => {
    const result = JSON.parse(data);
    emit(process.env['SOCKET_CURRENCY_UPDATE'], result);
    cb(true);
  });

  await bindToExchange(process.env['QUEUE_CURRENCY_DELETE'] + '_' + salt, process.env['EXCHANGE_CURRENCY_DELETE'], (data, cb) => {
    const result = JSON.parse(data);
    emit(process.env['SOCKET_CURRENCY_DELETE'], result);
    cb(true);
  });

}
