
import { models } from "@sys.packages/db";


export default async function(planUuid, data) {
  const { Plan } = models;

  await Plan.update({
    name: data['name'],
  }, {
    where: {
      uuid: planUuid,
    },
  });
};