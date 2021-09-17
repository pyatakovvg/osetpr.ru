
import { models } from '@sys.packages/db';


export default async function restoreProduct(data) {
  const { Product } = models;

  await Product.create({
    uuid: data['uuid'],
    externalId: data['externalId'],
    name: data['name'],
    description: data['description'],
    isUse: data['isUse'],
    createdAt: data['createdAt'],
    updatedAt: data['updatedAt'],
  });
}
