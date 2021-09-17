
import { sequelize, models } from '@sys.packages/db';


export default async function createOption(productUuid, options) {
  const { Option } = models;

  if (options && !! options.length) {

    const optionBalk = options.map((option, index) => ({
      value: option['value'],
      vendor: option['vendor'],
      productUuid,
      price: option['price'],
      currencyCode: option['currencyCode'],
      order: index,
      isUse: option['isUse'],
      isTarget: option['isTarget'],
    }));

    await Option.bulkCreate(optionBalk);
  }
}
