
import request from "@sys.packages/request";

import productBuilder from './builder/product.mjs';


export default () => async (ctx) => {
  const params = ctx['params'];

  const result = await request({
    url: process.env['PRODUCT_API_SRV'] + '/products',
    method: 'get',
    params: {
      isUse: true,
      ...params,
    },
  });

  ctx.body = {
    success: true,
    data: result['data'].map((item) => productBuilder(item)),
    meta: result['meta'],
  };
}
