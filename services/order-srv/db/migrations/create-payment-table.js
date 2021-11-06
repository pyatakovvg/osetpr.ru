
module.exports = {
  async up(queryInterface, DataType) {
    const transaction = await queryInterface.sequelize.transaction();

    try {

      await queryInterface.createTable('Payments', {
        code: {
          type: DataType.STRING,
          primaryKey: true,
        },
        displayName: {
          type: DataType.STRING,
          allowNull: false,
        },
        isUse: {
          type: DataType.BOOLEAN,
          allowNull: false,
          defaultValue: true,
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
