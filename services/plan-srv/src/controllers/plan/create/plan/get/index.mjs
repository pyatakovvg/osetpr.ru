
import { models } from '@sys.packages/db';


export default async function(planUuid) {
  const { Plan, PlanProduct, Product, Currency } = models;

  const result = await Plan.findOne({
    where: { uuid: planUuid },
    attributes: ['uuid', 'name', 'createdAt', 'updatedAt'],
    include: [
      {
        model: PlanProduct,
        as: 'products',
        include: [
          {
            model: Product,
            as: 'mode',
            include: [
              {
                model: Currency,
                attributes: ['code', 'value'],
                as: 'currency',
              }
            ],
          }
        ],
      }
    ],
  });

  return result.toJSON();
};
