
import request from "@sys.packages/request";

import productBuilder from './builder/product.mjs';


export default () => async (ctx) => {
  const formData = ctx['request']['body'];

  const result = await request({
    url: process.env['PRODUCT_API_SRV'] + '/products',
    method: 'post',
    data: formData,
  });

  ctx.body = {
    success: true,
    data: productBuilder(result['data']),
  };
}
