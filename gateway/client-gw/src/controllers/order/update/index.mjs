
import request from "@sys.packages/request";

import orderProduct from './builder/order.mjs';


export default () => async (ctx) => {
  const data = ctx['request']['body'];

  const result = await request({
    url: process.env['ORDER_API_SRV'] + '/orders/' + data['uuid'],
    method: 'put',
    data: {
      statusCode: data['statusCode'],
      address: data['address'],
      userUuid: data['userUuid'],
      products: data['products'],
      customer: data['customer'],
      description: data['description'],
      paymentCode: data['paymentCode'],
    },
  });

  ctx.body = {
    success: true,
    data: orderProduct(result['data']),
  };
}
