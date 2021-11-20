
import { models } from "@sys.packages/db";


export default async function(orderUuid) {
  const { OrderAddress } = models;

  await OrderAddress.destroy({
    where: {
      orderUuid,
    }
  });
};