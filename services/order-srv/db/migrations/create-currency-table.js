
module.exports = {
  async up(queryInterface, DataType) {
    const transaction = await queryInterface.sequelize.transaction();

    try {

      await queryInterface.createTable('Currencies', {
        code: {
          type: DataType.STRING(4),
          primaryKey: true,
          allowNull: false,
        },
        value: {
          type: DataType.STRING(8),
          allowNull: false,
        },
        description: {
          type: DataType.STRING(1024),
          allowNull: true,
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
