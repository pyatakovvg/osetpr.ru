
import request from '@sys.packages/request';
import { sendEvent } from '@sys.packages/rabbit';
import { sequelize, models } from '@sys.packages/db';


export default () => async (ctx) => {
  const { id } = ctx['request']['body'];
  const { Category, ProductCategory } = models;

  const transaction = await sequelize.transaction();

  await Category.destroy({ where: { id }, transaction });
  await ProductCategory.destroy({ where: { categoryId: id }, transaction });

  await transaction.commit();

  await sendEvent(process.env['EXCHANGE_CATEGORY_DELETE'], JSON.stringify(id));

  ctx.body = {
    success: true,
    data: id,
  };
};
