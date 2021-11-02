
import { Sequelize } from '@sys.packages/db';


export default function(sequelize, DataType) {
  const { Model } = Sequelize;

  class Payment extends Model {}

  Payment.init({
    code: {
      type: DataType.STRING,
      primaryKey: true,
    },
    displayName: {
      type: DataType.STRING,
      allowNull: false,
    },
    isUse: {
      type: DataType.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  }, {
    sequelize,
    timestamps: false,
  });

  Payment.associate = () => {};

  return Payment;
};
