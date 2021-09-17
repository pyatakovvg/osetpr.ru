
import { consumer } from '@sys.packages/rabbit';

import { deleteImages } from '../../controllers/gallery';


export default async function() {

  await consumer(process.env['EVENT_IMAGE_DELETE'], async (message, cb) => {
    const uuid = JSON.parse(message);
    await deleteImages(uuid);
    cb(true);
  });
}
