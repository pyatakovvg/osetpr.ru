
import { Sequelize } from '@sys.packages/db';

export default function (sequelize, DataType) {
  const { Model } = Sequelize;

  class Individual extends Model {}

  Individual.init({
    customerUuid: {
      type: DataType.UUID,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    name: {
      type: DataType.STRING(32),
      allowNull: false,
    },
    patronymic: {
      type: DataType.STRING(32),
      allowNull: true,
    },
    surname: {
      type: DataType.STRING(32),
      allowNull: true,
    },
    gender: {
      type: DataType.ENUM,
      values: ['male', 'female'],
      defaultValue: null,
      allowNull: true,
    },
    age: {
      type: DataType.INTEGER,
      allowNull: true,
    },
    birthday: {
      type: DataType.DATE,
      allowNull: true,
    },
    phone: {
      type: DataType.STRING(12),
      allowNull: false,
    },
  }, {
    sequelize,
    timestamps: false,
  });

  return Individual;
};
