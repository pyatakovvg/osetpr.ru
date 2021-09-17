
import { sendEvent } from "@sys.packages/rabbit";
import { sequelize, models } from '@sys.packages/db';


export default () => async (ctx) => {
  const { Brand, ProductBrand } = models;
  const { id } = ctx['request']['body'];

  const transaction = await sequelize.transaction();

  await Brand.destroy({
    where: { id },
    transaction,
  });

  await ProductBrand.destroy({
    where: {
      brandId: id,
    },
    transaction
  });

  await transaction.commit();

  await sendEvent(process.env['EXCHANGE_BRAND_DELETE'], JSON.stringify(id));

  ctx.body = {
    success: true,
    data: id,
  };
};
