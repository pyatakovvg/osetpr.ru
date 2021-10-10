
import { models } from "@sys.packages/db";


export default async function(orderUuid) {
  const { OrderProduct } = models;

  await OrderProduct.destroy({
    where: { orderUuid }
  });
};