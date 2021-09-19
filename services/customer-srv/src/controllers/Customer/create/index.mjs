
import { models, sequelize } from '@sys.packages/db';

export default () => async (ctx) => {
  const data = ctx['request']['body'];
  const { Client, Meta } = models;

  const transaction = await sequelize.transaction();

  const { id } = await Client.create({
    name: data['name'],
    patronymic: data['patronymic'],
    surname: data['surname'],
    email: data['email'],
    phone: data['phone'],
    isSystem: false,
  }, {
    transaction,
  });

  await Meta.create({
    clientId: id,
    phone: data['phone'],
    email: data['email'],
    address: data['address'],
  }, {
    transaction,
  });

  await transaction.commit();

  const result = await Client.findOne({
    where: { id },
    distinct: true,
    order: [['id', 'desc']],
    attributes: ['id', 'name', 'patronymic', 'surname', 'gender', 'age', 'birthday'],
    include: [
      {
        model: Meta,
        required: true,
        as: 'meta',
        attributes: ['email', 'phone', 'address']
      },
    ]
  });

  ctx.body = {
    success: true,
    data: result.toJSON(),
  };
};
