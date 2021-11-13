
import { models } from '@sys.packages/db';


export default async function createGallery(productUuid, gallery) {
  const { ProductGallery } = models;

  if (gallery && !! gallery.length) {

    const newGallery = gallery.map((image, index) => ({
      imageUuid: image['uuid'],
      productUuid,
      order: index,
    }));

    await ProductGallery.bulkCreate(newGallery);
  }
}
