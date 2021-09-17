
import { models, sequelize } from '@sys.packages/db';


export default async function restoreAttributes({ characteristics, characteristicAttributes }) {
  const { Characteristic, CharacteristicAttribute } = models;

  const transaction = await sequelize.transaction();

  const characteristicsBulk = characteristics.map((data) => ({
    productUuid: data['productUuid'],
    value: data['value'],
    order: data['order'],
  }));
  await Characteristic.bulkCreate(characteristicsBulk, { transaction })

  const characteristicAttributesBulk = characteristicAttributes.map((data) => ({
    characteristicId: data['characteristicId'],
    attributeId: data['attributeId'],
    value: data['value'],
    order: data['order'],
    isUse: data['isUse'],
  }));
  await CharacteristicAttribute.bulkCreate(characteristicAttributesBulk, { transaction })

  await transaction.commit();
}
