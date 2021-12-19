
import logger from "@sys.packages/logger";
import { models, sequelize } from '@sys.packages/db';


export default async function update(data) {
  const { Customer } = models;
  const transaction = await sequelize.transaction();

  logger.info('Поиск пользователя: ' + JSON.stringify(data));

  try {
    const result = await Customer.findOne({
      where: {
        uuid: data['userUuid'],
      },
      transaction,
    });

    const customer = result ? result.toJSON() : null;

    if (customer) {

      logger.info('Найден пользователь: ' + JSON.stringify(customer));
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

      logger.info('Пользователь не найден');
      logger.info('Данные на создание: ' + JSON.stringify(data));

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
  catch (error) {

    await transaction.rollback();

    throw error;
  }
}
