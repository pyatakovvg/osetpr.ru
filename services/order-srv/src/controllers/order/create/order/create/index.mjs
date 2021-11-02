
import { models } from "@sys.packages/db";
import { UUID } from "@sys.packages/utils";


export default async function(data) {
  const { Order } = models;

  const result = await Order.create({
    uuid: UUID(),
    statusCode: data['statusCode'] || 'new',
    userUuid: data['userUuid'],
    title: data['title'],
    description: data['description'],
    dateTo: data['dateTo'],
    total: 0,
    currencyCode: 'RUB',
  });

  return result['uuid'];
};