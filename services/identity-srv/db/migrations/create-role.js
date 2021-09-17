
module.exports = {
  async up(queryInterface, DataType) {
    const transaction = await queryInterface.sequelize.transaction();
    try {

      await queryInterface.createTable('Roles', {
        id: {
          type: DataType.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          index: true,
        },
        code: {
          type: DataType.STRING(16),
          allowNull: false,
        },
        name: {
          type: DataType.STRING(124),
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