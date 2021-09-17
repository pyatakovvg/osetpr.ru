
import { Sequelize } from '@sys.packages/db';


export default function(sequelize, DataType) {
  const { Model } = Sequelize;

  class ProductType extends Model {}

  ProductType.init({
    productUuid: {
      type: DataType.UUID,
      allowNull: false,
    },
    typeId: {
      type: DataType.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'ProductTypes',
    timestamps: false,
  });

  return ProductType;
};
