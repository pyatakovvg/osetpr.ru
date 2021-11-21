
// import { sendEvent } from '@sys.packages/rabbit';
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  const { uuid } = ctx['request']['body'];
  const { Customer } = models;

  await Customer.destroy({
    where: { uuid },
  });

  ctx.body = {
    success: true,
    data: uuid,
  };
};
