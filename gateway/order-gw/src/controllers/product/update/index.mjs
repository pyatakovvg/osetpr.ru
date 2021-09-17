
import request from "@sys.packages/request";

import productBuilder from "../_bilders/productBuilder.mjs";


export default () => async (ctx) => {
  const { uuid } = ctx['params'];
  const body = ctx['request']['body'];

  const result = await request({
    url: process.env['PRODUCT_API_SRV'] + '/products/' + uuid,
    method: 'put',
    data: body,
  });

  ctx.body = {
    success: true,
    data: productBuilder(result['data']),
  };
}
