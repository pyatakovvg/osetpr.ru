
module.exports = {
  async up(queryInterface, DataType) {
    const transaction = await queryInterface.sequelize.transaction();

    try {

      await queryInterface.createTable('PlanProducts', {
        id: {
          type: DataType.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        planUuid: {
          type: DataType.UUID,
          allowNull: false,
        },
        modeUuid: {
          type: DataType.UUID,
          allowNull: false,
        },
        percent: {
          type: DataType.INTEGER,
          allowNull: false,
        },
      }, {
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
