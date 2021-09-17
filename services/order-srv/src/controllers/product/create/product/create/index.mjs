
import { models } from '@sys.packages/db';


export default async function createProduct(data) {
  const { Product } = models;

  const { uuid } = await Product.create({
    uuid: data['uuid'],
    externalId: data['externalId'],
    name: data['name'],
    description: data['description'],
    isUse: data['isUse'],
  });

  return uuid;
}
