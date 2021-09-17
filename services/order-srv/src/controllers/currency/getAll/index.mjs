
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  const { Currency } = models;

  const currencies = await Currency.findAll({
    attributes: ['code', 'value', 'description'],
    order: [['value', 'asc']],
  });

  ctx.body = {
    success: true,
    data: currencies.map((currency) => currency.toJSON()),
  };
};
