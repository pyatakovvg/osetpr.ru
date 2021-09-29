
import productBuilder from './product.mjs';


export default function(data) {
  return {
    uuid: data['uuid'],
    address: data['address'],
    dateTo: data['dateTo'],
    description: data['description'],
    status: data['status'],
    title: data['title'],
    updatedAt: data['updatedAt'],
    userUuid: data['userUuid'],
    products: data['products'].map((item) => productBuilder(item)),
  };
}
