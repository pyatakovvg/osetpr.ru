
import request from "@sys.packages/request";


export default () => async (ctx) => {
  const formData = ctx['request']['body'];

  const result = await request({
    url: process.env['PLAN_API_SRV'] + '/plans',
    method: 'post',
    data: formData,
  });

  ctx.body = {
    success: true,
    data: result['data']
  };
}
