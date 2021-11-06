
import { models } from '@sys.packages/db';


export default async ({
  limit = null,
  skip = null,
  take = null,
  uuid = null,
  externalId = null,
  isUse = null,
}) => {
  let where = {};
  let whereMode = {};
  let offset = {};
  let options = {};

  const { Product, ProductMode, ProductGallery, Category, Currency } = models;

  if (uuid) {
    where['uuid'] = uuid;
  }

  if (externalId) {
    where['externalId'] = externalId;
  }

  if (isUse) {
    where['isUse'] = isUse;
    whereMode['isUse'] = isUse;
  }

  if (limit) {
    options['limit'] = Number(limit);
  }

  if (skip && take) {
    offset['offset'] = Number(skip);
    offset['limit'] = Number(take);
  }

  const result = await Product.findAndCountAll({
    ...options,
    ...offset,
    distinct: true,
    where: { ...where },
    order: [
      ['category', 'order', 'asc'],
      ['createdAt', 'asc'],
    ],
    attributes: ['uuid', 'externalId', 'title', 'description', 'isUse', 'updatedAt'],
    include: [
      {
        model: Category,
        required: true,
        attributes: ['id', 'value'],
        as: 'category',
        hierarchy: true,
      },
      {
        model: ProductGallery,
        required: false,
        order: ['order', 'desc'],
        attributes: [['imageUuid', 'uuid']],
        as: 'gallery',
      },
      {
        model: ProductMode,
        order: ['order', 'desc'],
        required: false,
        where: { ...whereMode },
        as: 'modes',
        attributes: ['uuid', 'vendor', 'value', 'price', 'isUse', 'isTarget'],
        include: [
          {
            model: Currency,
            attributes: ['code', 'displayName'],
            as: 'currency',
          }
        ]
      },
    ],
  });

  return {
    data: result['rows'],
    meta: result['meta'],
  };
};
