
import { sequelize, models } from '@sys.packages/db';


export default async function destroyType(productUuid) {
  const { ProductType } = models;

  const transaction = await sequelize.transaction();

  const result = await ProductType.findOne({
    where: {
      productUuid,
    },
    transaction,
  });

  await ProductType.destroy({
    where: {
      productUuid,
    },
    transaction,
  });

  await transaction.commit();

  return result.toJSON();
}
