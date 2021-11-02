
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  let where = {};
  let offset = {};
  let options = {};

  const { Order, OrderProduct, OrderAddress, ProductGallery, Status, Currency, Payment } = models;

  const {
    limit = null,
    skip = null,
    take = null,
    uuid = null,
    userUuid = null,
    isUse = null,
    status = null,
  } = ctx['request']['query'];

  if (uuid) {
    where['uuid'] = uuid;
  }

  if (status) {
    where['statusCode'] = status;
  }

  if (userUuid) {
    where['userUuid'] = userUuid;
  }

  if (isUse !== null) {
    where['isUse'] = isUse;
  }

  if (limit) {
    options['limit'] = Number(limit);
  }

  if (skip && take) {
    offset['offset'] = Number(skip);
    offset['limit'] = Number(take);
  }

  const result = await Order.findAndCountAll({
    ...options,
    ...offset,
    distinct: true,
    where: { ...where },
    order: [
      ['createdAt', 'desc'],
      ['products', 'order', 'asc'],
    ],
    attributes: ['uuid', 'userUuid', 'title', 'description', 'dateTo', 'total', 'createdAt', 'updatedAt'],
    include: [
      {
        model: OrderAddress,
        required: false,
        attributes: ['city', 'street', 'house', 'building', 'apartment', 'front', 'floor'],
        as: 'address',
      },
      {
        model: OrderProduct,
        attributes: ['uuid', 'orderUuid', 'productUuid', 'modeUuid', 'title', 'vendor', 'value', 'price', 'total', 'number', 'createdAt', 'updatedAt'],
        as: 'products',
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
      {
        model: Payment,
        attributes: ['code', 'displayName'],
        as: 'payment',
      },
    ],
  });

  ctx.body = {
    success: true,
    data: result['rows'].map((item) => item.toJSON()),
    meta: {
      totalRows: result['count'],
    },
  };
};
