
import { models, Op } from '@sys.packages/db';


export default async ({
  limit = null,
  skip = null,
  take = null,
  uuid = null,
  externalId = null,
  isUse = null,
  isAvailable = null,
  groupUuid = null,
  categoryUuid = null,
  vendor = null,
  minPrice = null,
  maxPrice = null,
}) => {
  let where = {};
  let whereMode = {};
  let whereGroup = {};
  let whereCategory = {};
  let offset = {};
  let options = {};

  const { Product, ProductMode, ProductGallery, Group, Category, Currency } = models;

  if (uuid) {
    where['uuid'] = uuid;
  }

  if (externalId) {
    where['externalId'] = {
      [Op.like]: `%${externalId}%`,
    };
  }

  if (vendor) {
    whereMode['vendor'] = {
      [Op.like]: `%${vendor}%`,
    };
  }

  if (minPrice && maxPrice) {
    whereMode['price'] = {
      [Op.between]: [minPrice, maxPrice],
    };
  }
  else if (minPrice) {
    whereMode['price'] = {
      [Op.gte]: minPrice,
    };
  }
  else if (maxPrice) {
    whereMode['price'] = {
      [Op.lte]: maxPrice,
    };
  }

  if (groupUuid) {
    whereGroup['uuid'] = groupUuid;
  }

  if (categoryUuid) {
    whereCategory['uuid'] = categoryUuid;
  }

  if (isUse) {
    where['isUse'] = isUse;
    whereMode['isUse'] = isUse;
  }

  if (isAvailable) {
    where['isAvailable'] = isAvailable;
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
        required: !! Object.keys(whereGroup).length,
        where: { ...whereGroup },
        attributes: ['uuid', 'value'],
        as: 'group',
      },
      {
        model: Category,
        required: !! Object.keys(whereCategory).length,
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
        required: !! Object.keys(whereMode).length,
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
    meta: {
      total: result['count'],
    },
  };
};
