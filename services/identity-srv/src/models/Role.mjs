
import { Sequelize } from '@sys.packages/db';


export default function (sequelize, DataType) {
  const { Model } = Sequelize;

  class Role extends Model {}

  Role.init({
    code: {
      type: DataType.STRING,
      primaryKey: true,
      allowNull: false,
    },
    displayName: {
      type: DataType.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    timestamps: false,
  });

  Role.associate = ({}) => {};

  return Role;
};
