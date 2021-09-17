
import { models } from '@sys.packages/db';


export default async function restoreCategory(data) {
  const { ProductCategory } = models;

  await ProductCategory.create({
    productUuid: data['productUuid'],
    categoryId: data['categoryId'],
  });
}
