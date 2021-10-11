
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  const { PlanUser, Plan } = models;

  const result = await Plan.findAll({
    include: [
      {
        model: PlanUser,
        attributes: [],
        where: {
          userUuid: '56edc7f3-3603-4dc1-86c8-d82f2952c659',
        },
        as: 'users',
      }
    ],
  });

  console.log(result);

  ctx.body = {
    success: true,
    data: result.map((item) => item.toJSON()),
  };
}
