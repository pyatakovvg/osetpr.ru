
import request from "@sys.packages/request";


export default () => async (ctx) => {
  const { uuid } = ctx['params'];
  const data = ctx['request']['body'];

  const result = await request({
    url: process.env['GALLERY_API_SRV'] + '/images/' + uuid,
    method: 'put',
    data,
  });

  ctx.body = {
    success: true,
    data: result['data'],
  };
}
