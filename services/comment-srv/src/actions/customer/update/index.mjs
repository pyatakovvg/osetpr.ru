
import logger from "@sys.packages/logger";
import { models, sequelize } from '@sys.packages/db';


export default async function update(data) {
  const { Customer } = models;
  const transaction = await sequelize.transaction();

  const result = await Customer.findOne({
    where: {
      uuid: data['userUuid'],
    },
    transaction,
  });

  const customer = result.toJSON();

  logger.info('Найден пользователь: ' + JSON.stringify(customer));

  if (customer) {

    logger.info('Данные на обновление: ' + JSON.stringify(data));

    await Customer.update({
      uuid: data['userUuid'],
      customerUuid: data['uuid'],
      type: data['type'],
      name: data['name'],
      phone: data['phone'],
      email: data['email'],
    }, {
      where: {
        uuid: data['userUuid'],
      },
      transaction,
    });
  }
  else {

    await Customer.create({
      uuid: data['userUuid'],
      customerUuid: data['uuid'],
      type: data['type'],
      name: data['name'],
      phone: data['phone'],
      email: data['email'],
    }, {
      transaction,
    });
  }

  await transaction.commit();
}
