
import request from "@sys.packages/request";


export default () => async (ctx) => {
  const data = ctx['request']['body'];
console.log(data)
  const result = await request({
    url: process.env['ORDER_API_SRV'] + '/orders/' + data['uuid'],
    method: 'put',
    data: {
      uuid: data['uuid'],
      userUuid: data['userUuid'],
      products: data['products'],
    },
  });

  ctx.body = {
    success: true,
    data: result['data'],
  };
}
