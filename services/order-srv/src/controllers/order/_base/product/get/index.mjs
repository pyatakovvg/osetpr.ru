
import { models } from "@sys.packages/db";


export default async function(orderUuid) {
  const { OrderProduct } = models;

  const result = await OrderProduct.findAll({
    where: {
      orderUuid,
    },
    order: [
      ['order', 'asc'],
    ],
    attributes: ['total', 'currencyCode'],
  });

  return result.map((item) => item.toJSON());
};