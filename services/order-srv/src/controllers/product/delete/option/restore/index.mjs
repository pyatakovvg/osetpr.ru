
import { models } from '@sys.packages/db';


export default async function restoreOption(data) {
  const { Option } = models;

  const optionsBulk = data.map((option) => ({
    productUuid: option['productUuid'],
    vendor: option['vendor'],
    value: option['value'],
    price: option['price'],
    currencyCode: option['currencyCode'],
    isUse: option['isUse'],
    isTarget: option['isTarget'],
    order: option['order'],
    createAt: option['createAt'],
    updateAt: option['updateAt'],
  }));

  await Option.bulkCreate(optionsBulk);
}
