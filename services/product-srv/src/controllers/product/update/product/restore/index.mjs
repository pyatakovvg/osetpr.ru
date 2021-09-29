
import { models } from '@sys.packages/db';


export default async function updateProperties(uuid, properties) {
  const { Product } = models;

  const product = {};

  if ('title' in properties) {
    product['name'] = properties['name'];
  }

  if ('description' in properties) {
    product['description'] = properties['description'];
  }

  if ('categoryId' in properties) {
    product['categoryId'] = properties['categoryId'];
  }

  if ('updatedAt' in properties) {
    product['updatedAt'] = properties['updatedAt'];
  }

  await Product.update(product, {
    where: { uuid },
  });
}
