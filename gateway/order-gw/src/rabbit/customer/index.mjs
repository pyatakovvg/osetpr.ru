
import { emit } from '@sys.packages/socket.io';
import { bindToExchange } from '@sys.packages/rabbit';


export default async function() {
  const salt = Date.now();

  await bindToExchange(process.env['QUEUE_CUSTOMER_UPDATE'] + '_' + salt, process.env['EXCHANGE_CUSTOMER_UPDATE'], (data, cb) => {
    const result = JSON.parse(data);
    emit(process.env['SOCKET_CUSTOMER_UPDATE'], result);
    cb(true);
  });
}
