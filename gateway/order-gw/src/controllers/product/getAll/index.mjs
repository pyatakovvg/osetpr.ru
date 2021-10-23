
import request from "@sys.packages/request";

import productBuilder from './builder/product.mjs';
import {UnauthorizedError} from "@packages/errors";


export default () => async (ctx) => {
  const { uuid } = ctx['user'] || {};
  const params = ctx['request']['query'];

  if ( ! uuid) {
    throw new UnauthorizedError({ code: '401', message: 'User не найден' });
  }

  const result = await request({
    url: process.env['PRODUCT_API_SRV'] + '/products',
    method: 'get',
    params: {
      isUse: true,
      ...params,
    },
  });

  const { data: plans } = await request({
    url: process.env['PLAN_API_SRV'] + '/plans',
    method: 'get',
    params: {
      userUuid: uuid,
    },
  });

  const userPlan = plans.length ? plans[plans.length - 1] : null;

  ctx.body = {
    success: true,
    data: result['data'].map((item) => productBuilder(item, userPlan ? userPlan['products'] : [])),
    meta: result['meta'],
  };
}
