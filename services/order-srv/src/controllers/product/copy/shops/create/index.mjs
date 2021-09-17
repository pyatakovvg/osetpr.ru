
import { models } from '@sys.packages/db';


export default async function createQuantity(productUuid, shops) {
  const { Quantity } = models;

  await Quantity.bulkCreate(shops.map((shop) => ({
    productUuid,
    shopUuid: shop['uuid'],
    quantity: shop['quantity'],
  })));
}
