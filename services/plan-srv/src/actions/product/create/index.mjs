
import { models } from '@sys.packages/db';


export default async function(modes) {
  const { Product } = models;

  await Product.bulkCreate(modes);
}
