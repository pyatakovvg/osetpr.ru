
import { models } from "@sys.packages/db";


export default async function(orderUuid, data) {
  const { Order } = models;

  await Order.update(data, {
    where: { uuid: orderUuid },
  });
};