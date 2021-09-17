
module.exports = {
  async up(queryInterface, DataType) {
    const transaction = await queryInterface.sequelize.transaction();

    try {

      await queryInterface.createTable('Characteristics', {
        id: {
          type: DataType.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          unique: true,
        },
        productUuid: {
          type: DataType.UUID,
          allowNull: false,
        },
        value: {
          type: DataType.STRING(256),
          allowNull: false,
        },
        order: {
          type: DataType.INTEGER,
          allowNull: false,
        }
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
