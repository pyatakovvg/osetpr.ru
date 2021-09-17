
import { sequelize, models } from '@sys.packages/db';


export default async function updateProperties(uuid, properties) {
  const { Product } = models;

  const transaction = await sequelize.transaction();

  const product = {};

  if (properties['name']) {
    product['name'] = properties['name'];
  }

  if (properties['price']) {
    product['price'] = Number(properties['price']);
  }

  if (properties['currencyCode']) {
    product['currencyCode'] = properties['currencyCode'];
  }

  if (properties['description']) {
    product['description'] = properties['description'];
  }

  if ('isView' in properties) {
    product['isView'] = properties['isView'];
  }

  await Product.update(product, {
    where: { uuid },
    transaction,
  });

  await transaction.commit();
}
