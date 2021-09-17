
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
    description: {
      type: DataType.STRING(1024),
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Categories',
    timestamps: false,
  });

  Category.associate = ({ Product }) => {

    Category.belongsToMany(Product, {
      through: 'ProductCategories',
      foreignKey: 'categoryId',
      as: 'products',
    });
  };

  return Category;
};
