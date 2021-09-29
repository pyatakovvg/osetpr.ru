
import request from "@sys.packages/request";

import productBuilder from './builder/product.mjs';


export default () => async (ctx) => {
  const { uuid } = ctx['params'];
  const fields = ctx['request']['body'];

  const result = await request({
    url: process.env['PRODUCT_API_SRV'] + '/products/' + uuid,
    method: 'put',
    data: fields,
  });

  ctx.body = {
    success: true,
    data: productBuilder(result['data']),
  };
}
