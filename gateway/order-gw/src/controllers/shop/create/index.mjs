
import request from "@sys.packages/request";


export default () => async (ctx) => {
  const formData = ctx['request']['body'];

  const { data } = await request({
    url: process.env['SHOP_API_SRV'] + '/shops',
    method: 'post',
    data: formData,
  });

  ctx.body = {
    success: true,
    data: data,
  };
};
