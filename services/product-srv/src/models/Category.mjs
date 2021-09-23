
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
    parentId: {
      type: DataType.INTEGER,
      allowNull: true,
    },
    description: {
      type: DataType.STRING(1024),
      allowNull: true,
    },
  }, {
    sequelize,
    timestamps: false,
  });

  Category.associate = () => {

    Category.belongsTo(Category, {
      foreignKey: 'parentId',
      as: 'parent',
    });
  };

  return Category;
};
