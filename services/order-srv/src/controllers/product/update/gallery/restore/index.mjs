
import { sequelize, models } from '@sys.packages/db';


export default async function updateProperties(productUuid, gallery) {
  const { ProductGallery } = models;

  const transaction = await sequelize.transaction();

  await ProductGallery.destroy({ where: { productUuid }}, { transaction });

  if (gallery && !! gallery.length) {
    await ProductGallery.bulkCreate(gallery.map((imageUuid, index) => ({
      imageUuid: imageUuid,
      productUuid: productUuid,
      order: index,
    })), {
      transaction,
    });
  }

  await transaction.commit();
}
