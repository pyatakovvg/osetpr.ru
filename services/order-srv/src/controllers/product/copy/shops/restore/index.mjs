
import { models } from '@sys.packages/db';


export default async function restoreQuantity(productUuid) {
  const { Quantity } = models;

  await Quantity.destroy({
    where: {
      productUuid,
    },
  });
}
