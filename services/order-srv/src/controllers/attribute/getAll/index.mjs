
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  const where = {};

  const { Attribute, Unit } = models;
  const { id } = ctx['request']['query'];

  if (id) {
    where['id'] = Number(id);
  }
  
  const result = await Attribute.findAll({
    attributes: ['id', 'value', 'type', 'description'],
    order: [['value', 'asc']],
    where: { ...where },
    include: [
      {
        model: Unit,
        attributes: ['id', 'value'],
        as: 'unit',
      },
    ],
  });

  ctx.body = {
    success: true,
    data: result.map(item => item.toJSON()),
  };
};
