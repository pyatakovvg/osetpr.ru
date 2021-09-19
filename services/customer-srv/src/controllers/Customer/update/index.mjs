
import { sendEvent } from '@sys.packages/rabbit';
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  const { id } = ctx['params'];
  const data = ctx['request']['body'];

  const { Client, Address, Meta } = models;

  await Client.update({
    name: data['name'],
    patronymic: data['patronymic'],
    surname: data['surname'],
    gender: data['gender'],
    age: data['age'],
    birthday: data['birthday'],
  }, {
    where: { id },
  });

  const result = await Client.findOne({
    where: { id },
    distinct: true,
    order: [['id', 'desc']],
    attributes: ['id', 'name', 'patronymic', 'surname', 'gender', 'age', 'birthday'],
    include: [
      {
        model: Address,
        required: false,
        as: 'address',
        attributes: ['postalCode', 'country', 'province', 'locality', 'street', 'house', 'entrance', 'floor', 'flat']
      },
      {
        model: Meta,
        required: false,
        as: 'meta',
        attributes: ['email', 'phone']
      },
    ]
  });

  await sendEvent(process.env['EXCHANGE_CUSTOMER_UPDATE'], JSON.stringify(result.toJSON()))

  ctx.body = {
    success: true,
    data: result.toJSON(),
  };
};
