
import { models } from '@sys.packages/db';


export default async function restoreBrand(productUuid) {
  const { Quantity } = models;

  await Quantity.destroy({
    where: {
      productUuid,
    },
  });
}
