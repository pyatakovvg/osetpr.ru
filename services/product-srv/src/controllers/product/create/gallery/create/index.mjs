
import { models } from '@sys.packages/db';


export default async function updateProperties(uuid, gallery) {
  const { ProductGallery } = models;

  if (gallery && !! gallery.length) {

    const newGallery = gallery.map((imageUuid, index) => ({
      imageUuid,
      productUuid: uuid,
      order: index,
    }));

    await ProductGallery.bulkCreate(newGallery);
  }
}
