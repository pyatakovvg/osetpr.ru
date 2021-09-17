
import { sequelize, models } from '@sys.packages/db';


export default async function restoreAttributes(productUuid) {
  const { Characteristic, CharacteristicAttribute } = models;

  const transaction = await sequelize.transaction();

  const result = await Characteristic.findAll({
    where: {
      productUuid,
    },
    transaction,
  });

  await Characteristic.destroy({
    where: {
      productUuid,
    },
    transaction,
  });

  await CharacteristicAttribute.destroy({
    where: {
      characteristicId: result.map((char) => char['id']),
    },
    transaction,
  });

  await transaction.commit();
}
