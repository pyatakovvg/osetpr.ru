
import request from "@sys.packages/request";


export default () => async (ctx) => {

  const { data } = await request({
    url: process.env['OPERATION_API_SRV'] + '/operations/statuses',
    method: 'get',
  });

  ctx.body = {
    success: true,
    data,
  };
}
