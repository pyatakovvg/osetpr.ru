
import { Sequelize } from '@sys.packages/db';


export default function(sequelize, DataType) {
  const { Model } = Sequelize;

  class Product extends Model {}

  Product.init({
    uuid: {
      type: DataType.UUID,
      unique: true,
      primaryKey: true,
      defaultValue: DataType.UUIDV4,
    },
    externalId: {
      type: DataType.STRING(9),
      allowNull: false,
      unique: true,
      defaultValue: () => Date.now().toString(32),
    },
    categoryId: {
      type: DataType.INTEGER,
      allowNull: false,
      defaultValue: -1,
    },
    title: {
      type: DataType.STRING(256),
      allowNull: true,
      defaultValue: '',
    },
    originalName: {
      type: DataType.STRING,
      allowNull: false,
      defaultValue: '',
    },
    description: {
      type: DataType.STRING(2024),
      allowNull: true,
      defaultValue: '',
    },
    isUse: {
      type: DataType.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isAvailable: {
      type: DataType.BOOLEAN,
      allowNull: false,
      defaultValue: true,
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
      as: 'modes',
    });
  };

  return Product;
};
