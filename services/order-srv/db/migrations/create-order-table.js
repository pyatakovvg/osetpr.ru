
module.exports = {
  async up(queryInterface, DataType) {
    const transaction = await queryInterface.sequelize.transaction();

    try {

      await queryInterface.createTable('Orders', {
        uuid: {
          type: DataType.UUID,
          unique: true,
          primaryKey: true,
          defaultValue: DataType.UUIDv4,
        },
        externalId: {
          type: DataType.STRING(9),
          allowNull: false,
          unique: true,
          defaultValue: Date.now().toString(32),
        },
        userUuid: {
          type: DataType.UUID,
          allowNull: false,
        },
        statusCode: {
          type: DataType.STRING,
          allowNull: false,
        },
        paymentCode: {
          type: DataType.STRING,
          allowNull: true,
        },
        title: {
          type: DataType.STRING(256),
          allowNull: true,
        },
        dateTo: {
          type: DataType.DATE,
          allowNull: true,
        },
        description: {
          type: DataType.STRING(2024),
          allowNull: true,
        },
        total: {
          type: DataType.DECIMAL(10, 2),
          allowNull: false,
          defaultValue: 0,
        },
        currencyCode: {
          type: DataType.STRING(4),
          allowNull: false,
          defaultValue: 'RUB',
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
