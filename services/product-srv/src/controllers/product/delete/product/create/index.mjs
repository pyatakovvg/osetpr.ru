
import { models } from '@sys.packages/db';


export default async function createProduct(data) {
  const { Product } = models;

  await Product.create({
    uuid: data['uuid'],
    externalId: data['externalId'],
    title: data['title'],
    description: data['description'],
    isUse: data['isUse'],
    categoryId: data['category']['id'],
  });
}
