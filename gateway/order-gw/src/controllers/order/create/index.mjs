
import { UUID } from '@sys.packages/utils';
import request from "@sys.packages/request";
import {UnauthorizedError} from "@packages/errors";


export default () => async (ctx) => {
  const user = ctx['user'];
  const data = ctx['request']['body'];

  if ( ! user['uuid']) {
    throw new UnauthorizedError({ code: '6.7.9', message: 'UUID пользователя не найден' });
  }

  const result = await request({
    url: process.env['ORDER_API_SRV'] + '/orders',
    method: 'post',
    data: {
      uuid: UUID(),
      userUuid: user['uuid'],
      statusCode: 'new',
      ...data,
    },
  });

  ctx.body = {
    success: true,
    data: result['data']
  };
}
