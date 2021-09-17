
import { models } from '@sys.packages/db';


export default async function updateProperties(uuid) {
  const { ProductCategory } = models;

  await ProductCategory.destroy({ where: { productUuid: uuid }});
}
