
import { models } from "@sys.packages/db";


export default async function(orderUuid, address) {
  const { OrderAddress } = models;

  await OrderAddress.destroy({
    where: {
      orderUuid,
    }
  });

  if (address) {

    await OrderAddress.create({
      orderUuid,
      ...address,
    });
  }
};