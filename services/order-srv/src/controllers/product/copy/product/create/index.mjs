
import { models } from '@sys.packages/db';


export default async function updateProperties(data) {
  const { Product } = models;

  await Product.create({
    uuid: data['uuid'],
    externalId: data['externalId'],
    name: data['name'],
    description: data['description'],
    isUse: data['isUse'],
  });
}
