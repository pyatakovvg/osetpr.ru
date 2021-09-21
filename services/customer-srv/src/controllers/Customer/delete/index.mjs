
// import { sendEvent } from '@sys.packages/rabbit';
import { sequelize, models } from '@sys.packages/db';


export default () => async (ctx) => {
  const { uuid } = ctx['request']['body'];
  const { Customer, Legal, Individual } = models;

  const transaction = await sequelize.transaction();

  await Customer.destroy({
    where: { uuid },
    transaction,
  });

  await Legal.destroy({
    where: {
      customerUuid: uuid,
    },
    transaction,
  });

  await Individual.destroy({
    where: {
      customerUuid: uuid,
    },
    transaction,
  });

  await transaction.commit();

  ctx.body = {
    success: true,
    data: uuid,
  };
};
