
import request from "@sys.packages/request";

import orderBuilder from './builder/order.mjs';


export default () => async (ctx) => {
  const data = ctx['request']['body'];

  let result;

  if (data['uuid']) {

    result = await request({
      url: process.env['ORDER_API_SRV'] + '/orders/' + data['uuid'],
      method: 'put',
      data: {
        userUuid: data['userUuid'],
        title: data['title'],
        uuid: data['uuid'],
        dateTo: data['dateTo'],
        description: data['description'],
        statusCode: data['statusCode'] || 'basket',
        address: data['address'],
        products: data['products'].map((item, index) => ({
          productUuid: item['productUuid'],
          externalId: item['externalId'],
          modeUuid: item['modeUuid'],
          imageUuid: item['imageUuid'] || null,
          title: item['title'],
          vendor: item['vendor'],
          value: item['value'],
          price: item['price'],
          total: Number(item['price']) * Number(item['number']),
          currencyCode: item['currencyCode'],
          number: Number(item['number']),
          order: index,
        })),
        customer: data['customer'],
        paymentCode: data['paymentCode'],
      },
    });
  } else {

    result = await request({
      url: process.env['ORDER_API_SRV'] + '/orders',
      method: 'post',
      data: {
        userUuid: data['userUuid'],
        title: data['title'],
        dateTo: data['dateTo'],
        description: data['description'],
        statusCode: 'basket',
        address: data['address'],
        products: data['products'].map((item, index) => ({
          productUuid: item['productUuid'],
          externalId: item['externalId'],
          modeUuid: item['modeUuid'],
          imageUuid: item['imageUuid'] || null,
          title: item['title'],
          vendor: item['vendor'],
          value: item['value'],
          price: item['price'],
          total: Number(item['price']) * Number(item['number']),
          currencyCode: item['currencyCode'],
          number: Number(item['number']),
          order: index,
        })),
        customer: data['customer'],
        paymentCode: data['paymentCode'],
      },
    });
  }

  ctx.body = {
    success: true,
    data: orderBuilder(result['data']),
  };
}
