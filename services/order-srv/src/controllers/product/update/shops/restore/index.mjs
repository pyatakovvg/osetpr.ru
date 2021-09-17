
import { sequelize, models } from '@sys.packages/db';


export default async function restoreShops(productUuid, shops) {
  const { Quantity } = models;
  const transaction = await sequelize.transaction();

  await Quantity.destroy({
    where: {
      productUuid,
    },
    transaction,
  });

  if ( !! shops.length) {
    await Quantity.bulkCreate(shops.map((shop) => ({
      productUuid: productUuid,
      shopUuid: shop['shopUuid'],
      quantity: shop['quantity'],
    })), {
      transaction,
    });
  }

  await transaction.commit();
}
