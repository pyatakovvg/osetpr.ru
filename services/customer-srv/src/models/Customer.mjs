
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
    userUuid: {
      type: DataType.UUID,
      allowNull: true,
    },
    type: {
      type: DataType.ENUM,
      values: ['individual', 'legal'],
      allowNull: false,
    },
  }, {
    sequelize,
  });

  Customer.associate = ({ Legal, Individual }) => {

    Customer.hasOne(Legal, {
      foreignKey: 'customerUuid',
      as: 'legal',
    });

    Customer.hasOne(Individual, {
      foreignKey: 'customerUuid',
      as: 'individual',
    });
  };

  return Customer;
};
