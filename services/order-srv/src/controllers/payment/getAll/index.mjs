
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  const { Payment } = models;

  const result = await Payment.findAll();

  ctx.body = {
    success: true,
    data: result.map((item) => item.toJSON()),
  };
};
