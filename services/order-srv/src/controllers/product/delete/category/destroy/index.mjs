
import { models, sequelize } from '@sys.packages/db';


export default async function destroyCategory(productUuid) {
  const { ProductCategory } = models;

  const transaction = await sequelize.transaction();

  const result = await ProductCategory.findOne({
    where: {
      productUuid,
    },
    transaction,
  });

  await ProductCategory.destroy({
    where: {
      productUuid,
    },
    transaction,
  });

  await transaction.commit();

  return result.toJSON();
}
