
import { models } from '@sys.packages/db';


export default async function restoreType(productUuid) {
  const { ProductType } = models;

  await ProductType.destroy({
    where: {
      productUuid,
    },
  });
}
