
import { models } from '@sys.packages/db';


export default async function restoreProduct(uuid) {
  const { Product } = models;

  await Product.destroy({
    where: {
      uuid,
    },
  });
}
