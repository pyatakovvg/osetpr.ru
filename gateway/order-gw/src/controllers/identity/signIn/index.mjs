
import { UserNotFoundError } from '@packages/errors';

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
    throw new UserNotFoundError();
  }

  ctx.cookies.set(process.env['COOKIE_NAME'], encodeURIComponent(JSON.stringify(data)), {
    httpOnly: true,
  });

  ctx.body = {
    success: true,
    data: null,
  };
}
