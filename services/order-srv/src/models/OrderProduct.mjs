
import { Sequelize } from '@sys.packages/db';


export default function(sequelize, DataType) {
  const { Model } = Sequelize;

  class OrderProduct extends Model {}

  OrderProduct.init({
    uuid: {
      type: DataType.UUID,
      primaryKey: true,
      unique: true,
    },
    orderUuid: {
      type: DataType.UUID,
      allowNull: false,
    },
    productUuid: {
      type: DataType.UUID,
      allowNull: false,
    },
    modeUuid: {
      type: DataType.UUID,
      allowNull: false,
    },
    title: {
      type: DataType.STRING(255),
      allowNull: false,
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
      get(column) {
        return Number(this.getDataValue(column));
      },
    },
    total: {
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
    number: {
      type: DataType.INTEGER,
      allowNull: false,
      get(column) {
        return Number(this.getDataValue(column));
      },
    },
    order: {
      type: DataType.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    timestamp: false,
  });

  OrderProduct.associate = ({ ProductGallery, Currency }) => {

    OrderProduct.belongsTo(Currency, {
      foreignKey: 'currencyCode',
      as: 'currency',
    });

    OrderProduct.hasMany(ProductGallery, {
      foreignKey: 'productUuid',
      sourceKey: 'uuid',
      as: 'gallery',
    });
  };

  return OrderProduct;
};
