
import { NotfoundError } from '@packages/errors';

import request from '@sys.packages/request';

import orderBuilder from './builder/order.mjs';


export default () => async (ctx) => {
  const { uuid } = ctx['params'];

  const { data } = await request({
    url: process.env['ORDER_API_SRV'] + '/orders',
    method: 'get',
    params: {
      uuid,
    },
  });

  if ( ! data.length) {
    throw new NotfoundError({ code: '5.0.0', message: 'Заказ не найден' });
  }

  ctx.body = {
    success: true,
    data: orderBuilder(data[0]),
  };
}
