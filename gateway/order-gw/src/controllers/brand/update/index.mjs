
import request from '@sys.packages/request';


export default () => async (ctx) => {
  const { id } = ctx['params'];
  const formData = ctx['request']['body'];

  const result = await request({
    method: 'put',
    url: process.env['PRODUCT_API_SRV'] + '/brands/' + id,
    data: formData,
  });

  ctx.body = {
    success: true,
    data: result['data'],
  };
}
