
import { models } from '@sys.packages/db';


export default async function restoreType(data) {
  const { ProductType } = models;

  await ProductType.create({
    productUuid: data['productUuid'],
    typeId: data['typeId'],
  });
}
