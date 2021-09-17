
import request from '@sys.packages/request';


export default () => async (ctx) => {
  const formData = ctx['request']['body'];

  const result = await request({
    method: 'post',
    url: process.env['PROMOTION_API_SRV'] + '/promotions',
    data: formData,
  });

  ctx.body = {
    success: true,
    data: result['data'],
  };
}
