
import { models } from "@sys.packages/db";


export default async function(orderUuid, data) {
  const { Order } = models;
console.log(data)
  await Order.update(data, {
    where: {
      uuid: orderUuid,
    },
  });
};