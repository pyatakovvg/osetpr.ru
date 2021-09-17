
import { models } from '@sys.packages/db';


export default async function createCategory(productUuid, categoryId) {
  const { ProductCategory } = models;

  await ProductCategory.create({
    productUuid,
    categoryId,
  });
}
