
import { models } from '@sys.packages/db';


export default async function updateProperties(productUuid, shops) {
  const { Quantity} = models;

  if (shops && !! shops.length) {

    const shopsBulk = shops.map((shop) => ({
      productUuid,
      shopUuid: shop['uuid'],
      quantity: Number(shop['quantity']),
    }));

    await Quantity.bulkCreate(shopsBulk);
  }
}
