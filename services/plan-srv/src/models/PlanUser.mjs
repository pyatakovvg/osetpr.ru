
import { Sequelize } from '@sys.packages/db';


export default function(sequelize, DataType) {
  const { Model } = Sequelize;

  class PlanUser extends Model {}

  PlanUser.init({
    uuid: {
      type: DataType.UUID,
      allowNull: false,
    },
    planUuid: {
      type: DataType.UUID,
      allowNull: false,
    },
  }, {
    sequelize,
    timestamps: false,
  });

  PlanUser.associate = () => {};

  return PlanUser;
};
