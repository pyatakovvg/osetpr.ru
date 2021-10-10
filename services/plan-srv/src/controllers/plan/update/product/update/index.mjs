
import { sequelize, models } from "@sys.packages/db";


export default async function(planUuid, products) {
  const { PlanProduct } = models;

  const transaction = await sequelize.transaction();

  await PlanProduct.destroy({
    where: {
      planUuid,
    },
    transaction,
  });

  if (products && !! products.length) {

    await PlanProduct.bulkCreate(products.map((item) => ({
      planUuid,
      modeUuid: item['uuid'],
      percent: item['percent'],
    })), {
      transaction,
    });
  }

  await transaction.commit();
};