
import { models } from '@sys.packages/db';


export default async ({
  limit = null,
  skip = null,
  take = null,
  uuid = null,
  externalId = null,
  isUse = null,
  categoryUuid = null,
}) => {
  let where = {};
  let whereMode = {};
  let whereCategory = {};
  let offset = {};
  let options = {};

  const { Product, ProductMode, ProductGallery, Group, Category, Currency } = models;

  if (uuid) {
    where['uuid'] = uuid;
  }

  if (externalId) {
    where['externalId'] = externalId;
  }

  if (categoryUuid) {
    whereCategory['id'] = categoryUuid;
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
      ['group', 'order', 'asc'],
      ['category', 'order', 'asc'],
      ['createdAt', 'desc'],
      ['modes', 'order', 'asc'],
      ['gallery', 'order', 'asc'],
    ],
    attributes: ['uuid', 'externalId', 'title', 'originalName', 'description', 'isUse', 'isAvailable', 'updatedAt'],
    include: [
      {
        model: Group,
        required: false,
        where: { ...whereCategory },
        attributes: ['uuid', 'value'],
        as: 'group',
      },
      {
        model: Category,
        required: false,
        where: { ...whereCategory },
        attributes: ['uuid', 'value'],
        as: 'category',
      },
      {
        model: ProductGallery,
        required: false,
        attributes: [['imageUuid', 'uuid']],
        as: 'gallery',
      },
      {
        model: ProductMode,
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
