
import { sequelize, models } from "@sys.packages/db";


export default async function(orderUuid, products) {
  const { OrderProduct } = models;

  const transaction = await sequelize.transaction();

  await OrderProduct.destroy({
    where: {
      orderUuid,
    },
    transaction,
  });

  if (products && !! products.length) {

    await OrderProduct.bulkCreate(products.map((item, index) => ({
      orderUuid: orderUuid,
      externalId: item['externalId'],
      productUuid: item['productUuid'],
      modeUuid: item['modeUuid'],
      title: item['title'],
      vendor: item['vendor'],
      value: item['value'],
      price: item['price'],
      total: Number(item['price']) * Number(item['number']),
      currencyCode: item['currencyCode'] || item['currency']['code'],
      number: Number(item['number']),
      order: index,
    })), {
      transaction,
    });
  }

  await transaction.commit();
};