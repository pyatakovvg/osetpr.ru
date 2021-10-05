
module.exports = {
  async up(queryInterface, DataType) {
    const transaction = await queryInterface.sequelize.transaction();

    try {

      await queryInterface.createTable('Individuals', {
        id: {
          type: DataType.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        customerUuid: {
          type: DataType.UUID,
          allowNull: false,
        },
        name: {
          type: DataType.STRING(32),
          allowNull: false,
        },
        patronymic: {
          type: DataType.STRING(32),
          allowNull: true,
        },
        surname: {
          type: DataType.STRING(32),
          allowNull: false,
        },
        gender: {
          type: DataType.ENUM,
          values: ['male', 'female'],
        },
        age: {
          type: DataType.INTEGER,
          allowNull: true,
        },
        birthday: {
          type: DataType.DATE,
          allowNull: true,
        },
        phone: {
          type: DataType.STRING(12),
          allowNull: true,
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
