
import { sequelize, models } from '@sys.packages/db';


export default async function updateProperties(productUuid, gallery) {
  const { ProductGallery } = models;

  const transaction = await sequelize.transaction();

  const result = await ProductGallery.findAll({
    where: { productUuid },
    transaction,
  });

  await ProductGallery.destroy({ where: { productUuid }}, { transaction });
  if (gallery && !! gallery.length) {
    const newGallery = gallery.map((imageUuid, index) => {
      return {
        imageUuid,
        productUuid,
        order: index,
      }
    });
    await ProductGallery.bulkCreate(newGallery, { transaction });
  }

  await transaction.commit();

  return result.map((row) => row.toJSON());
}
