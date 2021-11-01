
module.exports = {
  async up(queryInterface, DataType) {
    const transaction = await queryInterface.sequelize.transaction();

    try {

      await queryInterface.createTable('ProductGalleries', {
        id: {
          type: DataType.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        productUuid: {
          type: DataType.UUID,
          allowNull: false,
        },
        imageUuid: {
          type: DataType.STRING(40),
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
    }
    catch (err) {

      await transaction.rollback();

      throw err;
    }
  },
};
