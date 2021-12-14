
import request from "@sys.packages/request";


export default () => async (ctx) => {
  const data = ctx['request']['body'];

  const result = await request({
    url: process.env['ORDER_API_SRV'] + '/payments',
    method: 'post',
    data,
  });

  ctx.body = {
    success: true,
    data: result['data'],
  };
}
