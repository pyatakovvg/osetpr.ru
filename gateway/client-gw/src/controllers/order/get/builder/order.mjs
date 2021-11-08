
import customerBuilder from './customer.mjs';


export default function(data) {
  return {
    externalId: data['externalId'],
    status: data['status'],
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