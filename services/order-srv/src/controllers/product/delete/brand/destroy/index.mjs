
import { models, sequelize } from '@sys.packages/db';


export default async function destroyBrand(productUuid) {
  const { ProductBrand } = models;

  const transaction = await sequelize.transaction();

  const result = await ProductBrand.findOne({
    where: {
      productUuid,
    },
    transaction,
  });

  await ProductBrand.destroy({
    where: {
      productUuid,
    },
  });

  await transaction.commit();

  return result.toJSON();
}
