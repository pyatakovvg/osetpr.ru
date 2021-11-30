
import { models, Op } from "@sys.packages/db";

import { BadRequestError } from "@packages/errors";


export default () => async (ctx) => {
  const { uuid = null } = ctx['request']['body'];

  const { Comment } = models;

  let where = {};

  if (uuid) {
    where[Op.or] = [
      { uuid: uuid },
      { parentUuid: uuid }
    ];
  }
  else {
    throw new BadRequestError({ code: '', message: 'Uuid не указан' });
  }

  await Comment.destroy({
    where: {
      ...where,
    },
  });

  ctx.body = {
    success: true,
    data: null,
  };
};
