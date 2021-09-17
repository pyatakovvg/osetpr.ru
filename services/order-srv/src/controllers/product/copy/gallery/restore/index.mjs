
import { models } from '@sys.packages/db';


export default async function restoreGallery(productUuid) {
  const { ProductGallery } = models;

  await ProductGallery.destroy({
    where: {
      productUuid,
    }
  });
}
