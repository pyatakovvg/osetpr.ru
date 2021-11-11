
module.exports = {
  async up(queryInterface, DataType) {
    const transaction = await queryInterface.sequelize.transaction();
    try {

      await queryInterface.createTable('Comments', {
        uuid: {
          type: DataType.UUID,
          primaryKey: true,
          unique: true,
          allowNull: false,
          defaultValue: DataType.UUIDV4,
        },
        userUuid: {
          type: DataType.UUID,
          allowNull: false,
          defaultValue: DataType.UUIDV4,
        },
        themeId: {
          type: DataType.INTEGER,
          allowNull: true,
        },
        content: {
          type: DataType.STRING,
          allowNull: false,
        },
        createdAt: {
          type: DataType.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: DataType.DATE,
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
