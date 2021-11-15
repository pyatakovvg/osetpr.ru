
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  const { Comment } = models;
  const data = ctx['request']['body'];

  const { uuid } = await Comment.create({
    ...data,
  });

  const result = await Comment.findOne({
    where: {
      uuid,
    },
    attributes: ['uuid', 'userUuid', 'user', 'content', 'isAdmin', 'createdAt'],
  });

  ctx.status = 200;
  ctx.body = {
    success: true,
    data: result.toJSON(),
  };
};
