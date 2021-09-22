
import { models } from '@sys.packages/db';
import { sendCommand } from '@sys.packages/rabbit';


export default () => async (ctx) => {
  const data = ctx['request']['body'];
  const { Gallery } = models;

  await Gallery.destroy({ where: { uuid: data['uuid'] }});

  await sendCommand(process.env['EVENT_IMAGE_DELETE'], JSON.stringify(data['uuid']));

  ctx.body = {
    success: true,
    data,
  };
};
