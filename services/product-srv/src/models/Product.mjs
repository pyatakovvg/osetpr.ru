
import { Sequelize } from '@sys.packages/db';


export default function(sequelize, DataType) {
  const { Model } = Sequelize;

  class Product extends Model {}

  Product.init({
    uuid: {
      type: DataType.UUID,
      primaryKey: true,
    },
    externalId: {
      type: DataType.STRING(9),
      allowNull: false,
    },
    categoryId: {
      type: DataType.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataType.STRING(256),
      allowNull: true,
    },
    description: {
      type: DataType.STRING(2024),
      allowNull: true,
    },
    isUse: {
      type: DataType.BOOLEAN,
      defaultValue: false,
    },
  }, {
    sequelize,
  });

  Product.associate = ({ Category, ProductMode, ProductGallery }) => {

    Product.belongsTo(Category, {
      foreignKey: 'categoryId',
      as: 'category',
    });

    Product.hasMany(ProductGallery, {
      foreignKey: 'productUuid',
      as: 'gallery',
    });

    Product.hasMany(ProductMode, {
      foreignKey: 'productUuid',
      as: 'mode',
    });
  };

  return Product;
};
