
import { emit } from '@sys.packages/socket.io';
import { bindToExchange } from '@sys.packages/rabbit';


export default async function() {
  const salt = Date.now();

  await bindToExchange(process.env['QUEUE_TYPE_CREATE'] + '_' + salt, process.env['EXCHANGE_TYPE_CREATE'], (data, cb) => {
    const result = JSON.parse(data);
    emit(process.env['SOCKET_TYPE_CREATE'], result);
    cb(true);
  });

  await bindToExchange(process.env['QUEUE_TYPE_UPDATE'] + '_' + salt, process.env['EXCHANGE_TYPE_UPDATE'], (data, cb) => {
    const result = JSON.parse(data);
    emit(process.env['SOCKET_TYPE_UPDATE'], result);
    cb(true);
  });

  await bindToExchange(process.env['QUEUE_TYPE_DELETE'] + '_' + salt, process.env['EXCHANGE_TYPE_DELETE'], (data, cb) => {
    const result = JSON.parse(data);
    emit(process.env['SOCKET_TYPE_DELETE'], result);
    cb(true);
  });

}
