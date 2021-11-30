
module.exports = {
  async up(queryInterface, DataType) {
    const transaction = await queryInterface.sequelize.transaction();

    try {

      await queryInterface.createTable('Groups', {
        uuid: {
          type: DataType.UUID,
          primaryKey: true,
          allowNull: false,
          defaultValue: DataType.UUIDV4,
        },
        value: {
          type: DataType.STRING(256),
          allowNull: false,
        },
        order: {
          type: DataType.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
      }, {
        transaction
      });

      await queryInterface.addColumn('Products', 'groupUuid', {
        type: DataType.UUID,
        allowNull: true,
        defaultValue: DataType.UUIDV4,
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
