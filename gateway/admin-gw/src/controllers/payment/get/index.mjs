
import request from "@sys.packages/request";


export default () => async (ctx) => {
  const result = await request({
    method: 'get',
    url: process.env['ORDER_API_SRV'] + '/payments',
  });

  ctx.body = {
    success: true,
    data: result['data'],
  };
}
