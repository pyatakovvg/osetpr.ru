
import { NotfoundError } from '@packages/errors';

import request from '@sys.packages/request';

import orderBuilder from './builder/order.mjs';


export default () => async (ctx) => {
  const { uuid } = ctx['params'];
  const { userUuid } = ctx['request']['query'];

  const { data: orders } = await request({
    url: process.env['ORDER_API_SRV'] + '/orders',
    params: {
      uuid,
      userUuid,
    },
  });

  if ( ! orders[0]) {
    throw new NotfoundError({ code: '1.0.5', message: 'Запрашиваемый заказ не найден' });
  }

  ctx.body = {
    success: true,
    data: orderBuilder(orders[0]),
  };
}
