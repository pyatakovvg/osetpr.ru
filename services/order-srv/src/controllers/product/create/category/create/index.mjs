
import { models } from '@sys.packages/db';


export default async function updateProperties(uuid, categoryId) {
  const { ProductCategory } = models;

  await ProductCategory.create({
    productUuid: uuid,
    categoryId,
  });
}
