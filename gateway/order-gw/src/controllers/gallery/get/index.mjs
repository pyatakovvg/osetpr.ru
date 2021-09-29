
import request from 'axios';


export default () => async (ctx) => {
  const { uuid } = ctx['params'];
  const { size = 'large' } = ctx['query'];

  const result = await request({
    method: 'get',
    url: process.env['GALLERY_API_SRV'] + '/images/' + uuid,
    responseType: 'stream',
    params: {
      size
    }
  });

  ctx.body = result['data'];
}
