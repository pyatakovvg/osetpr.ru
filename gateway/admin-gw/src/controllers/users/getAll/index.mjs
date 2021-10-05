
import request from "@sys.packages/request";


export default () => async (ctx) => {
  const query = ctx['request']['query'];

  const result = await request({
    url: process.env['IDENTITY_API_SRV'] + '/users',
    method: 'get',
    params: {
      ...query,
    },
  });

  ctx.body = {
    success: true,
    data: result['data'],
    meta: result['meta'],
  };
}
