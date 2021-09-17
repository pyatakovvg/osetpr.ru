
import { models } from '@sys.packages/db';
import request from "@sys.packages/request";


export default async function updateProperties(uuid) {
  const { Quantity, Product, Attribute, Unit, ProductGallery, Currency, Category, Type, Brand, Characteristic, CharacteristicAttribute, Option } = models;

  const result = await Product.findOne({
    where: { uuid },
    order: [
      ['gallery', 'order', 'asc'],
      ['options', 'order', 'asc'],
      ['characteristics', 'order', 'asc'],
      ['characteristics', 'attributes', 'order', 'asc'],
    ],
    attributes: ['uuid', 'externalId', 'name', 'description', 'isUse', 'createdAt', 'updatedAt'],
    include: [
      {
        model: Quantity,
        attributes: [['shopUuid', 'uuid'], 'quantity'],
        as: 'shops',
      },
      {
        model: Type,
        attributes: ['id', 'value'],
        as: 'type',
        through: {
          attributes: [],
        }
      },
      {
        model: Brand,
        attributes: ['id', 'value'],
        as: 'brand',
        through: {
          attributes: [],
        }
      },
      {
        model: Option,
        as: 'options',
        required: false,
        where: {},
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
        model: Category,
        as: 'category',
        attributes: ['id', 'value'],
        through: {
          attributes: [],
          order: [['order', 'asc']],
          as: 'category',
        },
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
    ]
  });

  const product = result.toJSON();

  // const { data: promotions } = await request({
  //   url: process.env['PROMOTION_API_SRV'] + '/products',
  //   method: 'get',
  //   params: {
  //     uuid,
  //     onlyActive: false,
  //   },
  // });

  // product['promotions'] = promotions;

  return product;
}
