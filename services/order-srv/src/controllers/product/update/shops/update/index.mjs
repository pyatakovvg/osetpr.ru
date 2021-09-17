
import { sequelize, models } from '@sys.packages/db';


export default async function updateShops(uuid, shops) {
  const { Quantity } = models;

  const transaction = await sequelize.transaction();

  const result = await Quantity.findAll({
    where: { productUuid: uuid },
    transaction,
  });

  await Quantity.destroy({
    where: {
      productUuid: uuid,
    },
    transaction,
  });

  await Quantity.bulkCreate(shops.map((shop) => ({
    productUuid: uuid,
    shopUuid: shop['uuid'],
    quantity: Number(shop['quantity']),
  })), {
    transaction,
  });

  await transaction.commit();

  return !! result.length ? result.map((shop) => shop.toJSON()) : null;
}
