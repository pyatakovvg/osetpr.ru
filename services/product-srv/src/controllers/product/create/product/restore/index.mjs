
import { models } from '@sys.packages/db';


export default async function updateProperties(uuid) {
  const { Product } = models;

  await Product.destroy({
    where: { uuid },
  });
}
