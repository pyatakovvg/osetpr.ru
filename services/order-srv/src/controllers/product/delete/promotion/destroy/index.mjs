
import request from "@sys.packages/request";


export default async function updateProperties(productUuid) {

  await request({
    url: process.env['PROMOTION_API_SRV'] + '/products',
    method: 'delete',
    params: {
      productUuid,
    },
  });
}
