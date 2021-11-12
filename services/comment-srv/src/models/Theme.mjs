
import { Sequelize } from '@sys.packages/db';


export default function(sequelize, DataType)  {
  const { Model } = Sequelize;

  class Theme extends Model {}

  Theme.init({
    id: {
      type: DataType.INTEGER,
      allowNull: true,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataType.STRING,
      allowNull: false,
    },
    order: {
      type: DataType.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    timestamps: false,
  });

  Theme.associate = ({}) => {};

  return Theme;
};
