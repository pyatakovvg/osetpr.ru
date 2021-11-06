
import { Sequelize } from '@sys.packages/db';


export default function(sequelize, DataType) {
  const { Model } = Sequelize;

  class Category extends Model {}

  Category.init({
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      index: true,
    },
    value: {
      type: DataType.STRING(256),
      allowNull: false,
    },
  }, {
    sequelize,
    hierarchy: true,
    timestamps: false,
  });

  Category.associate = () => {};

  return Category;
};
