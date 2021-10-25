
export default function(data, products = []) {
  const planProduct = products.find((item) => item['uuid'] === data['uuid']);
  return {
    isUse: data['isUse'],
    isTarget: data['isTarget'],
    uuid: data['uuid'],
    vendor: data['vendor'],
    value: data['value'],
    price: planProduct ? (Number(data['price']) - (Number(data['price']) * Number(planProduct['percent']) / 100)) : Number(data['price']),
    currency: data['currency'],
  };
}
