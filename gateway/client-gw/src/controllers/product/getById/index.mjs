
import { NotfoundError } from '@packages/errors';

import request from "@sys.packages/request";

import productBuilder from './builder/product.mjs';


export default () => async (ctx) => {
  const params = ctx['params'];

  const { data } = await request({
    url: process.env['PRODUCT_API_SRV'] + '/products',
    method: 'get',
    params: {
      externalId: params['uuid'],
    },
  });

  if ( ! data.length) {
    throw new NotfoundError('Продукт не найден');
  }

  ctx.body = {
    success: true,
    data: productBuilder(data[0]),
  };
}
