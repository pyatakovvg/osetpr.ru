
import request from "@sys.packages/request";


export default () => async (ctx) => {
  const { uuid } = ctx['params'];
  const fields = ctx['request']['body'];

  const result = await request({
    url: process.env['PRODUCT_API_SRV'] + '/products/' + uuid,
    method: 'put',
    data: {
      statusCode: fields['statusCode'],
      pay: fields['pay'],
      name: fields['name'],
      phone: fields['phone'],
      email: fields['email'],
      surname: fields['surname'],
      address: fields['address'],
      delivery: fields['delivery'],
      amount: fields['amount'],
    },
  });

  ctx.body = {
    success: true,
    data: result['data'],
  };
}
