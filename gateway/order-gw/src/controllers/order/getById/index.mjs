
import request from 'axios';


export default () => async (ctx) => {
  const {operationId} = ctx['params'];

  const {data} = await request({
    url: process.env['OPERATION_API_SRV'] + '/operations/' + operationId,
  });

  ctx.body = {
    success: true,
    data,
  };
}
