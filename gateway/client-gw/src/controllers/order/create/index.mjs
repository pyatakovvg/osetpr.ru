
import request from "@sys.packages/request";

import orderBuilder from './builder/order.mjs';


export default () => async (ctx) => {
  const formData = ctx['request']['body'];
console.log(formData)
  const result = await request({
    url: process.env['ORDER_API_SRV'] + '/orders',
    method: 'post',
    data: {
      ...formData,
      statusCode: 'basket'
    },
  });

  ctx.body = {
    success: true,
    data: orderBuilder(result['data']),
  };
}
