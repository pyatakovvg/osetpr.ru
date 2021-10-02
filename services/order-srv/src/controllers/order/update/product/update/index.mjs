
import { UUID } from "@sys.packages/utils";
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

    await OrderProduct.bulkCreate(products.map((item) => ({
      uuid: UUID(),
      orderUuid: orderUuid,
      productUuid: item['productUuid'],
      title: item['title'],
      vendor: item['vendor'],
      value: item['value'],
      price: item['price'],
      currencyCode: item['currencyCode'] || item['currency']['code'],
      number: Number(item['number']),
    })), {
      transaction,
    });
  }

  await transaction.commit();
};