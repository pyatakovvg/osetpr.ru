
import { sequelize, models } from '@sys.packages/db';


export default async function destroyAttributes(productUuid) {
  const { Characteristic, CharacteristicAttribute } = models;

  const transaction = await sequelize.transaction();

  const characteristics = await Characteristic.findAll({
    where: {
      productUuid,
    },
    transaction,
  });

  const characteristicAttributes = await CharacteristicAttribute.findAll({
    where: {
      characteristicId: characteristics.map((char) => char['id']),
    },
    transaction,
  });

  await CharacteristicAttribute.destroy({
    where: {
      characteristicId: characteristics.map((char) => char['id']),
    },
    transaction,
  });

  await Characteristic.destroy({
    where: {
      productUuid,
    },
    transaction,
  });

  await transaction.commit();

  return {
    characteristics: characteristics.map((char) => char.toJSON()),
    characteristicAttributes: characteristicAttributes.map((charAttr) => charAttr.toJSON()),
  };
}
