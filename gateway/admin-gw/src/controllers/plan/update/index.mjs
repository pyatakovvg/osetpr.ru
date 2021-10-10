
import request from "@sys.packages/request";


export default () => async (ctx) => {
  const { uuid } = ctx['params'];
  const data = ctx['request']['body'];

  const result = await request({
    url: process.env['PLAN_API_SRV'] + '/plans/' + uuid,
    method: 'put',
    data: {
      ...data,
    },
  });

  ctx.body = {
    success: true,
    data: result['data'],
  };
}
