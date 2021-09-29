
import { ForbiddenError } from '@packages/errors';

import request from "@sys.packages/request";


export default () => async (ctx) => {
  const user = ctx['user'];

  const { uuid } = ctx['params'];
  const data = ctx['request']['body'];

  if (user['uuid'] !== data['userUuid']) {
    throw new ForbiddenError({ code: '7.7.8', message: 'Счет не принадлежит пользователю' });
  }

  const result = await request({
    url: process.env['ORDER_API_SRV'] + '/orders/' + uuid,
    method: 'put',
    data: {
      ...data,
      userUuid: user['uuid'],
    },
  });

  ctx.body = {
    success: true,
    data: result['data'],
  };
}
