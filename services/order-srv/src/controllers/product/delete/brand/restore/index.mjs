
import { models } from '@sys.packages/db';


export default async function restoreBrand(data) {
  const { ProductBrand } = models;

  await ProductBrand.create({
    productUuid: data['productUuid'],
    brandId: data['brandId'],
  });
}
