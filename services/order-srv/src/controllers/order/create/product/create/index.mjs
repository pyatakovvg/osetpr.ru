
import { models } from "@sys.packages/db";
import { UUID } from "@sys.packages/utils";


export default async function(orderUuid, products) {
  const { OrderProduct } = models;

  if (products && !! products.length) {

    await OrderProduct.bulkCreate(products.map((item) => ({
      uuid: UUID(),
      orderUuid: orderUuid,
      productUuid: item['productUuid'],
      title: item['title'],
      vendor: item['vendor'],
      value: item['value'],
      price: item['price'],
      currencyCode: item['currencyCode'],
      number: Number(item['number']),
    })));
  }
};