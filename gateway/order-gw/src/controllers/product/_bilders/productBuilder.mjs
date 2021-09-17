
export default function productBuilder(data) {
  return {
    uuid: data['uuid'],
    externalId: data['externalId'],
    name: data['name'],
    shops: data['shops'],
    type: !! data['type'].length
      ? ({
        id: data['type'][0]['id'],
        name: data['type'][0]['value'],
      })
      : null,
    brand: !! data['brand'].length
      ? ({
        id: data['brand'][0]['id'],
        name: data['brand'][0]['value'],
      })
      : null,
    category: !! data['category'].length
      ? ({
        id: data['category'][0]['id'],
        name: data['category'][0]['value'],
      })
      : null,
    description: data['description'],
    gallery: data['gallery'],
    comments: data['comments'],
    isUse: data['isUse'],
    updatedAt: data['updatedAt'],
    options: data['options'].map((option) => ({
      id: option['id'],
      value: option['value'],
      vendor: option['vendor'],
      price: option['price'],
      currencyCode: option['currency']['code'],
      isUse: option['isUse'],
      isTarget: option['isTarget'],
    })),
    characteristics: data['characteristics'].map((characteristic) => ({
      ...characteristic,
      attributes: characteristic['attributes'].map((item) => ({
        id: item['attribute'] ? item['attribute']['id'] : null,
        isUse: item['isUse'],
        name: item['attribute'] ? item['attribute']['value'] : null,
        value: item['value'],
        unit: item['attribute'] ? (item['attribute']['unit'] ? item['attribute']['unit']['value'] : null) : null,
      })),
    })),
  };
}
