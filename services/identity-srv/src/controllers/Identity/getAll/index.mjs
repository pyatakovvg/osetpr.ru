
import { models } from '@sys.packages/db';

import userBuilder from "./userBuilder.mjs";


export default () => async (ctx) => {
  const where = {};
  const { uuid } = ctx['request']['query'];

  if (uuid) {
    where['uuid'] = uuid;
  }

  const { User, Role } = models;

  const result = await User.findAll({
    where: { ...where },
    attributes: ['uuid', 'login', 'createdAt', 'updatedAt'],
    include: [
      {
        model: Role,
        as: 'role',
        attributes: ['code', 'name'],
        through: { attributes: [] },
      }
    ],
  });

  ctx.body = {
    success: true,
    data: result.map((item) => userBuilder(item.toJSON())),
  };
};
