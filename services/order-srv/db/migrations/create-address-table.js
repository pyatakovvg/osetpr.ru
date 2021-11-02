
module.exports = {
  async up(queryInterface, DataType) {
    const transaction = await queryInterface.sequelize.transaction();

    try {

      await queryInterface.createTable('OrderAddresses', {
        orderUuid: {
          type: DataType.UUID,
          allowNull: false,
          primaryKey: true,
        },
        city: {
          type: DataType.STRING,
          allowNull: false,
        },
        street: {
          type: DataType.STRING,
          allowNull: false,
        },
        house: {
          type: DataType.STRING,
          allowNull: false,
        },
        building: {
          type: DataType.STRING,
          allowNull: true,
        },
        apartment: {
          type: DataType.STRING,
          allowNull: true,
        },
        floor: {
          type: DataType.STRING,
          allowNull: true,
        },
        front: {
          type: DataType.STRING,
          allowNull: true,
        },
      }, {
        transaction
      });

      await queryInterface.removeColumn('Orders', 'address', {
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
