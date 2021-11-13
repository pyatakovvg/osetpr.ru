
import request from "@sys.packages/request";


export default () => async (ctx) => {

  const result = await request({
    url: process.env['COMMENT_API_SRV'] + '/comments',
    method: 'get',
  });

  ctx.body = {
    success: true,
    data: result['data'],
    meta: result['meta'],
  };
}
