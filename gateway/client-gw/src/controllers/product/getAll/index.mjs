
import request from "@sys.packages/request";

import productBuilder from './builder/product.mjs';


export default () => async (ctx) => {
  const { userUuid, ...params } = ctx['request']['query'];

  const { data: products, meta } = await request({
    url: process.env['PRODUCT_API_SRV'] + '/products',
    method: 'get',
    params: {
      isUse: true,
      ...params,
    },
  });

  let userPlan = null;
  if (userUuid) {
    const { data: plans } = await request({
      url: process.env['PLAN_API_SRV'] + '/plans',
      method: 'get',
      params: {
        userUuid,
      },
    });
    userPlan = plans.length ? plans[0]['products'] : null;
  }


  ctx.body = {
    success: true,
    data: products.map((item) => productBuilder(item, userPlan ? userPlan['products'] : [])),
    meta: meta,
  };
}
