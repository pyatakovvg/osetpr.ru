
import { models } from "@sys.packages/db";


export default async function(data) {
  const { Order } = models;

  const result = await Order.create(data);

  return result['uuid'];
};