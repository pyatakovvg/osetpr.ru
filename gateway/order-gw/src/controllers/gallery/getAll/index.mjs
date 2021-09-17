
import request from '@sys.packages/request';


export default () => async (ctx) => {
  const result = await request({
    method: 'get',
    url: process.env['GALLERY_API_SRV'] + '/images',
  });

  ctx.body = {
    success: true,
    data: result['data'],
    meta: result['meta'],
  };
}
