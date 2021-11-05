
import { models } from '@sys.packages/db';
import request from '@sys.packages/request';


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

  const orders = result['rows'].map((item) => item.toJSON());

  const { data: customers } = await request({
    url: process.env['CUSTOMER_API_SRV'] + '/customers',
    method: 'get',
    params: {
      userUuid: orders.map((item) => item['userUuid']),
    },
  });

  const resultOrders = orders.map((order) => {
    const customer = customers.find((customer) => customer['userUuid'] === order['userUuid']);
    if (customer) {
      return { ...order, customer };
    }
    return { ...order, customer: null };
  });

  ctx.body = {
    success: true,
    data: resultOrders,
    meta: {
      totalRows: result['count'],
    },
  };
};
