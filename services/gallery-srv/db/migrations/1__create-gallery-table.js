
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {

      await queryInterface.createTable('Galleries', {
        uuid: {
          type: Sequelize.STRING(40),
          primaryKey: true,
          index: true,
          unique: true,
        },
        name: {
          type: Sequelize.STRING(32),
          allowNull: true,
        },
        small: {
          type: Sequelize.BLOB,
        },
        middle: {
          type: Sequelize.BLOB,
        },
        large: {
          type: Sequelize.BLOB,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
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
