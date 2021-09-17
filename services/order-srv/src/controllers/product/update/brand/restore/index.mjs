
import { sequelize, models } from '@sys.packages/db';


export default async function restoreBrand(productUuid, brandId) {
  const { ProductBrand } = models;

  const transaction = await sequelize.transaction();

  await ProductBrand.destroy({
    where: {
      productUuid,
    },
    transaction,
  });

  if (brandId) {
    await ProductBrand.create({
      productUuid,
      brandId,
    }, {
      transaction,
    });
  }

  await transaction.commit();
}
