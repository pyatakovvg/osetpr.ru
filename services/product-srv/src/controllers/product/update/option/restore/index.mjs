
import { sequelize, models } from '@sys.packages/db';


export default async function updateProperties(uuid, options) {
  const { ProductMode } = models;

  const transaction = await sequelize.transaction();

  await ProductMode.destroy({
    where: {
      productUuid: uuid,
    },
    transaction,
  });

  if (options && !! options.length) {

    await ProductMode.bulkCreate(options.map((option, index) => ({
      uuid: option['uuid'],
      value: option['value'],
      vendor: option['vendor'],
      price: option['price'],
      currencyCode: option['currencyCode'],
      productUuid: uuid,
      order: index,
      isUse: option['isUse'],
      isTarget: option['isTarget'],
    })));
  }

  await transaction.commit();
}
