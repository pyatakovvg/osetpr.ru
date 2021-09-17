
import request from "@sys.packages/request";


export default () => async (ctx) => {
  const { id } = ctx['params'];
  const formData = ctx['request']['body'];

  const { data } = await request({
    url: process.env['PRODUCT_API_SRV'] + '/categories/' + id,
    method: 'put',
    data: formData,
  });

  ctx.body = {
    success: true,
    data: data,
  };
};
