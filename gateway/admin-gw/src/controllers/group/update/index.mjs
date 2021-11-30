
import request from "@sys.packages/request";


export default () => async (ctx) => {
  const data = ctx['request']['body'];
console.log(data)
  const result = await request({
    url: process.env['PRODUCT_API_SRV'] + '/groups',
    method: 'put',
    data,
  });

  ctx.body = {
    success: true,
    data: result['data'],
  };
}
