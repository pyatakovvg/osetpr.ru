
import { Sequelize } from '@sys.packages/db';


export default function(sequelize, DataType)  {
  const { Model } = Sequelize;

  class Comment extends Model {}

  Comment.init({
    uuid: {
      type: DataType.UUID,
      primaryKey: true,
      unique: true,
      allowNull: false,
      defaultValue: DataType.UUIDV4,
    },
    userUuid: {
      type: DataType.UUID,
      allowNull: false,
      defaultValue: DataType.UUIDV4,
    },
    themeId: {
      type: DataType.INTEGER,
      allowNull: true,
    },
    user: {
      type: DataType.STRING,
      allowNull: false,
    },
    content: {
      type: DataType.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    timestamps: true,
  });

  Comment.associate = ({}) => {};

  return Comment;
};
