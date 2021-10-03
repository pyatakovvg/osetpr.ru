
module.exports = {
  async up(queryInterface, DataType) {
    const transaction = await queryInterface.sequelize.transaction();
    try {

      await queryInterface.createTable('Roles', {
        code: {
          type: DataType.STRING,
          primaryKey: true,
          allowNull: false,
        },
        displayName: {
          type: DataType.STRING,
          allowNull: false,
        },
      });

      await transaction.commit();

    } catch (err) {

      await transaction.rollback();

      throw err;
    }
  },
  async down(queryInterface) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};