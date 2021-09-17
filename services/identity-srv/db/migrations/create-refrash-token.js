
module.exports = {
  async up(queryInterface, DataType) {
    const transaction = await queryInterface.sequelize.transaction();
    try {

      await queryInterface.createTable('RefreshTokens', {
        id: {
          type: DataType.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          index: true,
        },
        userUuid: {
          type: DataType.UUID,
          allowNull: false,
        },
        refreshToken: {
          type: DataType.STRING(255),
          allowNull: false,
        },
        userAgent: {
          type: DataType.STRING(255),
        },
        ip: {
          type: DataType.STRING(15),
        },
        expiresIn: {
          type: DataType.BIGINT,
        },
        createdAt: {
          type: DataType.DATE,
        },
        updatedAt: {
          type: DataType.DATE,
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