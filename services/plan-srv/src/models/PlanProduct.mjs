
import { Sequelize } from '@sys.packages/db';


export default function(sequelize, DataType) {
  const { Model } = Sequelize;

  class PlanProduct extends Model {}

  PlanProduct.init({
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    planUuid: {
      type: DataType.UUID,
      allowNull: false,
    },
    modeUuid: {
      type: DataType.UUID,
      allowNull: false,
    },
    percent: {
      type: DataType.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    timestamps: false,
  });

  PlanProduct.associate = ({ Product }) => {

    PlanProduct.belongsTo(Product, {
      foreignKey: 'modeUuid',
      as: 'mode',
    });
  };

  return PlanProduct;
};
