
import { Sequelize } from '@sys.packages/db';


export default function(sequelize, DataType) {
  const { Model } = Sequelize;

  class Quantity extends Model {}

  Quantity.init({
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      index: true,
    },
    shopUuid: {
      type: DataType.UUID,
      allowNull: false,
    },
    productUuid: {
      type: DataType.UUID,
      allowNull: false,
    },
    quantity: {
      type: DataType.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  }, {
    sequelize,
    modelName: 'Quantity',
    timestamps: false,
  });

  Quantity.associate = ({ Product }) => {

    // Quantity.belongsTo(Product, {
    //   foreignKey: 'uuid',
    //   as: 'product',
    // });
  };

  return Quantity;
};
