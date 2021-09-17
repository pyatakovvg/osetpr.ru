
import { Sequelize } from '@sys.packages/db';


export default function(sequelize, DataType) {
  const { Model } = Sequelize;

  class ProductCategory extends Model {}

  ProductCategory.init({
    productUuid: {
      type: DataType.UUID,
      allowNull: false,
    },
    categoryId: {
      type: DataType.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'ProductCategories',
    timestamps: false,
  });

  return ProductCategory;
};
