
module.exports = {
  async up(queryInterface, DataType) {
    const transaction = await queryInterface.sequelize.transaction();

    try {

      await queryInterface.createTable('OrderProducts', {
        uuid: {
          type: DataType.UUID,
          primaryKey: true,
          unique: true,
          allowNull: false,
          defaultValue: DataType.UUIDv4,
        },
        orderUuid: {
          type: DataType.UUID,
          allowNull: false,
        },
        productUuid: {
          type: DataType.UUID,
          allowNull: false,
        },
        modeUuid: {
          type: DataType.UUID,
          allowNull: false,
        },
        externalId: {
          type: DataType.STRING(9),
          allowNull: false,
        },
        imageUuid: {
          type: DataType.STRING(40),
          allowNull: true,
          defaultValue: null,
        },
        title: {
          type: DataType.STRING(255),
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
          defaultValue: 0,
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
        number: {
          type: DataType.INTEGER,
          allowNull: false,
          defaultValue: 1,
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
