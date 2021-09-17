
import { models } from '@sys.packages/db';


export default async function updateProperties(productUuid) {
  const { ProductType } = models;

  await ProductType.destroy({
    where: {
      productUuid,
    }
  });
}
