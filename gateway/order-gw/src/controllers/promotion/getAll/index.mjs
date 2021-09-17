
import request from '@sys.packages/request';


export default () => async (ctx) => {
  const result = await request({
    url: process.env['PROMOTION_API_SRV'] + '/promotions',
    method: 'get',
  });

  ctx.body = {
    success: true,
    data: result['data'],
  };
}
