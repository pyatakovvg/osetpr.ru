
import { models, sequelize } from '@sys.packages/db';


export default async function destroyOption(productUuid) {
  const { Option } = models;

  const transaction = await sequelize.transaction();

  const result = await Option.findAll({
    where: {
      productUuid,
    },
    transaction,
  });

  await Option.destroy({
    where: {
      productUuid,
    },
    transaction,
  });

  await transaction.commit();

  return result.map((option) => option.toJSON());
}
