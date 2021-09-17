
import request from "@sys.packages/request";


export default () => async (ctx) => {
  const { code } = ctx['params'];
  const formData = ctx['request']['body'];

  const { data } = await request({
    url: process.env['OPERATION_API_SRV'] + '/deliveries/' + code,
    method: 'put',
    data: formData,
  });

  ctx.body = {
    success: true,
    data: data,
  };
}
