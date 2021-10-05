
import { Sequelize } from '@sys.packages/db';

export default function (sequelize, DataType) {
  const { Model } = Sequelize;

  class Legal extends Model {}

  Legal.init({
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    customerUuid: {
      type: DataType.UUID,
      allowNull: false,
    },
    name: {
      type: DataType.STRING(255),
      allowNull: false,
    },
    address: {
      type: DataType.STRING(255),
      allowNull: true,
    },
    phone: {
      type: DataType.STRING(12),
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Legal',
  });

  return Legal;
};
