
import { sequelize, models } from '@sys.packages/db';


export default async function updateProperties(uuid, options) {
  const { Option } = models;

  const transaction = await sequelize.transaction();

  const result = await Option.findAll({
    where: {
      productUuid: uuid,
    },
    transaction,
  });

  await Option.destroy({
    where: {
      productUuid: uuid,
    },
    transaction,
  });

  if (options && !! options.length) {
      await Option.bulkCreate(options.map((option, index) => ({
        value: option['value'],
        vendor: option['vendor'],
        productUuid: uuid,
        price: option['price'],
        currencyCode: option['currencyCode'],
        order: index,
        isUse: option['isUse'],
        isTarget: option['isTarget'],
      })), {
        transaction,
      });
  }

  await transaction.commit();

  return result.map((row) => row.toJSON());
}
