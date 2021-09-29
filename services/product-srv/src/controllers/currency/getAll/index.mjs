
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  const { Currency } = models;

  const result = await Currency.findAll();

  ctx.body = {
    success: true,
    data: result.map((item) => item.toJSON()),
  };
};
