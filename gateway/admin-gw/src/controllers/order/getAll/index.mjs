
import request from "@sys.packages/request";

import customerBuilder from './builder/customer.mjs';


export default () => async (ctx) => {
  const params = ctx['params'];

  const result = await request({
    url: process.env['ORDER_API_SRV'] + '/orders',
    method: 'get',
    params,
  });

  const { data: statuses } = await request({
    url: process.env['ORDER_API_SRV'] + '/statuses',
    method: 'get',
    params,
  });

  const { data: customers } = await request({
    url: process.env['CUSTOMER_API_SRV'] + '/customers',
    method: 'get',
  });

  ctx.body = {
    success: true,
    filters: {
      statuses,
      customers: customers.map((customer) => customerBuilder(customer)),
    },
    data: result['data'],
    meta: result['meta'],
  };
}
