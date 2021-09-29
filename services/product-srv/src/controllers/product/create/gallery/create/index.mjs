
import { models } from '@sys.packages/db';


export default async function updateProperties(uuid, gallery) {
  const { ProductGallery } = models;
console.log(gallery)
  if (gallery && !! gallery.length) {

    const newGallery = gallery.map((imageUuid, index) => ({
      uuid: imageUuid,
      productUuid: uuid,
      order: index,
    }));
    await ProductGallery.bulkCreate(newGallery);
  }
}
