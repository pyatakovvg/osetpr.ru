
import { models, sequelize } from '@sys.packages/db';


export default async function destroyProduct(uuid) {
  const { Product } = models;

  const transaction = await sequelize.transaction();

  const result = await Product.findOne({
    where: {
      uuid,
    },
    transaction,
  });

  await Product.destroy({
    where: {
      uuid,
    },
    transaction,
  });

  await transaction.commit();

  return result.toJSON();
}
