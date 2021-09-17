
import { models } from '@sys.packages/db';


export default async function restoreOption(productUuid) {
  const { Option } = models;

  await Option.destroy({
    where: {
      productUuid,
    },
  });
}
