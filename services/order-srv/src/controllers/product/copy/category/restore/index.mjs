
import { models } from '@sys.packages/db';


export default async function restoreCategory(productUuid) {
  const { ProductCategory } = models;

  await ProductCategory.destroy({
    where: {
      productUuid,
    },
  });
}
