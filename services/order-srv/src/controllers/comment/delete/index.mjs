
import { models } from '@sys.packages/db';
import { sendEvent } from "@sys.packages/rabbit";


export default () => async (ctx) => {
  const { Comment } = models;
  const { id } = ctx['request']['body'];

  await Comment.destroy({
    where: { id }
  });

  await sendEvent(process.env['EXCHANGE_COMMENT_DELETE'], JSON.stringify(id));

  ctx.body = {
    success: true,
    data: id,
  };
};
