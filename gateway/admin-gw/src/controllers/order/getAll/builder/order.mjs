
import moment from "@packages/moment";

import customerBuilder from './customer.mjs';


export default function(data) {
  return {
    uuid: data['uuid'],
    externalId: data['externalId'].toUpperCase().replace(/(\w{3})(\w{3})(\w{3})/, '$1-$2-$3'),
    title: data['title'],
    status: data['status'],
    dateTo: data['dateTo'] ? moment(data['dateTo']).tz('Europe/Moscow').format('YYYY-MM-DD HH:mm:ss.SSSSSSZ') : null,
    total: data['total'],
    currency: data['currency'],
    address: data['address'],
    payment: data['payment'],
    customer: data['customer']
      ? customerBuilder(data['customer'])
      : null,
    products: data['products'].map((product) => ({
      uuid: product['uuid'],
      externalId: product['externalId'],
      productUuid: product['productUuid'],
      modeUuid: product['modeUuid'],
      gallery: product['gallery'],
      vendor: product['vendor'],
      number: Number(product['number']),
      title: product['title'],
      value: product['value'],
      price: product['price'],
      total: product['total'],
      currency: product['currency'],
    })),
  };
}