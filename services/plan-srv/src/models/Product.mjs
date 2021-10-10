
import { Sequelize } from '@sys.packages/db';


export default function(sequelize, DataType) {
  const { Model } = Sequelize;

  class Product extends Model {}

  Product.init({
    uuid: {
      type: DataType.UUID,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    productUuid: {
      type: DataType.UUID,
      allowNull: false,
    },
    title: {
      type: DataType.STRING(256),
      allowNull: true,
    },
    vendor: {
      type: DataType.STRING(32),
      allowNull: false,
    },
    value: {
      type: DataType.STRING(255),
      allowNull: false,
    },
    price: {
      type: DataType.DECIMAL(10, 2),
      allowNull: false,
    },
    currencyCode: {
      type: DataType.STRING(4),
      allowNull: false,
    },
  }, {
    sequelize,
  });

  Product.associate = ({ Currency }) => {

    Product.belongsTo(Currency, {
      foreignKey: 'currencyCode',
      as: 'currency',
    });
  };

  return Product;
};
