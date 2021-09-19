
// import { sendEvent } from '@sys.packages/rabbit';
import { sequelize, models } from '@sys.packages/db';


export default () => async (ctx) => {
  const { id } = ctx['request']['body'];
  const { Client, Address, Meta } = models;

  const transaction = await sequelize.transaction();

  await Address.destroy({
    where: { clientId: id },
    transaction,
  });

  await Meta.destroy({
    where: { clientId: id },
    transaction,
  });

  await Client.destroy({
    where: { id },
    transaction,
  });

  await transaction.commit();

  ctx.body = {
    success: true,
    data: id,
  };
};
