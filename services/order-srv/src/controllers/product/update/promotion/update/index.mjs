
import request from "@sys.packages/request";


export default async function updateProperties(uuid, promotions) {

  const result = await request({
    url: process.env['PROMOTION_API_SRV'] + '/products',
    method: 'get',
    params: {
      productUuid: uuid,
    },
  });

  await request({
    url: process.env['PROMOTION_API_SRV'] + '/products',
    method: 'delete',
    params: {
      productUuid: uuid,
    },
  });

  if (promotions && !! promotions.length) {

    await request({
      url: process.env['PROMOTION_API_SRV'] + '/products',
      method: 'post',
      data: {
        productUuid: uuid,
        promotions,
      },
    });
  }

  return result['data'].map((promo) => promo['promotionId']);
}
