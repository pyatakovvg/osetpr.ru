
import { models } from '@sys.packages/db';


export default async function(orderUuid) {
  const { Order, Currency, OrderProduct, OrderAddress, ProductGallery, Status, Payment } = models;

  const result = await Order.findOne({
    where: { uuid: orderUuid },
    order: [
      ['products', 'order', 'asc'],
    ],
    attributes: ['uuid', 'externalId', 'userUuid', 'title', 'description', 'dateTo', 'total', 'currencyCode', 'createdAt', 'updatedAt'],
    include: [
      {
        model: OrderAddress,
        attributes: ['city', 'street', 'house', 'building', 'apartment', 'front', 'floor'],
        as: 'address',
      },
      {
        model: OrderProduct,
        attributes: ['uuid', 'externalId', 'orderUuid', 'productUuid', 'modeUuid', 'title', 'vendor', 'value', 'price', 'total', 'number'],
        as: 'products',
        include: [
          {
            model: ProductGallery,
            attributes: [['imageUuid', 'uuid']],
            as: 'gallery',
          },
          {
            model: Currency,
            attributes: ['code', 'displayName'],
            as: 'currency',
          }
        ],
      },
      {
        model: Status,
        attributes: ['code', 'displayName'],
        as: 'status',
      },
      {
        model: Currency,
        attributes: ['code', 'displayName'],
        as: 'currency',
      },
      {
        model: Payment,
        attributes: ['code', 'displayName'],
        as: 'payment',
      },
    ],
  });

  return result.toJSON();
};
