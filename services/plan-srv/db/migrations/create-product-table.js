
module.exports = {
  async up(queryInterface, DataType) {
    const transaction = await queryInterface.sequelize.transaction();

    try {

      await queryInterface.createTable('Products', {
        uuid: {
          type: DataType.UUID,
          primaryKey: true,
          unique: true,
          allowNull: false,
        },
        productUuid: {
          type: DataType.UUID,
          allowNull: false,
        },
        title: {
          type: DataType.STRING(256),
          allowNull: true,
        },
        vendor: {
          type: DataType.STRING(32),
          allowNull: false,
        },
        value: {
          type: DataType.STRING(255),
          allowNull: false,
        },
        price: {
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
        transaction,
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
