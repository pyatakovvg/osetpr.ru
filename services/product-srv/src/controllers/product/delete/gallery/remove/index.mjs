
import { models } from '@sys.packages/db';


export default async function destroyProperties(productUuid) {
  const { ProductGallery } = models;

  await ProductGallery.destroy({
    where: {
      productUuid,
    }});
}
