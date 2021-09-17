
module.exports = {
  async up(queryInterface, DataTypes) {
    const transaction = await queryInterface.sequelize.transaction();

    try {

      await queryInterface.createTable('Products', {
        uuid: {
          type: DataTypes.UUID,
          primaryKey: true,
          unique: true,
        },
        externalId: {
          type: DataTypes.STRING(9),
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING(256),
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        price: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        currencyCode: {
          type: DataTypes.STRING(4),
          allowNull: false,
        },
        isUse: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        createdAt: {
          type: DataTypes.DATE,
        },
        updatedAt: {
          type: DataTypes.DATE,
        }
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
