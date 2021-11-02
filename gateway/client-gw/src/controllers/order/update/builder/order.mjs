
export default function(data) {
  return {
    uuid: data['uuid'],
    total: data['total'],
    currency: data['currency'],
    address: data['address'],
    products: data['products'].map((product) => ({
      uuid: product['uuid'],
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