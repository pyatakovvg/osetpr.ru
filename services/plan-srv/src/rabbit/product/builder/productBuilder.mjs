
export default function productBuilder(data) {
  return data['modes'].map((item) => {
    return {
      uuid: item['uuid'],
      productUuid: data['uuid'],
      title: data['title'],
      vendor: item['vendor'],
      value: item['value'],
      price: item['price'],
      currencyCode: item['currency']['code'],
    };
  });
}
