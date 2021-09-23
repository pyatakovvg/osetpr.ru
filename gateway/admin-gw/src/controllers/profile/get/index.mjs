
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
    throw new NotfoundError({ code: '401', message: 'Пользователь не найден' });
  }

  const { data: customer } = await axios({
    url: process.env['CUSTOMER_API_SRV'] + '/customers',
    method: 'get',
    params: {
      userUuid: users[0]['uuid'],
    }
  });

  if ( ! customer.length) {
    throw new NotfoundError({ code: '401', message: 'Клиент не найден' });
  }

  ctx.body = {
    success: true,
    data: {
      uuid: users[0]['uuid'],
      role: users[0]['role'],
      permissions: [],
      login: users[0]['login'],
      customer: customer[0],
    },
  };
}
