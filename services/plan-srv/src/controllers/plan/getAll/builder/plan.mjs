
export default function(data) {
  return {
    uuid: data['uuid'],
    name: data['name'],
    users: data['users'].map((item) => item['userUuid']),
    products: data['products'].map((item) => ({
      uuid: item['mode']['uuid'],
      productUuid: item['mode']['productUuid'],
      title: item['mode']['title'],
      vendor: item['mode']['vendor'],
      value: item['mode']['value'],
      price: Number(item['mode']['price']),
      currency: item['mode']['currency'],
      percent: item['percent'],
    })),
    createdAt: data['createdAt'],
    updatedAt: data['updatedAt'],
  };
}
