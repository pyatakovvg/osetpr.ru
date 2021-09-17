
import { Sequelize } from '@sys.packages/db';


export default function(sequelize, DataType) {
  const { Model } = Sequelize;

  class Comment extends Model {}

  Comment.init({
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      index: true,
    },
    productUuid: {
      type: DataType.UUID,
      allowNull: false,
    },
    evaluation: {
      type: DataType.INTEGER,
      defaultValue: 0,
    },
    person: {
      type: DataType.STRING(256),
    },
    comment: {
      type: DataType.STRING(1024),
    },
  }, {
    sequelize,
    modelName: 'Comment',
  });

  Comment.associate = ({ Product }) => {

    Comment.belongsTo(Product, {
      foreignKey: 'productUuid',
      as: 'product',
    });
  };

  return Comment;
};
