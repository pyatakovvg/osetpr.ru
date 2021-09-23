
import request from 'axios';


export default () => async (ctx) => {
  const { uuid } = ctx['request']['body'];

  const { data } = await request({
    url: process.env['PRODUCT_API_SRV'] + '/products',
    method: 'delete',
    data: {
      uuid,
    },
  });

  ctx.body = {
    success: true,
    data,
  };
}
