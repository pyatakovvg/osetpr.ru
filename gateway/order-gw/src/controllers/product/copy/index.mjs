
import request from "@sys.packages/request";

import productBuilder from "../_bilders/productBuilder.mjs";


export default () => async (ctx) => {
  const { uuid } = ctx['params'];

  const result = await request({
    url: process.env['PRODUCT_API_SRV'] + '/products/' + uuid + '/copy',
    method: 'post',
    data: null,
  });

  ctx.body = {
    success: true,
    data: productBuilder(result['data']),
  };
}
