
import request from '@sys.packages/request';


export default () => async (ctx) => {
  const { id } = ctx['params'];
  const data = ctx['request']['body'];

  await request({
    url: process.env['IDENTITY_API_SRV'] + '/users/' + id,
    method: 'put',
    data: {
      login: data['login'],
    },
  });

  ctx.body = {
    success: true,
    data: null,
  };
}
