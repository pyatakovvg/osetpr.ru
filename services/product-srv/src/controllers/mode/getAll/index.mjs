
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  let where = {};
  let offset = {};
  let options = {};

  const { Product, ProductMode } = models;

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

  const result = await ProductMode.findAndCountAll({
    ...options,
    ...offset,
    distinct: true,
    where: { ...where },
    group: ['ProductMode.uuid', 'product.uuid'],
    include: [
      {
        model: Product,
        as: 'product',
      }
    ],
    // attributes: ['uuid', 'externalId', 'title', 'description', 'isUse'],
    // include: [
    //   {
    //     model: Category,
    //     required: true,
    //     attributes: ['value', 'description'],
    //     as: 'category',
    //     hierarchy: true,
    //   },
    //   {
    //     model: ProductGallery,
    //     required: false,
    //     attributes: [['imageUuid', 'uuid']],
    //     as: 'gallery',
    //   },
    //   {
    //     model: ProductMode,
    //     required: true,
    //     as: 'mode',
    //     attributes: ['uuid', 'vendor', 'value', 'price', 'isUse', 'isTarget'],
    //     include: [
    //       {
    //         model: Currency,
    //         attributes: ['value'],
    //         as: 'currency',
    //       }
    //     ]
    //   },
    // ],
  });

  ctx.body = {
    success: true,
    data: result['rows'],
    meta: result['meta'],
  };
};
