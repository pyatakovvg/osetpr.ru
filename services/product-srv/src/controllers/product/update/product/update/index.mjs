
import { models } from '@sys.packages/db';


export default async function updateProperties(uuid, properties) {
  const { Product } = models;

  const product = {};

  if ('title' in properties) {
    product['title'] = properties['title'];
  }

  if ('description' in properties) {
    product['description'] = properties['description'];
  }

  if ('categoryId' in properties) {
    product['categoryId'] = properties['categoryId'];
  }

  if ('isUse' in properties) {
    product['isUse'] = properties['isUse'];
  }

  const result = await Product.update(product, {
    where: {
      uuid,
      updatedAt: properties['updatedAt'],
    },
    returning: true,
  });

  return result;
}
