
import request from "@sys.packages/request";


export default () => async (ctx) => {
  const data = ctx['request']['body'];

  await request({
    url: process.env['PUSH_API_SRV'] + '/register',
    method: 'post',
    data,
  });

  ctx.body = {
    success: true,
    data: null,
  };
}
