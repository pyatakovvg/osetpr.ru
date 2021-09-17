
module.exports = {
  async up(queryInterface, DataType) {
    const transaction = await queryInterface.sequelize.transaction();

    try {

      await queryInterface.createTable('Attributes', {
        id: {
          type: DataType.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          unique: true,
        },
        value: {
          type: DataType.STRING(256),
          allowNull: false,
        },
        type: {
          type: DataType.STRING,
          allowNull: false,
        },
        description: {
          type: DataType.STRING(1024),
          allowNull: true,
        },
        unitId: {
          type: DataType.INTEGER,
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
