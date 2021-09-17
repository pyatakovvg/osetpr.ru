
import request from "@sys.packages/request";


const PRODUCT_API_SRV = process.env['PRODUCT_API_SRV'];


export default () => async (ctx) => {
  const formData = ctx['request']['body'];

  const result = await request({
    url: PRODUCT_API_SRV + '/comments/' + formData['id'],
    method: 'put',
    data: {
      person: formData['person'],
      comment: formData['comment'],
    },
  });

  ctx.body = {
    success: true,
    data: result['data'],
  };
}
