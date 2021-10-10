
import { bindToExchange } from '@sys.packages/rabbit';

import { updateProduct, createProduct } from '../../actions/product';

import productBuilder from "./builder/productBuilder.mjs";


export default async function() {
  const salt = Date.now();

  await bindToExchange(process.env['QUEUE_PRODUCT_CREATE'] + '_' + salt, process.env['EXCHANGE_PRODUCT_CREATE'], async (data, cb) => {
    const result = JSON.parse(data);
    const modes = productBuilder(result);

    try {
      await createProduct(modes);
      cb(true);
    }
    catch(error) {
      cb(false);
    }
  });

  await bindToExchange(process.env['QUEUE_PRODUCT_UPDATE'] + '_' + salt, process.env['EXCHANGE_PRODUCT_UPDATE'], async (data, cb) => {
    const result = JSON.parse(data);
    const modes = productBuilder(result);

    try {
      await updateProduct(modes);
      cb(true);
    }
    catch(error) {
      cb(false);
    }
  });

  // await bindToExchange(process.env['QUEUE_PRODUCT_DELETE'] + '_' + salt, process.env['EXCHANGE_PRODUCT_DELETE'], (data, cb) => {
  //   const result = JSON.parse(data);
  //   emit(process.env['SOCKET_PRODUCT_DELETE'], result);
  //   cb(true);
  // });
}
