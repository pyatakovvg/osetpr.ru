
import { models } from '@sys.packages/db';


export default async function removeProperties(productUuid) {
  const { ProductMode } = models;

  await ProductMode.destroy({
    where: {
      productUuid,
    },
  });
}
