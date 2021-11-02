
import { Sequelize } from '@sys.packages/db';


export default function(sequelize, DataType) {
  const { Model } = Sequelize;

  class Order extends Model {}

  Order.init({
    uuid: {
      type: DataType.UUID,
      primaryKey: true,
    },
    userUuid: {
      type: DataType.UUID,
      allowNull: false,
    },
    statusCode: {
      type: DataType.STRING,
      allowNull: false,
    },
    title: {
      type: DataType.STRING(256),
      allowNull: false,
    },
    dateTo: {
      type: DataType.DATE,
      allowNull: false,
    },
    description: {
      type: DataType.STRING(2024),
      allowNull: true,
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
    paymentCode: {
      type: DataType.STRING,
      allowNull: true,
    },
  }, {
    sequelize,
  });

  Order.associate = ({ OrderProduct, OrderAddress, Status, Currency, Payment }) => {

    Order.belongsTo(Currency, {
      foreignKey: 'currencyCode',
      as: 'currency',
    });

    Order.belongsTo(Payment, {
      foreignKey: 'paymentCode',
      as: 'payment',
    });

    Order.belongsTo(OrderAddress, {
      foreignKey: 'uuid',
      sourceKey: 'orderUuid',
      as: 'address',
    });

    Order.hasMany(OrderProduct, {
      foreignKey: 'orderUuid',
      as: 'products',
    });

    Order.belongsTo(Status, {
      foreignKey: 'statusCode',
      as: 'status',
    });
  };

  return Order;
};
