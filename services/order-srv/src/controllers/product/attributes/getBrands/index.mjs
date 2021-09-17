
import { models, sequelize } from '@sys.packages/db';


export default () => async (ctx) => {
  let where = {};
  let productWhere = {};

  const { Brand, Product, Type, Category } = models;
  const { typeId = null, categoryId = null, isUse = null } = ctx['request']['query'];

  if (isUse !== null) {
    productWhere['isUse'] = isUse;
  }

  if (typeId) {
    where['typeId'] = Number(typeId);
  }

  if (categoryId) {
    where['categoryId'] = Number(categoryId);
  }

  const result = await Brand.findAll({
    row: true,
    group: ["Brands.id"],
    order: [['value', 'asc']],
    attributes: ['id', 'value', [sequelize.fn('COUNT', sequelize.col('products.uuid')), 'count']],
    include: [
      {
        model: Product,
        required: false,
        as: 'products',
        where: { ...productWhere },
        attributes: [],
        through: { attributes: [] },
        include: [
          {
            model: Type,
            required: !! where['typeId'],
            as: 'type',
            where: { id: where['typeId'] || [] },
            attributes: [],
            through: { attributes: [] },
          },
          {
            model: Category,
            required: !! where['categoryId'],
            as: 'category',
            where: { id: where['categoryId'] || [] },
            attributes: [],
            through: { attributes: [] },
          },
        ]
      },
    ]
  });

  ctx.body = {
    success: true,
    data: result,
  };
};
