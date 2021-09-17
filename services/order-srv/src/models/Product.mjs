
import { Sequelize } from '@sys.packages/db';


export default function(sequelize, DataTypes) {
  const { Model } = Sequelize;

  class Product extends Model {}

  Product.init({
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      unique: true,
    },
    externalId: {
      type: DataTypes.STRING(9),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(256),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isUse: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  }, {
    sequelize,
    modelName: 'Product'
  });

  Product.associate = function({ Quantity, Brand, Type, Option, ProductGallery, Category, Characteristic, Comment }) {

    Product.hasMany(Quantity, {
      foreignKey: 'productUuid',
      as: 'shops',
    });

    Product.hasMany(Option, {
      foreignKey: 'productUuid',
      as: 'options',
    });

    Product.hasMany(Characteristic, {
      foreignKey: 'productUuid',
      as: 'characteristics',
    });

    Product.belongsToMany(Category, {
      through: 'ProductCategories',
      foreignKey: 'productUuid',
      as: 'category',
    });

    Product.belongsToMany(Brand, {
      through: 'ProductBrands',
      foreignKey: 'productUuid',
      as: 'brand',
    });

    Product.belongsToMany(Type, {
      through: 'ProductTypes',
      foreignKey: 'productUuid',
      as: 'type',
    });

    Product.hasMany(ProductGallery, {
      foreignKey: 'productUuid',
      as: 'gallery'
    });

    Product.hasMany(Comment, {
      sourceKey: 'uuid',
      foreignKey: 'productUuid',
      as: 'comments'
    });
  };

  return Product;
};
