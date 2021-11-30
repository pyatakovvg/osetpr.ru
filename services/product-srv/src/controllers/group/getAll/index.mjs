
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  const { Group } = models;

  let where = {};

  const { uuid = null } = ctx['request']['query'];

  if (uuid) {
    where['uuid'] = uuid;
  }

  const result = await Group.findAll({
    order: [
      ['order', 'asc']
    ],
    attributes: ['uuid', 'value', 'order'],
    where: { ...where },
  });

  ctx.body = {
    success: true,
    data: result.map((group) => group.toJSON()),
  };
};
