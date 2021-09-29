
import { models } from '@sys.packages/db';


export default async function createProduct(properties) {
  const { Product } = models;

  const { uuid } = await Product.create(properties);

  return uuid;
}
