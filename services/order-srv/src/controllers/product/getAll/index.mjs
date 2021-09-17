
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  const { Product, Brand, Type, Currency, Attribute, Category, Option, Characteristic, CharacteristicAttribute, Unit, ProductGallery, Comment, Quantity } = models;

  let sorting = ['price', 'desc'];
  let where = {};
  let whereForQuantity = {};
  let whereForType = {};
  let whereForCategory = {};
  let whereForBrand = {};
  let whereForOptions = {};
  let offset = {};
  let options = {};
    
  const { limit, skip, take } = ctx['query'];
  const { shopUuid } = ctx['query'];
  const { uuid, externalId, typeId, categoryId, brandId, vendor } = ctx['query'];


  if (limit) {
    options['limit'] = Number(limit);
  }

  if (skip && take) {
    offset['offset'] = Number(skip);
    offset['limit'] = Number(take);
  }

  if (uuid) {
    where['uuid'] = uuid;
  }

  if (externalId) {
    where['externalId'] = externalId;
  }

  if (typeId) {
    whereForType['id'] = Number(typeId);
  }

  if (categoryId) {
    whereForCategory['id'] = Number(categoryId);
  }

  if (brandId) {
    whereForBrand['id'] = Number(brandId);
  }

  if (vendor) {
    whereForOptions['vendor'] = vendor;
  }

  if (shopUuid) {
    whereForQuantity['shopUuid'] = shopUuid;
  }

  const result = await Product.findAndCountAll({
    ...options,
    ...offset,
    row: true,
    distinct: true,
    where: {
      ...where
    },
    order: [
      ['createdAt', 'desc'],
      ['gallery', 'order', 'asc'],
      ['options', 'order', 'asc'],
      ['comments', 'createdAt', 'desc'],
      ['characteristics', 'order', 'asc'],
      ['characteristics', 'attributes', 'order', 'asc'],
    ],
    attributes: ['uuid', 'externalId', 'name', 'description', 'isUse', 'createdAt', 'updatedAt'],
    include: [
      {
        model: Quantity,
        required: !! Object.keys(whereForQuantity).length,
        where: {
          ...whereForQuantity,
        },
        attributes: [['shopUuid', 'uuid'], 'quantity'],
        as: 'shops',
      },
      {
        model: Type,
        required: !! whereForType['id'],
        attributes: ['id', 'value'],
        where: {
          ...whereForType,
        },
        as: 'type',
        through: {
          attributes: [],
        }
      },
      {
        model: Category,
        as: 'category',
        required: !! Object.keys(whereForCategory).length,
        where: {
          ...whereForCategory,
        },
        attributes: ['id', 'value'],
        through: {
          attributes: [],
          order: [['order', 'asc']],
          as: 'category',
        },
      },
      {
        model: Brand,
        required: !! Object.keys(whereForBrand).length,
        where: {
          ...whereForBrand
        },
        attributes: ['id', 'value'],
        as: 'brand',
        through: {
          attributes: [],
        }
      },
      {
        model: Option,
        as: 'options',
        required: !! Object.keys(whereForOptions).length,
        where: {
          ...whereForOptions,
        },
        attributes: ['vendor', 'value', 'price', 'currencyCode', 'isUse', 'isTarget'],
        include: [
          {
            model: Currency,
            as: 'currency',
            attributes: ['code', 'value']
          },
        ],
      },
      {
        model: Characteristic,
        required: false,
        as: 'characteristics',
        attributes: ['id', 'value', 'order'],
        include: [
          {
            model: CharacteristicAttribute,
            required: false,
            as: 'attributes',
            attributes: ['value', 'order', 'isUse'],
            include: [
              {
                model: Attribute,
                attributes: ['id', 'value'],
                as: 'attribute',
                include: [
                  {
                    model: Unit,
                    required: false,
                    as: 'unit',
                    attributes: ['id', 'value']
                  }
                ]
              }
            ]
          },
        ]
      },
      {
        model: ProductGallery,
        as: 'gallery',
        attributes: [['imageUuid', 'uuid']],
      },
      {
        model: Comment,
        as: 'comments',
        attributes: ['id', 'evaluation', 'person', 'comment', 'createdAt'],
      }
    ]
  });

  ctx.responseType = 'application/json';
  ctx.body = {
    success: true,
    data: result['rows'],
    meta: {
      total: result['count'],
    },
  };
};
