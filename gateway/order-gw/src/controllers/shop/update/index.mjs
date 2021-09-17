
import request from "@sys.packages/request";


export default () => async (ctx) => {
  const { id } = ctx['params'];
  const formData = ctx['request']['body'];

  console.log(466546465, formData);

  const { data } = await request({
    url: process.env['SHOP_API_SRV'] + '/shops/' + id,
    method: 'put',
    data: formData,
  });

  ctx.body = {
    success: true,
    data: data,
  };
};
