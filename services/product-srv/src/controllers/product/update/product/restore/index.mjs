
import { models } from '@sys.packages/db';


export default async function updateProperties(uuid, properties) {
  const { Product } = models;
console.log(properties)
  const product = {};

  if ('title' in properties) {
    product['name'] = properties['name'];
  }

  if ('description' in properties) {
    product['description'] = properties['description'];
  }

  if ('category' in properties) {
    product['categoryUuid'] = properties['category'] ? properties['category']['uuid'] : null;
  }

  if ('updatedAt' in properties) {
    product['updatedAt'] = properties['updatedAt'];
  }

  await Product.update(product, {
    where: { uuid },
  });
}
