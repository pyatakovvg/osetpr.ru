
import { Sequelize } from '@sys.packages/db';


export default function(sequelize, DataType) {
  const { Model } = Sequelize;

  class Characteristic extends Model {}

  Characteristic.init({
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    productUuid: {
      type: DataType.STRING(9),
      allowNull: false,
    },
    value: {
      type: DataType.STRING(256),
      allowNull: false,
    },
    order: {
      type: DataType.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Characteristic',
    timestamps: false,
  });

  Characteristic.associate = ({ CharacteristicAttribute }) => {

    Characteristic.hasMany(CharacteristicAttribute, {
      foreignKey: 'characteristicId',
      as: 'attributes',
    });
  };

  return Characteristic;
};
