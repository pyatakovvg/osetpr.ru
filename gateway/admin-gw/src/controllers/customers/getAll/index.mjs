
import request from "@sys.packages/request";


export default () => async (ctx) => {
  const params = ctx['params'];

  const result = await request({
    url: process.env['CUSTOMER_API_SRV'] + '/customers',
    method: 'get',
    params,
  });

  ctx.body = {
    success: true,
    data: result['data'],
    meta: result['meta'],
  };
}
