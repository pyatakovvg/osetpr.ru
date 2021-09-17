
import { sequelize, models } from '@sys.packages/db';


export default async function updateProperties(productUuid, brandId) {
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
    transaction,
  });

  await ProductBrand.create({
    productUuid,
    brandId,
  }, {
    transaction,
  });

  await transaction.commit();

  return result ? result.toJSON() : null;
}
