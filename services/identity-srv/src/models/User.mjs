
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
    type: {
      type: DataType.ENUM,
      values: ['customer', 'seller'],
      defaultValue: 'seller',
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Users',
  });

  User.associate = function({ Role, UserRole }) {

    User.belongsToMany(Role, {
      through: UserRole,
      foreignKey: 'userUuid',
      otherKey: 'roleId',
      as: 'role',
    });
  };

  return User;
};
