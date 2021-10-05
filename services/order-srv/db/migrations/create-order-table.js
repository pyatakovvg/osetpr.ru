
module.exports = {
  async up(queryInterface, DataType) {
    const transaction = await queryInterface.sequelize.transaction();

    try {

      await queryInterface.createTable('Orders', {
        uuid: {
          type: DataType.UUID,
          primaryKey: true,
        },
        userUuid: {
          type: DataType.UUID,
          allowNull: false,
        },
        statusCode: {
          type: DataType.STRING,
          allowNull: false,
        },
        title: {
          type: DataType.STRING(256),
          allowNull: false,
        },
        dateTo: {
          type: DataType.DATE,
          allowNull: false,
        },
        description: {
          type: DataType.STRING(2024),
          allowNull: true,
        },
        address: {
          type: DataType.STRING(256),
          allowNull: false,
        },
        total: {
          type: DataType.DECIMAL(10, 2),
          allowNull: false,
        },
        currencyCode: {
          type: DataType.STRING(4),
          allowNull: false,
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
