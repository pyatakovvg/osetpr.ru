
import request from '@sys.packages/request';

import orderBuilder from './builder/order.mjs';


export default () => async (ctx) => {
  const { uuid, userUuid } = ctx['request']['query'];

  const { data: orders } = await request({
    url: process.env['ORDER_API_SRV'] + '/orders',
    params: {
      uuid,
      userUuid,
      status: 'basket',
    },
  });

  ctx.body = {
    success: true,
    data: orders[0] ? orderBuilder(orders[0]) : null,
  };
}
