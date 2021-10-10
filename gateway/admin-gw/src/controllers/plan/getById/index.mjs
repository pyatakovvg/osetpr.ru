
import { NotfoundError } from '@packages/errors';

import request from "@sys.packages/request";

import planBuilder from './builder/plan.mjs';


export default () => async (ctx) => {
  const params = ctx['params'];

  const result = await request({
    url: process.env['PLAN_API_SRV'] + '/plans',
    method: 'get',
    params: {
      uuid: params['uuid'],
    },
  });

  if ( ! result['data'].length) {
    throw new NotfoundError({ code: '3.4.5', message: 'План не найден' });
  }

  ctx.body = {
    success: true,
    data: planBuilder(result['data'][0]),
  };
}
