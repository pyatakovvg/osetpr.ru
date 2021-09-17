
import { sequelize, models } from '@sys.packages/db';


export default async function restoreCategory(productUuid, categoryId) {
  const { ProductCategory } = models;

  const transaction = await sequelize.transaction();

  await ProductCategory.destroy({
    where: {
      productUuid,
    },
    transaction,
  });

  if (categoryId) {
    await ProductCategory.create({
      productUuid,
      categoryId,
    }, {
      transaction,
    });
  }

  await transaction.commit();
}
