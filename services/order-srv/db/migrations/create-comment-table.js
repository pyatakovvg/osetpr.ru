
module.exports = {
  async up(queryInterface, DataType) {
    const transaction = await queryInterface.sequelize.transaction();

    try {

      await queryInterface.createTable('Comments', {
        id: {
          type: DataType.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          index: true,
        },
        productUuid: {
          type: DataType.UUID,
          allowNull: false,
        },
        evaluation: {
          type: DataType.INTEGER,
          defaultValue: 0,
        },
        person: {
          type: DataType.STRING(256),
        },
        comment: {
          type: DataType.STRING(1024),
        },
        createdAt: {
          type: DataType.DATE,
        },
        updatedAt: {
          type: DataType.DATE,
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
