
import request from "@sys.packages/request";


export default () => async (ctx) => {
  const params = ctx['params'];

  const result = await request({
    url: process.env['PLAN_API_SRV'] + '/plans',
    method: 'get',
    params,
  });

  ctx.body = {
    success: true,
    data: result['data'],
    meta: result['meta'],
  };
}
