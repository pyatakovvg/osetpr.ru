
import { Sequelize } from '@sys.packages/db';


export default function(sequelize, DataType) {
  const { Model } = Sequelize;

  class Unit extends Model {}

  Unit.init({
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      index: true,
    },
    value: {
      type: DataType.STRING(8),
      allowNull: false,
    },
    description: {
      type: DataType.STRING(2024),
      allowNull: true,
      defaultValue: null,
    }
  }, {
    sequelize,
    modelName: 'Unit',
    timestamps: false,
  });

  Unit.associate = () => {};

  return Unit;
};
