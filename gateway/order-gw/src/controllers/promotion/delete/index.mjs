
import request from '@sys.packages/request';


export default () => async (ctx) => {
  const { id } = ctx['request']['body'];

  const result = await request({
    method: 'delete',
    url: process.env['PROMOTION_API_SRV'] + '/promotions',
    data: { id },
  });

  ctx.body = {
    success: true,
    data: result['data'],
  };
}
