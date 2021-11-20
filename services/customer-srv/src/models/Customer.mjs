
import { Sequelize } from '@sys.packages/db';

export default function (sequelize, DataType) {
  const { Model } = Sequelize;

  class Customer extends Model {}

  Customer.init({
    uuid: {
      type: DataType.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataType.UUIDV4,
    },
    userUuid: {
      type: DataType.UUID,
      allowNull: true,
    },
    type: {
      type: DataType.ENUM('admin', 'customer'),
      allowNull: false,
      defaultValue: 'admin',
    },
    name: {
      type: DataType.STRING(255),
      allowNull: false,
      defaultValue: 'No name',
    },
    email: {
      type: DataType.STRING(255),
      allowNull: false,
      defaultValue: '',
    },
    phone: {
      type: DataType.STRING(12),
      allowNull: false,
      defaultValue: '',
    },
  }, {
    sequelize,
    timestamps: true,
  });

  Customer.associate = () => {};

  return Customer;
};
