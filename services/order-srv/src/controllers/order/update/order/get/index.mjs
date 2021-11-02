
import { models } from '@sys.packages/db';


export default async function(orderUuid) {
  const { Order, Currency, OrderProduct, OrderAddress, ProductGallery, Status } = models;

  if (orderUuid === 'null') {
    return null;
  }

  const result = await Order.findOne({
    where: { uuid: orderUuid },
    order: [
      ['products', 'order', 'asc'],
    ],
    attributes: ['uuid', 'userUuid', 'title', 'description', 'dateTo', 'total', 'currencyCode', 'createdAt', 'updatedAt'],
    include: [
      {
        model: OrderAddress,
        attributes: ['city', 'street', 'house', 'building', 'apartment', 'front'],
        as: 'address',
      },
      {
        model: OrderProduct,
        as: 'products',
        attributes: ['uuid', 'orderUuid', 'productUuid', 'modeUuid', 'title', 'vendor', 'value', 'price', 'total', 'number', 'createdAt', 'updatedAt'],
        include: [
          {
            model: ProductGallery,
            attributes: [['imageUuid', 'uuid']],
            as: 'gallery',
          },
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
      {
        model: Currency,
        attributes: ['code', 'value'],
        as: 'currency',
      },
    ],
  });

  return result.toJSON();
};
