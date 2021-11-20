
import { models } from '@sys.packages/db';
import { sendEvent } from '@sys.packages/rabbit';


export default () => async (ctx) => {
  const data = ctx['request']['body'];
  const { Customer } = models;

  const customer = await Customer.create({
    userUuid: data['userUuid'],
    type: data['type'],
    name: data['name'],
    phone: data['phone'],
    email: data['email'],
  });

  const result = await Customer.findOne({
    where: {
      uuid: customer['uuid'],
    },
    attributes: ['uuid', 'userUuid', 'type', 'name', 'phone', 'email', 'createdAt', 'updatedAt'],
  });

  const customerData = result.toJSON();

  await sendEvent(process.env['EXCHANGE_CUSTOMER_CREATE'], JSON.stringify(customerData));

  ctx.body = {
    success: true,
    data: customerData,
  };
};
