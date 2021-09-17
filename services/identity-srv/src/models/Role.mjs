
import { Sequelize } from '@sys.packages/db';


export default function (sequelize, DataType) {
  const { Model } = Sequelize;

  class Role extends Model {}

  Role.init({
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      index: true,
    },
    code: {
      type: DataType.STRING(16),
      allowNull: false,
    },
    name: {
      type: DataType.STRING(124),
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Roles',
    timestamps: false,
  });

  Role.associate = ({ User, UserRole }) => {

    Role.belongsToMany(User, {
      through: UserRole,
      foreignKey: 'roleId',
      otherKey: 'userUuid',
      as: 'user',
    });
  };

  return Role;
};
