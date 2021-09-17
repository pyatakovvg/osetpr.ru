
module.exports = {
  async up(queryInterface, DataType) {
    const transaction = await queryInterface.sequelize.transaction();

    try {

      await queryInterface.createTable('Units', {
        id: {
          type: DataType.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          index: true,
        },
        value: {
          type: DataType.STRING(8),
          allowNull: false,
        },
        description: {
          type: DataType.STRING(2024),
          defaultValue: ''
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
