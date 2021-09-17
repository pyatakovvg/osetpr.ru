
import { models } from '@sys.packages/db';


export default async function restoreComments(data) {
  const { ProductType } = models;

  const commentsBulk = data.map((comment) => ({
    productUuid: comment['productUuid'],
    evaluation: comment['evaluation'],
    person: comment['person'],
    comment: comment['comment'],
    createAt: comment['createAt'],
    updateAt: comment['updateAt'],
  }));

  await ProductType.bulkCreate(commentsBulk);
}
