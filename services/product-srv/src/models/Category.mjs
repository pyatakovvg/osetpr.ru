
import { Sequelize } from '@sys.packages/db';


export default function(sequelize, DataType) {
  const { Model } = Sequelize;

  class Category extends Model {}

  Category.init({
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      index: true,
    },
    value: {
      type: DataType.STRING(256),
      allowNull: false,
    },
    description: {
      type: DataType.STRING(1024),
      allowNull: true,
    },
  }, {
    sequelize,
    hierarchy: true,
    timestamps: false,
  });

  Category.associate = () => {

    Category.belongsTo(Category, {
      foreignKey: 'parentId',
      as: 'parent',
    });

    Category.hasMany(Category, {
      foreignKey: 'parentId',
      as: 'children',
    });

    Category.belongsToMany(Category, {
      foreignKey: 'ancestorId',
      through: 'FolderAncestor',
      as: 'descendents',
    });

    // Folder.belongsToMany(Folder, {as: 'ancestors', foreignKey: 'folderId', through: FolderAncestor})
  };

  return Category;
};
