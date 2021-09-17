
import { models, sequelize } from '@sys.packages/db';


export default async function destroyGallery(productUuid) {
  const { ProductGallery } = models;

  const transaction = await sequelize.transaction();

  const result = await ProductGallery.findAll({
    where: {
      productUuid,
    },
    transaction,
  });

  await ProductGallery.destroy({
    where: {
      productUuid,
    },
    transaction,
  });

  await transaction.commit();

  return result.map((gallery) => gallery.toJSON());
}
