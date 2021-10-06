
import { emit } from '@sys.packages/socket.io';
import { bindToExchange } from '@sys.packages/rabbit';

import productBuilder from "./productBuilder.mjs";


export default async function() {
  const salt = Date.now();

  await bindToExchange(process.env['QUEUE_PRODUCT_CREATE'] + '_' + salt, process.env['EXCHANGE_PRODUCT_CREATE'], (data, cb) => {
    const result = JSON.parse(data);
    emit(process.env['SOCKET_PRODUCT_CREATE'], productBuilder(result));
    cb(true);
  });

  await bindToExchange(process.env['QUEUE_PRODUCT_UPDATE'] + '_' + salt, process.env['EXCHANGE_PRODUCT_UPDATE'], (data, cb) => {
    const result = JSON.parse(data);
    emit(process.env['SOCKET_PRODUCT_UPDATE'], productBuilder(result));
    cb(true);
  });

  await bindToExchange(process.env['QUEUE_PRODUCT_DELETE'] + '_' + salt, process.env['EXCHANGE_PRODUCT_DELETE'], (data, cb) => {
    const result = JSON.parse(data);
    emit(process.env['SOCKET_PRODUCT_DELETE'], result);
    cb(true);
  });
}
