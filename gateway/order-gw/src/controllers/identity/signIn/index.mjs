
import { NotfoundError, ForbiddenError } from '@packages/errors';

import { decode } from '@sys.packages/jwt';
import request from "@sys.packages/request";


export default () => async (ctx) => {
  const formData = ctx['request']['body'];

  const { data } = await request({
    url: process.env['IDENTITY_API_SRV'] + '/connect',
    headers: { 'User-Agent': ctx.headers['user-agent'] },
    method: 'post',
    data: formData,
  });

  if ( ! data) {
    throw new NotfoundError({ code: '1.7.8', message: 'Неверный логин или пароль' });
  }

  const tokenDecoded = await decode(data['accessToken']);

  if (tokenDecoded['payload']['role'] !== 'wholesale') {
    throw new ForbiddenError({ code: '7.7.7', message: 'Недостаточно прав' });
  }

  ctx.cookies.set(process.env['COOKIE_NAME'], encodeURIComponent(JSON.stringify(data)), {
    httpOnly: true,
  });

  ctx.body = {
    success: true,
    data: null,
  };
}
