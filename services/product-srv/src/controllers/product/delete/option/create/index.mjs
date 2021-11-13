
import { models } from '@sys.packages/db';


export default async function createMode(productUuid, options) {
  const { ProductMode } = models;

  if (options && !! options.length) {

      await ProductMode.bulkCreate(options.map((option, index) => ({
        productUuid,
        uuid: option['uuid'],
        value: option['value'],
        vendor: option['vendor'],
        price: option['price'],
        currencyCode: option['currency']['code'],
        order: index,
        isUse: option['isUse'],
        isTarget: option['isTarget'],
      })));
  }
}
