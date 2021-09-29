
import { models } from '@sys.packages/db';
import { UUID } from '@sys.packages/utils';


export default async function updateProperties(uuid, options) {
  const { ProductMode } = models;

  if (options && !! options.length) {

      await ProductMode.bulkCreate(options.map((option, index) => ({
        uuid: UUID(),
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
}
