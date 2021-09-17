
import { Sequelize } from '@sys.packages/db';


export default function(sequelize, DataType) {
  const { Model } = Sequelize;

  class Option extends Model {}

  Option.init({
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      index: true,
    },
    productUuid: {
      type: DataType.UUID,
      allowNull: false,
    },
    vendor: {
      type: DataType.STRING(256),
      allowNull: false,
    },
    value: {
      type: DataType.STRING(256),
      allowNull: false,
    },
    price: {
      type: DataType.DECIMAL(10, 2),
      allowNull: false,
      get(column) {
        return Number(this.getDataValue(column));
      },
    },
    currencyCode: {
      type: DataType.STRING(4),
      allowNull: false,
    },
    isUse: {
      type: DataType.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isTarget: {
      type: DataType.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    order: {
      type: DataType.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  }, {
    sequelize,
    modelName: 'Options',
  });

  Option.associate = ({ Product, Currency }) => {

    // Option.belongsToMany(Product, {
    //   foreignKey: 'optionId',
    //   as: 'product',
    // });

    Option.belongsTo(Currency, {
      foreignKey: 'currencyCode',
      as: 'currency',
    });
  };

  return Option;
};
