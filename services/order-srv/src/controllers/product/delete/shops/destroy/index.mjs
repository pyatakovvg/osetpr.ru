
import { models, sequelize } from '@sys.packages/db';


export default async function destroyShops(productUuid) {
  const { Quantity } = models;

  const transaction = await sequelize.transaction();

  const result = await Quantity.findAll({
    where: {
      productUuid,
    },
    transaction,
  });

  await Quantity.destroy({
    where: {
      productUuid,
    },
    transaction,
  });

  await transaction.commit();

  return result.map((shop) => shop.toJSON());
}
