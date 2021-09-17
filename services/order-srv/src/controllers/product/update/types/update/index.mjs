
import { sequelize, models } from '@sys.packages/db';


export default async function updateProperties(productUuid, typeId) {
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

  if (typeId) {

    await ProductType.create({
      productUuid,
      typeId,
    }, {
      transaction,
    });
  }

  await transaction.commit();

  return result ? result.toJSON() : null;
}
