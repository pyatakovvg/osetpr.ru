
import { sequelize, models } from '@sys.packages/db';


export default async function updateProperties(uuid) {
  const { Product } = models;

  const transaction = await sequelize.transaction();

  await Product.destroy({
    where: { uuid },
    transaction,
  });

  await transaction.commit();
}
