
import { sequelize, models } from '@sys.packages/db';


export default async function updateCategory(uuid, categoryId) {
  const { ProductCategory } = models;

  const transaction = await sequelize.transaction();

  const result = await ProductCategory.findOne({
    where: {
      productUuid: uuid,
    },
    transaction,
  });

  await ProductCategory.destroy({
    where: {
      productUuid: uuid,
    },
    transaction,
  });

  if (categoryId) {

    await ProductCategory.create({
      productUuid: uuid,
      categoryId,
    }, {
      transaction,
    });
  }

  await transaction.commit();

  return result ? result.toJSON() : null;
}
