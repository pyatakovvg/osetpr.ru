
import { models, sequelize } from '@sys.packages/db';
// import { sendEvent } from '@sys.packages/rabbit';


export default () => async (ctx) => {
  const { Group } = models;

  const data = ctx['request']['body'];

  const transaction = await sequelize.transaction();

  await Group.destroy({
    where: {
      uuid: data['bulk'].map(i => i['uuid']),
    },
    transaction,
  });

  await Group.bulkCreate(data['bulk'], {
    transaction,
  });

  await transaction.commit();

  const result = await Group.findAll({
    order: [
      ['order', 'asc']
    ],
    attributes: ['uuid', 'value', 'order'],
  });

  console.log(result)

  // await sendEvent(process.env['EX'], JSON.stringify(result.map(i => i.toJSON())));

  ctx.body = {
    success: true,
    data: result.map(i => i.toJSON()),
  };
};
