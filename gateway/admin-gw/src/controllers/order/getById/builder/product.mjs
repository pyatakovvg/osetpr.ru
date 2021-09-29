
export default function(data) {
  return {
    uuid: data['uuid'],
    productUuid: data['productUuid'],
    orderUuid: data['orderUuid'],
    title: data['title'],
    currency: data['currency'],
    number: data['number'],
    price: data['price'],
    value: data['value'],
    vendor: data['vendor'],
  };
}
