
import { emit } from '@sys.packages/socket.io';
import { bindToExchange } from '@sys.packages/rabbit';


export default async function() {
  const salt = Date.now();

  await bindToExchange(process.env['QUEUE_ORDER_CREATE'] + '_' + salt, process.env['EXCHANGE_ORDER_CREATE'], (data, cb) => {
    const result = JSON.parse(data);
    emit(process.env['SOCKET_ORDER_CREATE'], result);
    cb(true);
  });

  await bindToExchange(process.env['QUEUE_ORDER_UPDATE'] + '_' + salt, process.env['EXCHANGE_ORDER_UPDATE'], (data, cb) => {
    const result = JSON.parse(data);
    console.log(123123, result)
    emit(process.env['SOCKET_ORDER_UPDATE'], result);
    cb(true);
  });

  await bindToExchange(process.env['QUEUE_ORDER_DELETE'] + '_' + salt, process.env['EXCHANGE_ORDER_DELETE'], (data, cb) => {
    const result = JSON.parse(data);
    emit(process.env['SOCKET_ORDER_DELETE'], result);
    cb(true);
  });
}
