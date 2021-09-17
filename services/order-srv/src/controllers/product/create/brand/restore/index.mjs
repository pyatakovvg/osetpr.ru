
import { models } from '@sys.packages/db';


export default async function updateProperties(productUuid) {
  const { ProductBrand } = models;

  await ProductBrand.destroy({
    where: {
      productUuid,
    },
  });
}
