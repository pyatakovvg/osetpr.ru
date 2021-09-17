
import { Sequelize } from '@sys.packages/db';


export default function(sequelize, DataType) {
  const { Model } = Sequelize;

  class ProductBrands extends Model {}

  ProductBrands.init({
    productUuid: {
      type: DataType.UUID,
      allowNull: false,
    },
    brandId: {
      type: DataType.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'ProductBrands',
    timestamps: false,
  });

  return ProductBrands;
};
