
import { Sequelize } from '@sys.packages/db';


export default function(sequelize, DataType) {
  const { Model } = Sequelize;

  class Status extends Model {}

  Status.init({
    code: {
      type: DataType.STRING,
      primaryKey: true,
    },
    displayName: {
      type: DataType.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    timestamps: false,
  });

  return Status;
};
