
import request from '@sys.packages/request';

import orderBuilder from './builder/order.mjs';


export default () => async (ctx) => {
  const { userUuid } = ctx['request']['query'];

  const { data: orders } = await request({
    url: process.env['ORDER_API_SRV'] + '/orders',
    params: {
      userUuid,
    },
  });

  ctx.body = {
    success: true,
    data: orders.map((order) => orderBuilder(order)),
  };
}
