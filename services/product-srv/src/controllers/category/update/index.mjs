
import {models, Op, sequelize} from '@sys.packages/db';


export default () => async (ctx) => {
  const { Category } = models;

  const data = ctx['request']['body'];

  const transaction = await sequelize.transaction();

  await Category.destroy({
    where: {
      [Op.not]: {
        uuid: null,
      },
    },
    transaction,
  });

  await Category.bulkCreate(data['bulk'], {
    transaction,
  });

  await transaction.commit();

  const result = await Category.findAll({
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
