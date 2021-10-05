
import { models } from "@sys.packages/db";
import { UUID } from "@sys.packages/utils";


export default async function(data) {
  const { Order } = models;

  const result = await Order.create({
    uuid: UUID(),
    statusCode: 'new',
    ...data,
  });

  return result['uuid'];
};