
import { models } from '@sys.packages/db';


export default async function updateProperties(uuid) {
  const { ProductMode, Product, ProductGallery, Currency, Category } = models;

  const result = await Product.findOne({
    where: { uuid },
    order: [
      ['modes', 'order', 'asc'],
      ['gallery', 'order', 'asc'],
    ],
    attributes: ['uuid', 'externalId', 'title', 'description', 'isUse', 'updatedAt'],
    include: [
      {
        model: Category,
        required: true,
        attributes: ['id', 'value', 'description'],
        as: 'category',
        hierarchy: true,
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
            attributes: ['code', 'value'],
            as: 'currency',
          }
        ]
      },
    ],
  });

  return result.toJSON();
}
