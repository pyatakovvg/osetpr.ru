
import request from "@sys.packages/request";

import orderProduct from './builder/order.mjs';


export default () => async (ctx) => {
  const data = ctx['request']['body'];

  const result = await request({
    url: process.env['ORDER_API_SRV'] + '/orders/' + data['uuid'],
    method: 'put',
    data: {
      uuid: data['uuid'],
      userUuid: data['userUuid'],
      products: data['products'],
      address: data['address'],
      paymentCode: data['paymentCode'],
    },
  });

  ctx.body = {
    success: true,
    data: orderProduct(result['data']),
  };
}
