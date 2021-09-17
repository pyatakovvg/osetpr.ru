
import { models } from '@sys.packages/db';


export default async function updateProperties(productUuid, gallery) {
  const { ProductGallery } = models;

  if (gallery && !! gallery.length) {

    const galleryBalk = gallery.map((imageUuid, index) => ({
      imageUuid,
      productUuid,
      order: index,
    }));

    await ProductGallery.bulkCreate(galleryBalk);
  }
}
