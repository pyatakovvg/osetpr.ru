
import { models } from '@sys.packages/db';

import userBuilder from "./userBuilder.mjs";


export default () => async (ctx) => {
  const where = {};
  const { uuid, roleCode } = ctx['request']['query'];

  if (uuid) {
    where['uuid'] = uuid;
  }

  if (roleCode) {
    where['roleCode'] = roleCode;
  }

  const { User, Role } = models;

  const result = await User.findAll({
    where,
    attributes: ['uuid', 'login', 'createdAt', 'updatedAt'],
    include: [
      {
        model: Role,
        attributes: ['code', 'displayName'],
        as: 'role',
      }
    ],
  });

  ctx.body = {
    success: true,
    data: result.map((item) => userBuilder(item.toJSON())),
  };
};
