
import request from "@sys.packages/request";


export default () => async (ctx) => {
  const result = await request({
    method: 'get',
    url: process.env['PRODUCT_API_SRV'] + '/groups',
  });

  ctx.body = {
    success: true,
    data: result['data'],
  };
}
