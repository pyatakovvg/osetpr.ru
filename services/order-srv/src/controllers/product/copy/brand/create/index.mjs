
import { models } from '@sys.packages/db';


export default async function createBrand(productUuid, brandId) {
  const { ProductBrand } = models;

  await ProductBrand.create({
    productUuid,
    brandId,
  });
}
