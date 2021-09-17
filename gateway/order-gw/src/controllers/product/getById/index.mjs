
import { NotfoundError } from '@packages/errors';

import request from '@sys.packages/request';

import productBuilder from '../_bilders/productBuilder.mjs';


async function getProductById(uuid) {
  const { data } = await request({
    url: process.env['PRODUCT_API_SRV'] + '/products',
    method: 'get',
    params: {
      uuid,
    }
  });

  if ( ! data[0]) {
    throw new NotfoundError('Товар не найден');
  }

  return data[0];
}

export default () => async (ctx) => {
  const { uuid } = ctx['params'];

  const product = await getProductById(uuid);

  ctx.body = {
    success: true,
    data: productBuilder(product),
  };
}
