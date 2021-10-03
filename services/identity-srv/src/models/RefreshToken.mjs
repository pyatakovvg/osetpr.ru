
import { Sequelize } from '@sys.packages/db';


export default function (sequelize, DataType) {
  const { Model } = Sequelize;

  class RefreshToken extends Model {}

  RefreshToken.init({
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      index: true,
    },
    userUuid: {
      type: DataType.UUID,
      allowNull: false,
    },
    refreshToken: {
      type: DataType.STRING(255),
      allowNull: false,
    },
    userAgent: {
      type: DataType.STRING(255),
    },
    ip: {
      type: DataType.STRING(15),
    },
    expiresIn: {
      type: DataType.BIGINT,
    },
  }, {
    sequelize,
  });

  return RefreshToken;
};
