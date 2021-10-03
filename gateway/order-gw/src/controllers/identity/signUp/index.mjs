
import { UserNotFoundError } from '@packages/errors';

import request from "@sys.packages/request";


export default () => async (ctx) => {
  const data = ctx['request']['body'];

  const { data: user } = await request({
    method: 'post',
    url: process.env['IDENTITY_API_SRV'] + '/create',
    headers: { 'User-Agent': ctx.headers['user-agent'] },
    data: {
      login: data['login'],
      password: data['password'],
      roleCode: 'wholesale',
      customer: {
        type: 'legal',
        ...data['customer'],
      },
    },
  });

  if ( ! user) {
    throw new UserNotFoundError('Пользователь не создан');
  }

  ctx.cookies.set(process.env['COOKIE_NAME'], encodeURIComponent(JSON.stringify(user)), {
    httpOnly: true,
  });

  ctx.body = {
    success: true,
    data: null,
  };
}
