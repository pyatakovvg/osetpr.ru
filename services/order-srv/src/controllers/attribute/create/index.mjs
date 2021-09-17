
import { models } from '@sys.packages/db';
import { sendEvent } from "@sys.packages/rabbit";


export default () => async (ctx) => {
  const { Attribute, Unit } = models;
  const formData = ctx['request']['body'];

  const { id } = await Attribute.create({
    value: formData['value'],
    type: formData['type'],
    description: formData['description'],
    unitId: formData['unitId'],
  });

  const result = await Attribute.findOne({
    attributes: ['id', 'value', 'type', 'description'],
    order: [['id', 'desc']],
    where: { id },
    include: [
      {
        model: Unit,
        attributes: ['id', 'value'],
        as: 'unit',
      }
    ],
  });

  const attr = result.toJSON();

  await sendEvent(process.env['EXCHANGE_ATTRIBUTE_CREATE'], JSON.stringify(attr));

  ctx.body = {
    success: true,
    data: attr,
  };
};
