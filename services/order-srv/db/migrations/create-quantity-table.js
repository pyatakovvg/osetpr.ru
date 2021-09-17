
module.exports = {
  async up(queryInterface, DataType) {
    const transaction = await queryInterface.sequelize.transaction();

    try {

      await queryInterface.createTable('Quantities', {
        id: {
          type: DataType.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          index: true,
        },
        shopUuid: {
          type: DataType.UUID,
          allowNull: false,
        },
        productUuid: {
          type: DataType.UUID,
          allowNull: false,
        },
        quantity: {
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
