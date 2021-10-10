
import { models } from "@sys.packages/db";


export default async function(planUuid) {
  const { Plan } = models;

  await Plan.destroy({
    where: {
      uuid: planUuid,
    },
  });
};