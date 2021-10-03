
module.exports = {
  async up(queryInterface, DataType) {
    const transaction = await queryInterface.sequelize.transaction();
    try {

      await queryInterface.createTable('Users', {
        uuid: {
          type: DataType.UUID,
          unique: true,
          primaryKey: true,
        },
        login: {
          type: DataType.STRING(125),
          unique: true,
          allowNull: false,
        },
        password: {
          type: DataType.STRING(255),
          allowNull: false,
        },
        roleCode: {
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
      });

      await transaction.commit();

    } catch (err) {

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