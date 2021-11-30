
module.exports = {
  async up(queryInterface, DataType) {
    const transaction = await queryInterface.sequelize.transaction();

    try {

      await queryInterface.createTable('Products', {
        uuid: {
          type: DataType.UUID,
          unique: true,
          primaryKey: true,
          defaultValue: DataType.UUIDV4,
        },
        externalId: {
          type: DataType.STRING(9),
          allowNull: false,
          unique: true,
          defaultValue: Date.now().toString(32),
        },
        groupUuid: {
          type: DataType.UUID,
          allowNull: true,
          defaultValue: null,
        },
        categoryUuid: {
          type: DataType.UUID,
          allowNull: true,
          defaultValue: null,
        },
        title: {
          type: DataType.STRING(256),
          allowNull: true,
        },
        originalName: {
          type: DataType.STRING,
          allowNull: true,
          defaultValue: null,
        },
        description: {
          type: DataType.STRING(2024),
          allowNull: false,
        },
        isUse: {
          type: DataType.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        createdAt: {
          type: DataType.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: DataType.DATE,
          allowNull: false,
        },
      }, {
        transaction
      });

      await transaction.commit();
    }
    catch (err) {

      await transaction.rollback();

      throw err;
    }
  },
  async down(queryInterface) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await transaction.commit();
    }
    catch (err) {

      await transaction.rollback();

      throw err;
    }
  },
};
