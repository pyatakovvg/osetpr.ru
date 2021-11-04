
import {models, sequelize} from '@sys.packages/db';


export default () => async (ctx) => {
  const { uuid } = ctx['params'];
  const data = ctx['request']['body'];
  const { Customer, Legal, Individual } = models;

  const transaction = await sequelize.transaction();

  if (data['type'] === 'individual') {
    await Individual.update({
      ...data,
    }, {
      where: {
        customerUuid: uuid,
      },
      transaction,
    });
  }

  if (data['type'] === 'legal') {
    await Legal.update({
      ...data,
    }, {
      where: {
        customerUuid: uuid,
      },
      transaction,
    });
  }

  await transaction.commit();

  const result = await Customer.findOne({
    where: { uuid },
    attributes: ['uuid', 'type', 'createdAt', 'updatedAt'],
    include: [
      {
        model: Legal,
        required: false,
        as: 'legal',
        attributes: ['name', 'address', 'phone'],
      },
      {
        model: Individual,
        required: false,
        as: 'individual',
        attributes: ['name', 'surname', 'patronymic', 'gender', 'age', 'birthday', 'phone'],
      },
    ]
  });

  ctx.body = {
    success: true,
    data: result.toJSON(),
  };
};
