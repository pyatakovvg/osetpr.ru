
import { NotfoundError, UnauthorizedError } from "@packages/errors";

import axios from "@sys.packages/request";


export default () => async (ctx) => {
  const { uuid } = ctx['user'] || {};

  if ( ! uuid) {
    throw new UnauthorizedError({ code: '401', message: 'User не найден' });
  }

  const { data: users } = await axios({
    method: 'get',
    url: process.env['IDENTITY_API_SRV'] + '/users',
    params: {
      uuid,
    },
  });

  if ( ! users.length) {
    throw new NotfoundError({ code: '401', message: 'User не найден' });
  }

  const { data: seller } = await axios({
    url: process.env['SELLER_API_SRV'] + '/sellers',
    method: 'get',
    params: {
      userUuid: users[0]['uuid'],
    }
  });

  ctx['user']['user'] = seller[0];

  ctx.body = {
    success: true,
    data: {
      uuid: users[0]['uuid'],
      role: users[0]['role'],
      login: users[0]['login'],
      user: seller[0],
    },
  };
}
