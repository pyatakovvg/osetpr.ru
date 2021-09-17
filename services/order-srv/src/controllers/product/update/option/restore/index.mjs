
import { sequelize, models } from '@sys.packages/db';


export default async function updateProperties(productUuid, options) {
  const { Option } = models;

  const transaction = await sequelize.transaction();

  await Option.destroy({
    where: {
      productUuid,
    },
    transaction,
  });

  if (options && !! options.length) {
    await Option.bulkCreate(options.map((option, index) => ({
      productUuid,
      value: option['value'],
      vendor: option['vendor'],
      price: option['price'],
      currencyCode: option['currencyCode'],
      order: index,
      isUse: option['isUse'],
      isTarget: option['isTarget'],
    })));
  }

  await transaction.commit();
}
