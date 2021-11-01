
import { Sequelize } from '@sys.packages/db';


export default function(sequelize, DataType) {
  const { Model } = Sequelize;

  class ProductGallery extends Model {}

  ProductGallery.init({
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    productUuid: {
      type: DataType.UUID,
      allowNull: false,
    },
    imageUuid: {
      type: DataType.STRING(40),
      allowNull: false,
    },
  }, {
    sequelize,
    timestamps: false,
  });

  ProductGallery.associate = () => {};

  return ProductGallery;
};
