
import request from "@sys.packages/request";


export default () => async (ctx) => {
  const query = ctx['request']['query'];

  const result = await request({
    url: process.env['COMMENT_API_SRV'] + '/comments',
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
