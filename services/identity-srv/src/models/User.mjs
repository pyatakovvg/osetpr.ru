
import { Sequelize } from '@sys.packages/db';


export default function (sequelize, DataType) {
  const { Model } = Sequelize;

  class User extends Model {}

  User.init({
    uuid: {
      type: DataType.UUID,
      primaryKey: true,
      index: true,
    },
    login: {
      type: DataType.STRING(125),
      index: true,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataType.STRING(255),
      allowNull: false,
    },
    roleCode: {
      type: DataType.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
  });

  User.associate = function({ Role }) {

    User.belongsTo(Role, {
      foreignKey: 'roleCode',
      as: 'role',
    });
  };

  return User;
};
