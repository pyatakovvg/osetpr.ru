
import { models } from '@sys.packages/db';

import { Duplex } from 'stream';


export default () => async (ctx) => {
  const { Gallery } = models;
  const { id } = ctx['params'];
  const { size = 'large' } = ctx['query'];

  const image = await Gallery.findOne({
    where: { uuid: id },
    attributes: ['small', 'middle', 'large'],
  });

  const stream = new Duplex();

  if (image) {
    stream.push(image[size]);
  }

  stream.push(null);

  ctx.status = 200;
  ctx.body = stream;
};
