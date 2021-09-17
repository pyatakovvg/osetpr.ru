
import { Sequelize } from '@sys.packages/db';


export default function (sequelize, DataType) {
  const { Model } = Sequelize;

  class CharacteristicAttribute extends Model {}

  CharacteristicAttribute.init({
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    characteristicId: {
      type: DataType.INTEGER,
      allowNull: false,
    },
    attributeId: {
      type: DataType.INTEGER,
      allowNull: false,
    },
    value: {
      type: DataType.STRING(32),
      allowNull: true
    },
    order: {
      type: DataType.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    isUse: {
      type: DataType.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  }, {
    sequelize,
    modelName: 'CharacteristicAttribute',
    timestamps: false,
  });

  CharacteristicAttribute.associate = ({ Characteristic, Attribute }) => {

    CharacteristicAttribute.belongsTo(Characteristic, {
      foreignKey: 'characteristicId',
      as: 'characteristic',
    });

    CharacteristicAttribute.belongsTo(Attribute, {
      foreignKey: 'attributeId',
      as: 'attribute',
    });
  };

  return CharacteristicAttribute;
};
