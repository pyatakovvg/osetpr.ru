
import { models } from '@sys.packages/db';


export default async function updateProperties(uuid) {
  const { ProductMode, Product, ProductGallery, Currency, Group, Category } = models;

  const result = await Product.findOne({
    where: { uuid },
    order: [
      ['modes', 'order', 'asc'],
      ['gallery', 'order', 'asc'],
    ],
    attributes: ['uuid', 'externalId', 'title', 'originalName', 'description', 'isUse', 'isAvailable', 'updatedAt'],
    include: [
      {
        model: Group,
        required: false,
        attributes: ['uuid', 'value'],
        as: 'group',
      },
      {
        model: Category,
        required: false,
        attributes: ['uuid', 'value'],
        as: 'category',
      },
      {
        model: ProductGallery,
        required: false,
        attributes: [['imageUuid', 'uuid']],
        as: 'gallery',
      },
      {
        model: ProductMode,
        required: false,
        as: 'modes',
        attributes: ['uuid', 'vendor', 'value', 'price', 'isUse', 'isTarget'],
        include: [
          {
            model: Currency,
            attributes: ['code', 'displayName'],
            as: 'currency',
          }
        ]
      },
    ],
  });

  return result.toJSON();
}
