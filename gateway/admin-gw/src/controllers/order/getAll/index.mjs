
import request from "@sys.packages/request";


export default () => async (ctx) => {
  const params = ctx['params'];

  const result = await request({
    url: process.env['ORDER_API_SRV'] + '/orders',
    method: 'get',
    params,
  });

  const { data: statuses } = await request({
    url: process.env['ORDER_API_SRV'] + '/statuses',
    method: 'get',
    params,
  });

  ctx.body = {
    success: true,
    statuses,
    data: result['data'],
    meta: result['meta'],
  };
}
