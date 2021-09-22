
import request from 'axios';


export default () => async (ctx) => {
  const { customerUuid } = ctx['params'];

  const {data} = await request({
    url: process.env['CUSTOMER_API_SRV'] + '/customers',
    params: {
      uuid: customerUuid,
    },
  });

  ctx.body = {
    success: true,
    data,
  };
}
