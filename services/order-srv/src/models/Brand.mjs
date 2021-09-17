
import { Sequelize } from '@sys.packages/db';


export default function(sequelize, DataType) {
  const { Model } = Sequelize;

  class Brand extends Model {}

  Brand.init({
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
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
    modelName: 'Brands',
    timestamps: false,
  });

  Brand.associate = ({ Product }) => {

    Brand.belongsToMany(Product, {
      through: 'ProductBrands',
      foreignKey: 'brandId',
      as: 'products',
    });
  };

  return Brand;
};
