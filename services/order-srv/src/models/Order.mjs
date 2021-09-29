
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
    address: {
      type: DataType.STRING(256),
      allowNull: false,
    },
  }, {
    sequelize,
  });

  Order.associate = ({ OrderProduct, Status }) => {

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
