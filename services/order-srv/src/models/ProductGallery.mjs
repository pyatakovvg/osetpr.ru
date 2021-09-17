
import { Sequelize } from '@sys.packages/db';


export default function (sequelize, DataTypes) {
  const { Model } = Sequelize;

  class ProductGallery extends Model {}

  ProductGallery.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    imageUuid: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    productUuid: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    order: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'ProductGallery',
    timestamps: false,
  });

  ProductGallery.associate = ({}) => {};

  return ProductGallery;
};
