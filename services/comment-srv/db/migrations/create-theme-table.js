
module.exports = {
  async up(queryInterface, DataType) {
    const transaction = await queryInterface.sequelize.transaction();
    try {

      await queryInterface.createTable('Themes', {
        id: {
          type: DataType.INTEGER,
          allowNull: true,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataType.STRING,
          allowNull: false,
        },
        order: {
          type: DataType.INTEGER,
          allowNull: false,
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
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};
