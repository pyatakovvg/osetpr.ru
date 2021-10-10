
import { Sequelize } from '@sys.packages/db';


export default function(sequelize, DataType) {
  const { Model } = Sequelize;

  class Plan extends Model {}

  Plan.init({
    uuid: {
      type: DataType.UUID,
      primaryKey: true,
      unique: true,
    },
    name: {
      type: DataType.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    timestamps: true,
  });

  Plan.associate = ({ PlanProduct }) => {

    Plan.hasMany(PlanProduct, {
      foreignKey: 'planUuid',
      as: 'products',
    });
  };

  return Plan;
};
