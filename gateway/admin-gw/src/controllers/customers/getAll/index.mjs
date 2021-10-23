
import request from "@sys.packages/request";

import customerBuilder from './builder/customer.mjs';


export default () => async (ctx) => {
  const params = ctx['params'];

  const result = await request({
    url: process.env['CUSTOMER_API_SRV'] + '/customers',
    method: 'get',
    params,
  });

  const { data: plans } = await request({
    url: process.env['PLAN_API_SRV'] + '/plans',
    params: {
      isActual: true,
      userUuid: result['data'].map((item) => item['userUuid']),
    },
  });

  ctx.body = {
    success: true,
    data: result['data'].map((item) => customerBuilder(item, plans)),
    meta: result['meta'],
  };
}
