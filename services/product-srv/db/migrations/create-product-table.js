
module.exports = {
  async up(queryInterface, DataType) {
    const transaction = await queryInterface.sequelize.transaction();

    try {

      await queryInterface.createTable('Products', {
        uuid: {
          type: DataType.UUID,
          primaryKey: true,
        },
        externalId: {
          type: DataType.STRING(9),
          allowNull: false,
        },
        categoryId: {
          type: DataType.INTEGER,
          allowNull: false,
        },
        title: {
          type: DataType.STRING(256),
          allowNull: true,
        },
        description: {
          type: DataType.STRING(2024),
          allowNull: true,
        },
        isUse: {
          type: DataType.BOOLEAN,
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
