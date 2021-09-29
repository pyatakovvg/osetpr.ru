
import { models } from '@sys.packages/db';


export default async function updateProperties(uuid) {
  const { ProductGallery } = models;

  await ProductGallery.destroy({ where: { productUuid: uuid }});
}
