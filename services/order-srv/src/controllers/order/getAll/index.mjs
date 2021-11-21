
import { models } from '@sys.packages/db';
import request from '@sys.packages/request';


export default () => async (ctx) => {
  let where = {};
  let offset = {};
  let options = {};

  const { Order, OrderProduct, OrderAddress, Status, Currency, Payment, Customer } = models;

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
    where: {
      ...where,
    },
    order: [
      ['createdAt', 'desc'],
      ['status', 'order', 'asc'],
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
        attributes: ['uuid', 'externalId', 'orderUuid', 'productUuid', 'modeUuid', 'imageUuid', 'title', 'vendor', 'value', 'price', 'total', 'number'],
        as: 'products',
        include: [
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
      {
        model: Customer,
        attributes: ['uuid', 'name', 'phone', 'email'],
        as: 'customer',
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
