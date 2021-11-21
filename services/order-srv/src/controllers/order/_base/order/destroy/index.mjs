
import { models } from "@sys.packages/db";


export default async function(orderUuid) {
  const { Order } = models;

  await Order.destroy({
    where: {
      uuid: orderUuid,
    },
  });
};