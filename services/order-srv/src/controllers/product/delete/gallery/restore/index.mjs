
import { models } from '@sys.packages/db';


export default async function restoreGallery(data) {
  const { ProductGallery } = models;

  const galleryBulk = data.map((gallery) => ({
    imageUuid: gallery['imageUuid'],
    productUuid: gallery['productUuid'],
    order: gallery['order'],
  }));

  await ProductGallery.bulkCreate(galleryBulk);
}
