
import { Sequelize } from '@sys.packages/db';

export default function (sequelize, DataType) {
  const { Model } = Sequelize;

  class Customer extends Model {}

  Customer.init({
    uuid: {
      type: DataType.UUID,
      primaryKey: true,
      allowNull: false,
    },
    customerUuid: {
      type: DataType.UUID,
      allowNull: false,
    },
    type: {
      type: DataType.ENUM(['admin', 'customer']),
      allowNull: false,
      defaultValue: 'admin',
    },
    name: {
      type: DataType.STRING(255),
      allowNull: true,
      defaultValue: 'No name',
    },
    email: {
      type: DataType.STRING(255),
      allowNull: true,
      defaultValue: '',
    },
    phone: {
      type: DataType.STRING(12),
      allowNull: true,
      defaultValue: '',
    },
  }, {
    sequelize,
    timestamps: true,
  });

  Customer.associate = () => {};

  return Customer;
};
