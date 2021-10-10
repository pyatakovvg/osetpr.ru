
import { models } from "@sys.packages/db";
import { UUID } from '@sys.packages/utils';


export default async function(data) {
  const { Plan } = models;
  const uuid = UUID();

  await Plan.create({
    uuid,
    name: data['name'],
  });

  return uuid;
};