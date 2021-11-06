
module.exports = {
  async up(queryInterface) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      // await queryInterface.bulkUpdate('Orders', [
      //     {
      //       externalId: Date.now().toString(32),
      //     },
      //   ],
      //   {
      //     transaction
      //   });

      await transaction.commit();
    }
    catch (err) {

      await transaction.rollback();

      throw err;
    }
  },
  async down(queryInterface, Sequelize) {

  },
};
