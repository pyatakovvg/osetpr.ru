
import { models } from "@sys.packages/db";


export default async function(planUuid) {
  const { PlanProduct } = models;

  const result = await PlanProduct.findAll({
    where: {
      planUuid,
    },
  });

  return result.map((item) => item.toJSON());
};