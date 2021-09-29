
import { sequelize, models } from '@sys.packages/db';


export default async function updateProperties(uuid, gallery) {
  const { ProductGallery } = models;

  const transaction = await sequelize.transaction();

  await ProductGallery.destroy({ where: { productUuid: uuid }}, { transaction });

  if (gallery && !! gallery.length) {
    await ProductGallery.bulkCreate(gallery.map((img) => ({
      imageUuid: img['imageUuid'],
      productUuid: img['productUuid'],
      order: img['order'],
    })), {
      transaction,
    });
  }

  await transaction.commit();
}
