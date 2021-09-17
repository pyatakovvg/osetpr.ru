
import { models, sequelize } from '@sys.packages/db';


export default () => async (ctx) => {
  const where = {};
  const productWhere = {};

  const { Product, Category, Type, Brand } = models;
  const { typeId = null, brandId = null, isView = null } = ctx['request']['query'];

  if (isView !== null) {
    productWhere['isView'] = isView;
  }

  if (typeId) {
    where['typeId'] = typeId;
  }

  if (brandId) {
    where['brandId'] = brandId;
  }

  const result = await Category.findAll({
    row: true,
    group: ['Categories.id'],
    order: [['value', 'asc']],
    attributes: ['id', 'value', [sequelize.fn('COUNT', sequelize.col('products.uuid')), 'count']],
    include: [
      {
        model: Product,
        required: false,
        where: { ...productWhere },
        as: 'products',
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
            model: Brand,
            required: !! where['brandId'],
            as: 'brand',
            where: { id: where['brandId'] || [] },
            attributes: [],
            through: { attributes: [] },
          },
        ]
      }
    ],
  });

  ctx.body = {
    success: true,
    data: result,
  };
};
