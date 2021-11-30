
import request from "@sys.packages/request";


export default () => async (ctx) => {
  const data = ctx['request']['body'];

  await request({
    url: process.env['COMMENT_API_SRV'] + '/comments',
    method: 'delete',
    data: {
      uuid: data['uuid'],
    },
  });

  ctx.body = {
    success: true,
    data: null,
  };
}
