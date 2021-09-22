
import { emit } from '@sys.packages/socket.io';
import { bindToExchange } from '@sys.packages/rabbit';


export default async function() {
  const salt = Date.now();

  await bindToExchange(process.env['QUEUE_ATTRIBUTE_CREATE'] + '_' + salt, process.env['EXCHANGE_ATTRIBUTE_CREATE'], (data, cb) => {
    const result = JSON.parse(data);
    emit(process.env['SOCKET_ATTRIBUTE_CREATE'], result);
    cb(true);
  });

  await bindToExchange(process.env['QUEUE_ATTRIBUTE_UPDATE'] + '_' + salt, process.env['EXCHANGE_ATTRIBUTE_UPDATE'], (data, cb) => {
    const result = JSON.parse(data);
    emit(process.env['SOCKET_ATTRIBUTE_UPDATE'], result);
    cb(true);
  });

  await bindToExchange(process.env['QUEUE_ATTRIBUTE_DELETE'] + '_' + salt, process.env['EXCHANGE_ATTRIBUTE_DELETE'], (data, cb) => {
    const result = JSON.parse(data);
    emit(process.env['SOCKET_ATTRIBUTE_DELETE'], result);
    cb(true);
  });

}
