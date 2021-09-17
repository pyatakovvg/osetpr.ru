
import { models } from '@sys.packages/db';


export default async function restoreShops(data) {
  const { Quantity } = models;

  const shopsBulk = data.map((shop) => ({
    shopUuid: shop['shopUuid'],
    productUuid: shop['productUuid'],
    quantity: shop['quantity'],
  }));

  await Quantity.bulkCreate(shopsBulk);
}
