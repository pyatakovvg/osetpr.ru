
import request from "@sys.packages/request";


export default () => async (ctx) => {
  const { page = 0, ...params } = ctx['request']['query'];

  const { data, meta } = await request({
    url: process.env['CUSTOMER_API_SRV'] + '/customers',
    method: 'get',
    params: {
      isSystem: false,
      take: Number(process.env['TAKE']),
      skip: (page > 0 ? page - 1 : 0) * Number(process.env['TAKE']),
      ...params,
    },
  });

  ctx.body = {
    success: true,
    data,
    meta,
  };
};
