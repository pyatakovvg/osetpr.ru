
import { Sequelize } from '@sys.packages/db';

export default function (sequelize, DataType) {
  const { Model } = Sequelize;

  class Individual extends Model {}

  Individual.init({
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    customerUuid: {
      type: DataType.UUID,
      allowNull: false,
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
      allowNull: false,
    },
    gender: {
      type: DataType.ENUM,
      values: ['male', 'female'],
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
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Individual',
  });

  return Individual;
};
