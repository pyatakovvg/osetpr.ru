
import request from '@sys.packages/request';


export default () => async (ctx) => {
  const {uuid} = ctx['request']['body'];

  const result = await request({
    url: process.env['GALLERY_API_SRV'] + '/images',
    method: 'delete',
    data: { uuid },
  });

  ctx.body = {
    success: true,
    data: result['data'],
  };
}
