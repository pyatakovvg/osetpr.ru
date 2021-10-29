
export default function(data) {
  return {
    uuid: data['uuid'],
    total: data['total'],
    currency: data['currency'],
    products: data['products'].map((product) => ({
      productUuid: product['productUuid'],
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