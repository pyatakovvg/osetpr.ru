
import request from 'axios';


export default () => async (ctx) => {
  const { id } = ctx['params'];
  const { size = 'large' } = ctx['query'];

  console.log(id)

  const result = await request({
    method: 'get',
    url: process.env['GALLERY_API_SRV'] + '/images/' + id,
    responseType: 'stream',
    params: {
      size
    }
  });

  ctx.body = result['data'];
}
