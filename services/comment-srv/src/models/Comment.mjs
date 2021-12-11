
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
      defaultValue: 'Аноним',
    },
    content: {
      type: DataType.STRING,
      allowNull: false,
    },
    parentUuid: {
      type: DataType.UUID,
      allowNull: true,
      defaultValue: null,
    },
    isAdmin: {
      type: DataType.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  }, {
    sequelize,
    timestamps: true,
  });

  Comment.associate = ({ Theme }) => {

    Comment.belongsTo(Theme, {
      foreignKey: 'themeId',
      as: 'theme',
    });

    Comment.hasMany(Comment, {
      foreignKey: 'parentUuid',
      as: 'comments',
    });
  };

  return Comment;
};
