
import { models, sequelize } from '@sys.packages/db';


export default () => async (ctx) => {
  const where = {};
  const productWhere = {};
  const { typeId = null, categoryId = null, brandId = null, isUse = null } = ctx['request']['query'];

  const { Product, Type, Category, Brand, Unit, Attribute, ProductAttribute } = models;

  if (isUse !== null) {
    productWhere['isUse'] = isUse;
  }

  if (typeId) {
    where['typeId'] = Number(typeId);
  }

  if (categoryId) {
    where['categoryId'] = Number(categoryId);
  }

  if (brandId) {
    where['brandId'] = Number(brandId);
  }

  const result = await Attribute.findAll({
    row: true,
    group: ['Attribute.id', 'unit.value'],
    attributes: [
      'id',
      ['value', 'name'],
      [sequelize.col('unit.value'), 'Unit'],
      [sequelize.fn('COUNT', sequelize.col('product_attribute.id')), 'count'],
    ],
    include: [
      {
        model: Unit,
        required: false,
        as: 'unit',
        attributes: []
      },
      {
        model: ProductAttribute,
        required: true,
        as: 'product_attribute',
        attributes: [],
        include: [
          {
            model: Product,
            where: { ...productWhere },
            as: 'product',
            required: false,
            attributes: [],
            include: [
              {
                model: Type,
                required: !! where['typeId'],
                as: 'types',
                where: { id: where['typeId'] || [] },
                attributes: [],
                through: { attributes: [] },
              },
              {
                model: Category,
                required: !! where['categoryId'],
                as: 'categories',
                where: { id: where['categoryId'] || [] },
                attributes: [],
                through: { attributes: [] },
              },
              {
                model: Brand,
                required: !! where['brandId'],
                as: 'brands',
                where: { id: where['brandId'] || [] },
                attributes: [],
                through: { attributes: [] },
              },
            ]
          }
        ]
      },
    ]
  });

  ctx.body = {
    success: true,
    data: result,
  };
};
