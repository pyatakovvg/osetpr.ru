
import request from '@sys.packages/request';


const PRODUCT_API_SRV = process.env['PRODUCT_API_SRV'];


export default () => async (ctx) => {
  const formData = ctx['request']['body'];

  const result = await request({
    method: 'post',
    url: PRODUCT_API_SRV + '/brands',
    data: formData,
  });

  ctx.body = {
    success: true,
    data: result['data'],
  };
}
