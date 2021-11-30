
import { models, sequelize } from '@sys.packages/db';
// import { sendEvent } from '@sys.packages/rabbit';


export default () => async (ctx) => {
  const { Category } = models;

  const data = ctx['request']['body'];

  const transaction = await sequelize.transaction();

  await Category.destroy({
    where: {
      uuid: data['bulk'].map(i => i['uuid']),
    },
    transaction,
  });

  await Category.bulkCreate(data['bulk'], {
    transaction,
  });

  await transaction.commit();

  const result = await Category.findAll({
    attributes: ['uuid', 'value', 'order'],
  });

  // await sendEvent(process.env['EXCHANGE_C'], JSON.stringify(result.map(i => i.toJSON())));

  ctx.body = {
    success: true,
    data: result.map(i => i.toJSON()),
  };
};
