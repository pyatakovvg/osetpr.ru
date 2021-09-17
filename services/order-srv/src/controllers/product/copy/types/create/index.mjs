
import { models } from '@sys.packages/db';


export default async function updateProperties(productUuid, typeId) {
  const { ProductType } = models;

  await ProductType.create({
    productUuid,
    typeId,
  });
}
