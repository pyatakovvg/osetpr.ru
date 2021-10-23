
import request from "@sys.packages/request";


export default () => async (ctx) => {
  const { uuid } = ctx['params'];
  const data = ctx['request']['body'];

  await request({
    url: process.env['CUSTOMER_API_SRV'] + '/customers/' + uuid,
    method: 'put',
    data: {
      ...data,
    },
  });

  await request({
    url: process.env['PLAN_API_SRV'] + '/users/' + data['userUuid'],
    method: 'put',
    data: {
      ...data['plans'],
    },
  });

  ctx.body = {
    success: true,
    data: null,
  };
}
