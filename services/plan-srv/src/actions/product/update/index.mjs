
import { models, sequelize } from '@sys.packages/db';


export default async function(modes) {
  const { Product } = models;

  const transaction = await sequelize.transaction();

  await Product.destroy({
    where: {
      uuid: modes.map((mode) => mode['uuid']),
    },
    transaction,
  });

  await Product.bulkCreate(modes, {
    transaction,
  });

  await transaction.commit();
}
