
import { models } from "@sys.packages/db";
import { UUID } from "@sys.packages/utils";


export default async function(orderUuid, data) {
  const { Order } = models;
  if (orderUuid === 'null') {
    orderUuid = UUID();

    await Order.create({
      uuid: orderUuid,
      title: 'Клиентский заказ',
      userUuid: data['userUuid'],
      statusCode: 'bucket',
      total: 0,
      dateTo: Date.now(),
      currencyCode: 'RUB',
    });
  }
  else {
    await Order.update(data, {
      where: {
        uuid: orderUuid,
      },
    });
  }
};