
import { UUID } from '@sys.packages/utils';
import request from "@sys.packages/request";


export default () => async (ctx) => {
  const { uuid } = ctx['user'];
  const data = ctx['request']['body'];

  const result = await request({
    url: process.env['ORDER_API_SRV'] + '/orders',
    method: 'post',
    data: {
      uuid: UUID(),
      userUuid: uuid,
      statusCode: 'new',
      ...data,
    },
  });

  ctx.body = {
    success: true,
    data: result['data']
  };
}
