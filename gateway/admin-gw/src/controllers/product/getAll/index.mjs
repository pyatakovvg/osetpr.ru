
import request from "@sys.packages/request";

import productBuilder from './builder/product.mjs';


export default () => async (ctx) => {
  const params = ctx['request']['query'];

  const { data: products, meta } = await request({
    url: process.env['PRODUCT_API_SRV'] + '/products',
    method: 'get',
    params,
  });

  const { data: groups } = await request({
    url: process.env['PRODUCT_API_SRV'] + '/groups',
    method: 'get',
  });

  const { data: categories } = await request({
    url: process.env['PRODUCT_API_SRV'] + '/categories',
    method: 'get',
  });

  ctx.body = {
    success: true,
    meta,
    filter: {
      groups,
      categories,
    },
    data: products.map((item) => productBuilder(item)),
  };
}
