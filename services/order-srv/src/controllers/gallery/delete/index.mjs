
import { models } from '@sys.packages/db';
import { sendEvent } from '@sys.packages/rabbit';


export default async (uuid) => {
  const { Gallery } = models;

  await Gallery.destroy({
    where: { uuid },
  });

  await sendEvent(process.env['EXCHANGE_IMAGE_DELETE'], JSON.stringify(uuid));
};
