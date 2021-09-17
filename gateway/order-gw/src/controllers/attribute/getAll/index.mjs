
import request from "@sys.packages/request";


export default () => async (ctx) => {
  const query = ctx['request']['query'];

  const { data } = await request({
    url: process.env['PRODUCT_API_SRV'] + '/attributes',
    method: 'get',
    params: query,
  });

  ctx.body = {
    success: true,
    data,
  };
};
