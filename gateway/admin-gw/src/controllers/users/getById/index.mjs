
import { NotfoundError } from '@packages/errors';

import request from 'axios';


export default () => async (ctx) => {
  const { customerUuid } = ctx['params'];

  const { data } = await request({
    url: process.env['CUSTOMER_API_SRV'] + '/customers',
    params: {
      uuid: customerUuid,
    },
  });

  if ( ! data.length) {
    throw new NotfoundError({ code: '1.2.3', message: 'Клиент не найден' });
  }

  ctx.body = {
    success: true,
    data: data[0],
  };
}
