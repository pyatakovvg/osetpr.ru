
import { emit } from '@sys.packages/socket.io';
import { bindToExchange } from '@sys.packages/rabbit';


export default async function() {
  const salt = Date.now();

  await bindToExchange(process.env['QUEUE_UNIT_CREATE'] + '_' + salt, process.env['EXCHANGE_UNIT_CREATE'], (data, cb) => {
    const result = JSON.parse(data);
    emit(process.env['SOCKET_UNIT_CREATE'], result);
    cb(true);
  });

  await bindToExchange(process.env['QUEUE_UNIT_UPDATE'] + '_' + salt, process.env['EXCHANGE_UNIT_UPDATE'], (data, cb) => {
    const result = JSON.parse(data);
    emit(process.env['SOCKET_UNIT_UPDATE'], result);
    cb(true);
  });

  await bindToExchange(process.env['QUEUE_UNIT_DELETE'] + '_' + salt, process.env['EXCHANGE_UNIT_DELETE'], (data, cb) => {
    const result = JSON.parse(data);
    emit(process.env['SOCKET_UNIT_DELETE'], result);
    cb(true);
  });

}
