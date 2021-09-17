
import { models } from '@sys.packages/db';


export default async function restoreBrand(productUuid) {
  const { ProductBrand } = models;

  await ProductBrand.destroy({
    where: {
      productUuid,
    },
  });
}
