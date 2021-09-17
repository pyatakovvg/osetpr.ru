
import { models } from '@sys.packages/db';


export default async function updateProperties(productUuid, brandId) {
  const { ProductBrand } = models;

  if (brandId) {

    await ProductBrand.create({
      productUuid,
      brandId,
    });
  }
}
