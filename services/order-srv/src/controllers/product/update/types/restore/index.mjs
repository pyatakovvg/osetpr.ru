
import { sequelize, models } from '@sys.packages/db';


export default async function restoreType(productUuid, typeId) {
  const { ProductType } = models;

  const transaction = await sequelize.transaction();

  await ProductType.destroy({
    where: {
      productUuid,
    },
    transaction,
  });

  if (typeId) {
    await ProductType.create({
      productUuid,
      typeId,
    }, {
      transaction,
    });
  }

  await transaction.commit();
}
