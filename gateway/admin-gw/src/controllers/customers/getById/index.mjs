
import { NotfoundError } from "@packages/errors";

import request from '@sys.packages/request';

import planBuild from './builder/plan.mjs';
import customerBuild from './builder/customer.mjs';


export default () => async (ctx) => {
  const { uuid } = ctx['params'];

  const { data: customers } = await request({
    url: process.env['CUSTOMER_API_SRV'] + '/customers',
    params: {
      uuid,
    },
  });

  if ( ! customers.length) {
    throw new NotfoundError({ code: '1.2.3', message: 'Клиент не найден' });
  }

  const { data: plans } = await request({
    url: process.env['PLAN_API_SRV'] + '/plans',
    params: {
      userUuid: customers[0]['userUuid'],
    },
  });

  ctx.body = {
    success: true,
    data: {
      ...customerBuild(customers[0]),
      plans: plans.map((plan) => planBuild(plan)),
    },
  };
}
