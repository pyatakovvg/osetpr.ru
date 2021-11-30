
import { models, sequelize, Op } from '@sys.packages/db';


export default () => async (ctx) => {
  const { Group } = models;

  const data = ctx['request']['body'];

  const transaction = await sequelize.transaction();

  await Group.destroy({
    where: {
      [Op.not]: {
        uuid: null,
      },
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

  ctx.body = {
    success: true,
    data: result.map(i => i.toJSON()),
  };
};
