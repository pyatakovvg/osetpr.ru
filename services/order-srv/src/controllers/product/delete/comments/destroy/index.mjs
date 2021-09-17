
import { models, sequelize } from '@sys.packages/db';


export default async function destroyComments(productUuid) {
  const { Comment } = models;

  const transaction = await sequelize.transaction();

  const result = await Comment.findAll({
    where: {
      productUuid,
    },
    transaction,
  });

  await Comment.destroy({
    where: {
      productUuid,
    },
    transaction,
  });

  await transaction.commit();

  return result.map((comment) => comment.toJSON());
}
