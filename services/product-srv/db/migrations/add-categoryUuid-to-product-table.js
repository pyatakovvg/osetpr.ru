
module.exports = {
  async up(queryInterface, DataType) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.addColumn('Products', 'categoryUuid', {
        type: DataType.UUID,
        allowNull: true,
      }, {
        transaction
      });

      await queryInterface.removeColumn('Products', 'categoryId', {
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
      await queryInterface.removeColumn('Categories', 'uuid', {
        transaction,
      });

      await transaction.commit();
    }
    catch (err) {

      await transaction.rollback();

      throw err;
    }
  },
};
