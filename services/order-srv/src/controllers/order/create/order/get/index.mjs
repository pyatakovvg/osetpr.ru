
import { models } from '@sys.packages/db';


export default async function(orderUuid) {
  const { Order, Currency, OrderProduct, Status } = models;

  const result = await Order.findOne({
    where: { uuid: orderUuid },
    order: [
      ['products', 'order', 'asc'],
    ],
    attributes: ['uuid', 'userUuid', 'title', 'description', 'dateTo', 'address', 'total', 'currencyCode', 'createdAt', 'updatedAt'],
    include: [
      {
        model: OrderProduct,
        attributes: ['uuid', 'orderUuid', 'productUuid', 'title', 'vendor', 'value', 'price', 'total', 'number', 'createdAt', 'updatedAt'],
        as: 'products',
        include: [
          {
            model: Currency,
            attributes: ['code', 'value'],
            as: 'currency',
          }
        ],
      },
      {
        model: Status,
        required: true,
        as: 'status',
      },
    ],
  });

  return result.toJSON();
};
