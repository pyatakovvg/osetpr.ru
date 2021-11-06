
import { models } from "@sys.packages/db";


export default async function(orderUuid, products) {
  const { OrderProduct } = models;

  if (products && !! products.length) {

    await OrderProduct.bulkCreate(products.map((item, index) => ({
      orderUuid: orderUuid,
      productUuid: item['productUuid'],
      externalId: item['externalId'],
      modeUuid: item['modeUuid'],
      title: item['title'],
      vendor: item['vendor'],
      value: item['value'],
      price: item['price'],
      total: Number(item['price']) * Number(item['number']),
      currencyCode: item['currencyCode'],
      number: Number(item['number']),
      order: index,
    })));
  }
};