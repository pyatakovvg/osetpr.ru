
import { sequelize, models } from '@sys.packages/db';


export default async function updateProperties(productUuid, characteristics) {
  const { Characteristic, CharacteristicAttribute } = models;

  const transaction = await sequelize.transaction();

  await Characteristic.destroy({
    where: {
      productUuid,
    },
    transaction,
  });

  await CharacteristicAttribute.destroy({
    where: {
      characteristicId: characteristics.map((char) => char['id']),
    },
    transaction,
  });

  if (characteristics && !! characteristics.length) {
    await Characteristic.bulkCreate(characteristics.map((item) => ({
      value: item['value'],
      productUuid: item['productUuid'],
      order: item['order'],
    })));

    const attributes = [];
    for (let charIndex in characteristics) {
      if (characteristics.hasOwnProperty(charIndex)) {
        const characteristic = characteristics[charIndex];
        for (let attrIndex in characteristic['attributes']) {
          if (characteristic['attributes'].hasOwnProperty(attrIndex)) {
            const attribute = characteristic['attributes'][attrIndex];
            attributes.push({
              characteristicId: characteristic['id'],
              attributeId: attribute['attributeId'],
              value: attribute['value'],
              isUse: attribute['isUse'],
              order: attribute['order'],
            });
          }
        }
      }
    }

    await CharacteristicAttribute.bulkCreate(attributes, {
      transaction,
    });
  }

  await transaction.commit();
}
