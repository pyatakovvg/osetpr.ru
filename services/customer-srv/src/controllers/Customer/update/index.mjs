
import { models } from '@sys.packages/db';
import { sendEvent } from '@sys.packages/rabbit';


export default () => async (ctx) => {
  const { Customer } = models;

  const { uuid } = ctx['params'];
  const data = ctx['request']['body'];

  await Customer.update({
    userUuid: data['userUuid'],
    type: data['type'],
    name: data['name'],
    phone: data['phone'],
    email: data['email'],
  }, {
    where: {
      uuid,
    },
  });

  const result = await Customer.findOne({
    where: { uuid },
    attributes: ['uuid', 'userUuid', 'type', 'name', 'phone', 'email', 'createdAt', 'updatedAt'],
  });

  const customerData = result.toJSON();

  await sendEvent(process.env['EXCHANGE_CUSTOMER_UPDATE'], JSON.stringify(customerData));

  ctx.body = {
    success: true,
    data: customerData,
  };
};
