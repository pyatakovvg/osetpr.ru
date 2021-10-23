
import { models, sequelize } from '@sys.packages/db';


export default () => async (ctx) => {
  const { PlanUser } = models;
  const { uuid } = ctx['params'];
  const data = ctx['request']['body'];

  const transaction = await sequelize.transaction();

  PlanUser.destroy({
    where: {
      userUuid: uuid,
    },
    transaction,
  });

  await PlanUser.bulkUpdate(data.map((item) => ({
    userUuid: uuid,
    planUuid: item['planUuid'],
    createdAt: item['createdAt'],
  })), {
    transaction,
  });

  await transaction.commit();

  ctx.body = {
    success: true,
    data: null,
  };
}
