
module.exports = {
  async up(queryInterface, DataType) {
    const transaction = await queryInterface.sequelize.transaction();

    try {

      await queryInterface.createTable('Customers', {
        uuid: {
          type: DataType.UUID,
          primaryKey: true,
          allowNull: false,
          defaultValue: DataType.UUIDV4,
        },
        userUuid: {
          type: DataType.UUID,
          allowNull: true,
        },
        type: {
          type: DataType.STRING,
          allowNull: false,
          defaultValue: 'admin',
        },
        name: {
          type: DataType.STRING(255),
          allowNull: false,
          defaultValue: 'No name',
        },
        email: {
          type: DataType.STRING(255),
          allowNull: false,
          defaultValue: '',
        },
        phone: {
          type: DataType.STRING(12),
          allowNull: false,
          defaultValue: '',
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
