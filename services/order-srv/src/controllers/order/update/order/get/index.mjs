
import { models } from '@sys.packages/db';


export default async function(orderUuid) {
  const { Order, Currency, OrderProduct, Status } = models;

  const result = await Order.findOne({
    where: { uuid: orderUuid },
    order: [
      ['createdAt', 'desc'],
      ['products', 'createdAt', 'desc'],
    ],
    attributes: ['uuid', 'userUuid', 'title', 'description', 'dateTo', 'address', 'createdAt', 'updatedAt'],
    include: [
      {
        model: OrderProduct,
        as: 'products',
        attributes: ['uuid', 'orderUuid', 'productUuid', 'title', 'vendor', 'value', 'price', 'number', 'createdAt', 'updatedAt'],
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
