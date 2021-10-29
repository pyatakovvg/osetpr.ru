
import request from '@sys.packages/request';

import orderBuilder from './builder/order.mjs';


export default () => async (ctx) => {
  const { userUuid } = ctx['request']['query'];

  const { data } = await request({
    url: process.env['ORDER_API_SRV'] + '/orders',
    params: {
      userUuid,
      status: 'bucket',
    },
  });

  ctx.body = {
    success: true,
    data: data[0] ? orderBuilder(data[0]) : null,
  };
}
