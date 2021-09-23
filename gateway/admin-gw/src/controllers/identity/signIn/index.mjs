
import { UserNotFoundError, ForbiddenError } from '@packages/errors';

import { decode } from '@sys.packages/jwt';
import request from "@sys.packages/request";


export default () => async (ctx) => {
  const formData = ctx['request']['body'];

  const { data } = await request({
    method: 'post',
    url: process.env['IDENTITY_API_SRV'] + '/connect',
    headers: { 'User-Agent': ctx.headers['user-agent'] },
    data: formData,
  });

  if ( ! data) {
    throw new UserNotFoundError({ code: '3.3.3', message: 'Пользователь не найден' });
  }

  const user = await decode(data['accessToken']);

  if (user['role']['code'] !== 'admin') {
    throw new ForbiddenError({ code: '4.4.4', message: 'У вас нет прав' });
  }

  ctx.cookies.set(process.env['COOKIE_NAME'], encodeURIComponent(JSON.stringify(data)), {
    httpOnly: true,
  });

  ctx.body = {
    success: true,
    data: null,
  };
}
