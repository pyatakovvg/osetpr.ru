
module.exports = {
  async up(queryInterface, DataType) {
    const transaction = await queryInterface.sequelize.transaction();

    try {

      await queryInterface.createTable('Categories', {
        id: {
          type: DataType.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          index: true,
        },
        value: {
          type: DataType.STRING(256),
          allowNull: false,
        },
        description: {
          type: DataType.STRING(1024),
          allowNull: true,
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
