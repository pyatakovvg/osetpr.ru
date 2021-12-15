
import { Sequelize } from '@sys.packages/db';


export default function(sequelize, DataType) {
  const { Model } = Sequelize;

  class Group extends Model {}

  Group.init({
    uuid: {
      type: DataType.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataType.UUIDV4,
    },
    value: {
      type: DataType.STRING(256),
      allowNull: false,
    },
    order: {
      type: DataType.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  }, {
    sequelize,
    timestamps: false,
  });

  Group.associate = () => {};

  return Group;
};
