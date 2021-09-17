
import { Sequelize } from '@sys.packages/db';


export default function(sequelize, DataTypes) {
  const { Model } = Sequelize;

  class Promotion extends Model {}

  Promotion.init({
    uuid: {
      type: DataTypes.UUID,
      unique: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(1024),
      allowNull: true,
    },
    percent: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    dateFrom: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    dateTo: {
      type: DataTypes.DATE,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Promotion',
    timestamps: false,
  });

  Promotion.associate = ({ Product, ProductPromotion }) => {

    // Promotion.belongsToMany(Product, {
    //   through: ProductPromotion,
    //   foreignKey: 'promotionUuid',
    //   otherKey: 'productUuid',
    //   as: 'products',
    // });
  };

  return Promotion;
};
