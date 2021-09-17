
import request from '@sys.packages/request';


const PRODUCT_API_SRV = process.env['PRODUCT_API_SRV'];


export default () => async (ctx) => {
  const result = await request({
    method: 'get',
    url: PRODUCT_API_SRV + '/brands',
  });

  ctx.body = {
    success: true,
    data: result['data'],
  };
}
