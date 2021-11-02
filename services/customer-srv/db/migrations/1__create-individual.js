
module.exports = {
  async up(queryInterface, DataType) {
    const transaction = await queryInterface.sequelize.transaction();

    try {

      await queryInterface.createTable('Individuals', {
        customerUuid: {
          type: DataType.UUID,
          allowNull: false,
          primaryKey: true,
          unique: true,
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
          allowNull: true,
        },
        gender: {
          type: DataType.ENUM,
          values: ['male', 'female'],
          defaultValue: null,
          allowNull: true,
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
