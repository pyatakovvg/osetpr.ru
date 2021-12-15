
import request from "@sys.packages/request";


export default () => async (ctx) => {
  const data = ctx['request']['body'];
  const { uuid } = ctx.user;

  const result = await request({
    url: process.env['COMMENT_API_SRV'] + '/comments',
    method: 'post',
    data: {
      userUuid: uuid,
      ...data,
    },
  });

  ctx.body = {
    success: true,
    data: result['data'],
  };
}
