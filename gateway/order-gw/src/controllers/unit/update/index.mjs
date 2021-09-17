
import request from '@sys.packages/request';


const PRODUCT_API_SRV = process.env['PRODUCT_API_SRV'];


export default () => async (ctx) => {
  const {id} = ctx['params'];
  const formData = ctx['request']['body'];

  const result = await request({
    method: 'put',
    url: PRODUCT_API_SRV + '/units/' + id,
    data: formData,
  });

  ctx.body = {
    success: true,
    data: result['data'],
  };
}
