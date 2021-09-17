
module.exports = {
  async up(queryInterface) {
    const transaction = await queryInterface.sequelize.transaction();
    try {

      await queryInterface.bulkInsert('Users', [
          {
            login: 'zemlya911@mail.ru',
            password: '77de38e4b50e618a0ebb95db61e2f42697391659d82c064a5f81b9f48d85ccd5',
            createdAt: new Date(),
            updatedAt: new Date(),
          }
        ],
        {
          transaction
        });

      await queryInterface.bulkInsert('Roles', [
        {
          code: 'admin',
          name: 'Администратор'
        },
      ],
      {
        transaction,
      });

      await queryInterface.bulkInsert('UserCustomers', [
        {
          customerId: 1,
          userId: 1,
        },
      ],
      {
        transaction,
      });

      await transaction.commit();

    } catch (err) {

      await transaction.rollback();

      throw err;
    }
  },
  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn(
        'Person',
        'petName',
        {
          type: Sequelize.STRING,
        },
        { transaction }
      );
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};