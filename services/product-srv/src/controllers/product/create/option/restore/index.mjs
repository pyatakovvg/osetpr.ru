
import { models } from '@sys.packages/db';


export default async function updateProperties(uuid) {
  const { ProductMode } = models;

  await ProductMode.destroy({
    where: {
      productUuid: uuid,
    },
  });
}
