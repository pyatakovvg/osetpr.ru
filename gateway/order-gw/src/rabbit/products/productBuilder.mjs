
export default function productBuilder(data) {
  return {
    uuid: data['uuid'],
    brand: data['brand'],
    name: data['name'],
    types: data['types'],
    categories: data['categories'],
    description: data['description'],
    amount: Number(data['amount']),
    saleAmount: Number(data['saleAmount']),
    currency: data['currency'] ? data['currency']['value'] : null,
    status: Number(data['status']),
    gallery: data['gallery'].map((img) => img['uuid']),
    comments: data['comments'],
    updatedAt: data['updatedAt'],
    characteristics: data['characteristics'].map((characteristic) => ({
      ...characteristic,
      attributes: characteristic['attributes'].map((item) => ({
        name: item['value'],
        value: item['attribute']['value'],
        unit: item['unit'] ? item['unit']['value'] : null,
      })),
    })),
  };
}
