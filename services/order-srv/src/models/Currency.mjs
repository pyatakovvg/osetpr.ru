
import { Sequelize } from '@sys.packages/db';


export default function(sequelize, DataType) {
  const { Model } = Sequelize;

  class Currency extends Model {}

  Currency.init({
    code: {
      type: DataType.STRING(4),
      primaryKey: true,
      allowNull: false,
    },
    value: {
      type: DataType.STRING(8),
      allowNull: false,
    },
    description: {
      type: DataType.STRING(1024),
      allowNull: true,
    }
  }, {
    sequelize,
    modelName: 'Currency',
    timestamps: false,
  });

  Currency.associate = () => {};

  return Currency;
};
