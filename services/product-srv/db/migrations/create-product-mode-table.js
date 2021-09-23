
module.exports = {
  async up(queryInterface, DataType) {
    const transaction = await queryInterface.sequelize.transaction();

    try {

      await queryInterface.createTable('ProductModes', {
        uuid: {
          type: DataType.UUID,
          primaryKey: true,
        },
        productUuid: {
          type: DataType.UUID,
          allowNull: false,
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
        isUse: {
          type: DataType.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        isTarget: {
          type: DataType.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        order: {
          type: DataType.INTEGER,
          allowNull: false,
          defaultValue: 0,
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
