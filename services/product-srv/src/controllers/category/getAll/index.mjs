
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  let where = {};
  let offset = {};
  let options = {};

  const { Category } = models;

  const {
    limit = null,
    skip = null,
    take = null,
    uuid = null,
    externalId = null,
    isUse = null,
  } = ctx['request']['query'];

  if (uuid) {
    where['uuid'] = uuid;
  }

  if (externalId) {
    where['externalId'] = externalId;
  }

  if (isUse) {
    where['isUse'] = isUse;
  }

  if (limit) {
    options['limit'] = Number(limit);
  }

  if (skip && take) {
    offset['offset'] = Number(skip);
    offset['limit'] = Number(take);
  }

  const result = await Category.findAll({
    where: {
      id: 1,
    },
    include: {
      model: Category,
      as: 'children',
      required: false,
    },
  });

  ctx.body = {
    success: true,
    data: result.map((category) => category.toJSON()),
  };
};
