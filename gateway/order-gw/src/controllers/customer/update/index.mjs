
import request from "@sys.packages/request";


export default () => async (ctx) => {
  const data = ctx['request']['body'];

  const result = await request({
    url: process.env['CUSTOMER_API_SRV'] + '/customers/' + data['id'],
    method: 'put',
    data,
  });

  ctx.body = {
    success: true,
    data: result['data'],
  };
};
