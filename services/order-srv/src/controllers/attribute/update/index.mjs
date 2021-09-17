
import { sendEvent } from '@sys.packages/rabbit';
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  const { id } = ctx['params'];
  const formData = ctx['request']['body'];

  const { Attribute, Unit } = models;

  await Attribute.update({
    value: formData['value'],
    type: formData['type'],
    description: formData['description'],
    unitId: formData['unitId'],
  }, {
    where: { id },
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

  await sendEvent(process.env['EXCHANGE_ATTRIBUTE_UPDATE'], JSON.stringify(attr));

  ctx.body = {
    success: true,
    data: attr,
  };
};
