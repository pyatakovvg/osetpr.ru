
import request from '@sys.packages/request';

import orderBuilder from './builder/order.mjs';
import customerBuilder from './builder/customer.mjs';


export default () => async (ctx) => {
  const { userUuid } = ctx['request']['query'];

  const { data: orders } = await request({
    url: process.env['ORDER_API_SRV'] + '/orders',
    params: {
      userUuid,
      status: 'basket',
    },
  });

  const { data: customers } = await request({
    url: process.env['CUSTOMER_API_SRV'] + '/customers',
    params: {
      uuid: userUuid,
    },
  });

  const order = orders[0] ? orderBuilder(orders[0]) : null;
  const customer = customers[0] ? customerBuilder(customers[0]) : null;

  ctx.body = {
    success: true,
    data: {
      ...order,
      customer,
    },
  };
}
