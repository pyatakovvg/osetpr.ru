
import { UUID } from '@sys.packages/utils';
import { models, sequelize } from '@sys.packages/db';


export default () => async (ctx) => {
  const data = ctx['request']['body'];
  const { Customer, Legal, Individual } = models;

  const transaction = await sequelize.transaction();

  const customer = await Customer.create({
    uuid: UUID(),
    userUuid: data['userUuid'],
    type: data['type'],
  }, {
    transaction,
  });

  if (data['type'] === 'legal') {
    await Legal.create({
      customerUuid: customer['uuid'],
      ...data,
    }, {
      transaction,
    });
  }
  else if (data['type'] === 'individual') {
    await Legal.create({
      customerUuid: customer['uuid'],
      ...data,
    }, {
      transaction,
    });
  }

  await transaction.commit();

  const result = await Customer.findOne({
    where: { uuid: customer['uuid'] },
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
        attributes: ['name', 'surname', 'patronymic', 'gender', 'age', 'birthday'],

      },
    ]
  });

  ctx.body = {
    success: true,
    data: result.toJSON(),
  };
};
