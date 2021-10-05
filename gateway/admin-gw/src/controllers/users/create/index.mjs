
import request from "@sys.packages/request";


export default () => async (ctx) => {
  const formData = ctx['request']['body'];

  const result = await request({
    url: process.env['CUSTOMER_API_SRV'] + '/customers',
    method: 'post',
    data: formData,
  });

  ctx.body = {
    success: true,
    data: result['data']
  };
}
