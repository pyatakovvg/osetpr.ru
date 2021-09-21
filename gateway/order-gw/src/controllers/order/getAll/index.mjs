
import { UnauthorizedError } from '@packages/errors';

import request from "@sys.packages/request";


export default () => async (ctx) => {
  const { uuid } = ctx['user'];
  const params = ctx['params'];

  if ( ! uuid) {
    throw new UnauthorizedError('UUID пользователя не найден');
  }

  const result = await request({
    url: process.env['ORDER_API_SRV'] + '/orders',
    method: 'get',
    params: {
      ...params,
      userUuid: uuid,
    },
  });

  const { data: statuses } = await request({
    url: process.env['ORDER_API_SRV'] + '/statuses',
    method: 'get',
  });

  ctx.body = {
    success: true,
    statuses,
    data: result['data'],
    meta: result['meta'],
  };
}
