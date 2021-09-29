
import { NotfoundError } from '@packages/errors';

import request from '@sys.packages/request';


export default () => async (ctx) => {
  const { uuid } = ctx['params'];

  const result = await request({
    url: process.env['ORDER_API_SRV'] + '/orders',
    method: 'get',
    params: {
      uuid,
    },
  });

  if ( ! result['data'].length) {
    throw new NotfoundError({ code: '3.0.0', message: 'Операция не найдена' });
  }

  ctx.body = {
    success: true,
    data: result['data'][0],
  };
}
